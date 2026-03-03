"use client";
import React, { useEffect, useState } from "react";
import styles from "./signup.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Link from "next/link";
import Stripe from "stripe";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/app/store/lib/hooks";
import {
  extensionPricing,
  sendNumberForVerify,
  signupSubscription,
  verifyNumberOtpForSignup,
} from "@/app/store/slices/authSlices";
import { useRef } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import CustomModal from "../PopupsComponents/Modal";
import SubscriptionPlans from "../PopupsComponents/OuterPopups/SubscriptionPlans/SubscriptionPlans";
import { validateInput } from "../common/ValidateInput/validateInput";
import { Card, Row, Form, Col, FormSelect, Button } from "react-bootstrap";
import { Rowdies } from "next/font/google";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import Header from "../Header/Header";
import VerifyMobileNumber from "../PopupsComponents/OuterPopups/VerifyMobileNumber/VerifyMobileNumber";
import ButtonSpinnerLoader from "../common/SpinnerLoader/ButtonSpinnerLoader";
import creditCardType from "credit-card-type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
  faCcJcb,
  faCcDinersClub,
} from "@fortawesome/free-brands-svg-icons";
import RightCustomModal from "../PopupsComponents/RightModal";

// Configure FontAwesome library
library.add(
  faCreditCard,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
  faCcJcb,
  faCcDinersClub
);

const stripe = new Stripe(process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLIC_KEY);

export const SignUp = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [values, setValues] = useState({ countryCode: "US" });
  const [extensionValues, setExtensionValues] = useState({
    physicalCount: 0,
    remoteCount: 1,
  });
  const [activePlan, setActivePlan] = useState(null);
  const [showCoupons, setShowCoupons] = useState(false);
  const [selctedAmount, setSelectedAmount] = useState(null);
  const [showFullPlanPopup, setShowFullPlanPopup] = useState(false);
  const [showPlanType, setShowPlanType] = useState("");
  const [extensionType, setExtensionType] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const firstUpdate = useRef(true);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stripeApiCallInProgress, setStripeApiCallInProgress] = useState(false);
  const [sendMobileNumber, setSendMobileNumber] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [openVerifyNumber, setOpenVerifyNumber] = useState(false);
  const [showCouponDiscount, setShowCouponDiscount] = useState(null);
  const [cvvLength, setCvvLength] = useState(3);

  const extensionPriceAmount = useAppSelector(
    (state) => state.authWeb.extensionPrice
  );
  const isDarkTheme = useAppSelector((state) => state.darkTheme.isDarkTheme);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [plans, setPlans] = useState([
    {
      name: "uNext Started",
      price: "35.00",
      hideMenu: false,
      benefits: [
        "UNLIMITED CALLING TO LOCAL & TOLL NUMBERS",
        "ENCRYPTED TEXT MESSAGING (SMS + MMS)",
        "SINGLE, INTEGRATED PLATFORM ACCESS",
        "HIPAA COMPLIANT e-FAX",
        "LIVE REVIEWS MANAGEMENT",
        "ENHANCED PATIENT COMMUNICATION (TEXT, PHONE, EMAIL)",
        "APPOINTMENT REMINDERS",
        "IMPROVED PATIENT RETENTION",
      ],
    },
    {
      name: "uNext Pro",
      price: "45.00",
      hideMenu: false,
      benefits: [
        "UNLIMITED CALLING TO LOCAL & TOLL NUMBERS",
        "ENCRYPTED TEXT MESSAGING (SMS + MMS)",
        "SINGLE, INTEGRATED PLATFORM ACCESS",
        "HIPAA COMPLIANT e-FAX",
        "LIVE REVIEWS MANAGEMENT",
        "ENHANCED PATIENT COMMUNICATION (TEXT, PHONE, EMAIL)",
        "APPOINTMENT REMINDERS",
        "IMPROVED PATIENT RETENTION",
      ],
    },
  ]);

  const getCardTypeIcon = (cardNumber) => {
    if (!cardNumber?.trim()) {
      return faCreditCard;
    }
    const cardTypeInfo = creditCardType(cardNumber);
    if (cardTypeInfo.length > 0) {
      const cardType = cardTypeInfo[0].type;
      const cardTypeIconMap = {
        visa: faCcVisa,
        mastercard: faCcMastercard,
        amex: faCcAmex,
        discover: faCcDiscover,
        jcb: faCcJcb,
        diners_club: faCcDinersClub,
        maestro: faCreditCard,
      };
      if (/^3[47]/.test(cardNumber)) {
        return faCcAmex;
      }
      return cardTypeIconMap[cardType] || faCreditCard;
    }
    return faCreditCard;
  };

  const handleInputChange = (e) => {
    let newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value.trim();
    const { name, value } = e.target;
    if (
      e.target.name === "cardNumber" ||
      e.target.name === "cvv" ||
      e.target.name === "expiryYear" ||
      // e.target.name === "expiryMonth" ||
      e.target.name === "mobileNumber" ||
      e.target.name === "otp" ||
      e.target.name === "zipCode"
    ) {
      newValue = newValue.replace(/\D/g, "");
      setIsLoading(false);
    } else if (e.target.name === "coupon") {
      setIsLoading(false);
      setButtonDisabled(false);
    } else if (name === "expiryMonth") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
      if (newValue.length > 2) {
        newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
      }
    }
    if (e.target.name === "cardNumber") {
      const cardTypeIcon = getCardTypeIcon(e.target.value);
      if (cardTypeIcon === faCcAmex) {
        setCvvLength(4);
      } else {
        setCvvLength(3);
      }
    }
    setValues({ ...values, [e.target.name]: newValue });
    setErrors({ ...errors, [e.target.name]: false });
    setIsLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedPlanName = localStorage.getItem("selectedPlan");
      if (selectedPlanName === null || selectedPlanName === undefined) {
        router.push("/");
      }
      const plan = plans.find((plan) => plan.name === selectedPlanName);
      setSelectedPlan(plan);
    }
  }, []);

  const handleActivePlan = (type, amount) => {
    setSelectedAmount(amount);
    setActivePlan(type);
  };

  const handleTypes = (type) => {
    setExtensionType(type);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (selectedPlan?.name) {
      const data = {
        plan:
          selectedPlan?.name?.toLowerCase() === "unext started"
            ? "started"
            : "pro",
        physical_extension: extensionValues?.physicalCount,
        remote_extension: extensionValues?.remoteCount,
        type: extensionType,
      };
      dispatch(extensionPricing(data));
    }
  }, [extensionValues, selectedPlan, extensionType]);

  // Decrease physical extension
  const decreasePhysicalExtension = () => {
    if (extensionValues?.physicalCount > 0) {
      const decrementedPhysicalCount = extensionValues?.physicalCount - 1;
      setExtensionValues({
        ...extensionValues,
        physicalCount: decrementedPhysicalCount,
      });
      if (decrementedPhysicalCount > 0) {
        setExtensionType("type1");
      } else if (decrementedPhysicalCount === 0) {
        setExtensionType("");
      }
    }
  };

  // Decrease remote extension
  const decreaseRemoteExtension = () => {
    if (extensionValues?.remoteCount > 0) {
      const decrementedRemoteCount = extensionValues?.remoteCount - 1;
      setExtensionValues({
        ...extensionValues,
        remoteCount: decrementedRemoteCount,
      });
      // if (decrementedRemoteCount === 1 || extensionValues?.physicalCount > 0) {
      //   setExtensionType("type1");
      // } else if (
      //   decrementedRemoteCount === 0 &&
      //   extensionValues?.physicalCount === 0
      // ) {
      //   setExtensionType("");
      // }
    }
  };

  // Increase physical extension
  const increasePhysicalExtension = () => {
    const incrementedPhysicalCount = extensionValues?.physicalCount + 1;
    setExtensionValues({
      ...extensionValues,
      physicalCount: incrementedPhysicalCount,
    });
    if (incrementedPhysicalCount === 1) {
      setExtensionType("type1");
    }
  };

  // Increase remote extension
  const increaseRemoteExtension = () => {
    const incrementedRemoteCount = extensionValues?.remoteCount + 1;
    setExtensionValues({
      ...extensionValues,
      remoteCount: incrementedRemoteCount,
    });
    // if (incrementedRemoteCount === 1) {
    //   setExtensionType("type1");
    // }
  };

  const couponApply = async (e) => {
    e.preventDefault();
    if (!values?.coupon?.trim()) {
      toast.error("Please enter coupon", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const bodyData = {
        coupon: values?.coupon,
        remote_extension: extensionValues.remoteCount,
        physical_extension: extensionValues.physicalCount,
        type: extensionType,
        plan:
          selectedPlan.name.toLowerCase() === "unext started"
            ? "started"
            : "pro",
      };
      try {
        const actionResult = await dispatch(extensionPricing(bodyData));
        const { success, message, discount } = actionResult.payload;
        if (success) {
          setIsCouponApplied(true);
          if (discount === "") {
            setShowCouponDiscount(message);
          } else {
            setShowCouponDiscount(discount);
          }
          setAppliedCoupon(values?.coupon);
          setButtonDisabled(true);
          if (message === "Invalid coupon") {
            setShowCoupons(false);
            // toast.error("Invaild coupon");
          } else {
            setShowCoupons(true);
          }
        }
      } catch (error) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const removeCoupon = async () => {
    setAppliedCoupon("");
    setIsCouponApplied(false);
    setShowCouponDiscount(null);
    setValues({
      ...values,
      coupon: "",
    });
    const bodyData = {
      coupon: null,
      remote_extension: extensionValues.remoteCount,
      physical_extension: extensionValues.physicalCount,
      type: extensionType,
      plan:
        selectedPlan.name.toLowerCase() === "unext started" ? "started" : "pro",
    };
    setButtonDisabled(false);
    setShowCoupons(false);

    try {
      const actionResult = await dispatch(extensionPricing(bodyData));
      const { success } = actionResult.payload;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("errors", errors);

  const handleEnroll = async (e) => {
    e.preventDefault();

    const validations = {
      name: ["required"],
      email: ["required", "email"],
      countryCode: ["required"],
      zipCode: ["required"],
      cardNumber: ["required"],
      expiryMonth: ["required", "expiryMonth"],
      mobileNumber: ["required"],
      cvv: ["required"],
      cardHolderName: ["required"],
      activePlan: ["activePlan"],
      checkbox: ["required"],
    };

    const allValues = { ...values, activePlan };

    const errors = validateInput(allValues, validations);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    let [expiryMonth, expiryYear] = values.expiryMonth.split("/");
    expiryMonth = Number(expiryMonth);
    expiryYear = Number(expiryYear);

    let fullExpiryYear = expiryYear < 100 ? 2000 + expiryYear : expiryYear;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (
      expiryMonth < 1 ||
      expiryMonth > 12 ||
      (fullExpiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      toast.error("Invalid Expiry Date", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (fullExpiryYear < currentYear) {
      toast.error("This card has already expired", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (isLoading) {
      return;
    }
    setIsLoading(true);

    let paymentMethod;
    try {
      setStripeApiCallInProgress(true);
      paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          number: values.cardNumber,
          exp_month: expiryMonth,
          exp_year: fullExpiryYear,
          cvc: values.cvv,
        },
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } finally {
      setStripeApiCallInProgress(false);
    }

    const data = {
      name: values.name,
      card_holder_name: values.cardHolderName,
      email: values.email,
      amount: selctedAmount,
      payId: paymentMethod.id,
      country: values.countryCode,
      zip_code: values.zipCode,
      card_holder_name: values.cardHolderName,
      physical_extension: extensionValues.physicalCount,
      physical_extension_type: extensionType,
      remote_extension: extensionValues.remoteCount,
      subscription: activePlan,
      phoneNumber: "+1" + values?.mobileNumber,
      subscription_plan:
        selectedPlan.name.toLowerCase() === "unext started" ? "started" : "pro",
    };

    try {
      const actionResult = await dispatch(signupSubscription(data));
      const { success, message } = actionResult.payload.data;
      if (success) {
        setOpenVerifyNumber(true);
        toast.success(message);
        setUpdatePopup(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleClose = () => {
    setOpenVerifyNumber(false);
    setShowFullPlanPopup(false);
  };

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div style={{ background: "#fff" }}></div>
        <div className={styles.subscription_plan}>
          <Header />
          <div className="container">
            <div className={styles.subs_head}>Purchase Subscription</div>
            <div className={styles.payMonthly}>
              Fill in your credentials and click on the Enroll button
            </div>
            {plans.map((plan, index) => (
              <div className={styles.plan_box_container} key={index}>
                {console.log("plan", plan)}
                <div className={styles.planBox}>
                  <div className={styles.radio_inp}>
                    <input
                      type="radio"
                      id={plan.name}
                      checked={selectedPlan && selectedPlan.name === plan.name}
                      onChange={() => setSelectedPlan(plan)}
                    />
                    <label htmlFor={plan.name}>{plan.name}</label>
                  </div>
                  <div className={styles.active_plan_month}>
                    <span className={styles.active_plan_dollor}>$</span>
                    <span className={styles.month_tag}>{plan.price}</span>
                    <span className={styles.per_extension}>/ Per Month</span>
                    {plan.hideMenu ? (
                      <div
                        className={styles.active_img_div}
                        onClick={() => {
                          const updatedPlans = [...plans];
                          updatedPlans[index].hideMenu = false;
                          setPlans(updatedPlans);
                        }}
                      >
                        {isDarkTheme ? (
                          <Image src={Images.upArrown} alt="" />
                        ) : (
                          <Image src={Images.blackUpArrow} alt="" />
                        )}
                      </div>
                    ) : (
                      <div
                        className={styles.active_img_div}
                        onClick={() => {
                          const updatedPlans = [...plans];
                          updatedPlans[index].hideMenu = true;
                          setPlans(updatedPlans);
                        }}
                      >
                        {isDarkTheme ? (
                          <Image src={Images.downArrwo} alt="" />
                        ) : (
                          <Image src={Images.blackDownArrow} alt="" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {!plan.hideMenu ? (
                  ""
                ) : (
                  <>
                    <div className={styles.features_data}>
                      {plan?.benefits?.map((benefit, key) => (
                        <div className={styles.features_contant} key={key}>
                          <div>
                            <Image src={Images.whiteTick} alt={benefit} />
                          </div>
                          <div className={styles.benifits_text}>{benefit}</div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.all_features}>
                      <button
                        onClick={() => {
                          setShowFullPlanPopup(true);
                          setShowPlanType(plan.name);
                        }}
                      >
                        see all features
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* {selectedPlan && (
              <div className={styles.plan_box_container}>
                <div className={styles.planBox}>
                  <div className={styles.radio_inp}>
                    <input type="radio" id={selectedPlan.name} checked />
                    <label htmlFor={selectedPlan.name}>
                      {selectedPlan.name}
                    </label>
                  </div>
                  <div className={styles.active_plan_month}>
                    <span className={styles.active_plan_dollor}>$</span>
                    <span className={styles.month_tag}>
                      {selectedPlan.price}
                    </span>
                    <span className={styles.per_extension}>/ Per Month</span>
                    {hideMenu ? (
                      <div
                        className={styles.active_img_div}
                        onClick={() => setHideMenu(false)}
                      >
                        <Image src={Images.downArrwo} alt="" />
                      </div>
                    ) : (
                      <div
                        className={styles.active_img_div}
                        onClick={() => setHideMenu(true)}
                      >
                        <Image src={Images.upArrown} alt="" />
                      </div>
                    )}
                  </div>
                </div>
                {hideMenu ? (
                  ""
                ) : (
                  <>
                    <div className={styles.features_data}>
                      {selectedPlan?.benefits?.map((benefit, key) => (
                        <div className={styles.features_contant} key={key}>
                          <div>
                            <Image src={Images.whiteTick} alt={benefit} />
                          </div>
                          <div className={styles.benifits_text}>{benefit}</div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.all_features}>
                      <button onClick={() => setShowFullPlanPopup(true)}>
                        see all features
                      </button>
                    </div>
                  </>
                )}
              </div>
            )} */}
            <div className={styles.subs_form_box}>
              <div className={styles.signup_extension}>
                <div className={styles.phy_extension}>Physical Extensions</div>
                <div className={styles.extension_inc_dec}>
                  <div
                    className={styles.minus}
                    onClick={decreasePhysicalExtension}
                  >
                    -
                  </div>
                  <div className={styles.extension_count}>
                    {extensionValues?.physicalCount}
                  </div>
                  <div
                    className={styles.plus}
                    onClick={increasePhysicalExtension}
                  >
                    +
                  </div>
                </div>
              </div>
              <div className={styles.signup_extension}>
                <div className={styles.phy_extension}>Choose Extension</div>
                <div className={styles.extension_inc_dec}>
                  <div
                    className={
                      extensionType === "type1"
                        ? styles.activeExtensionType
                        : styles.choose_phy
                    }
                    onClick={() => handleTypes("type1")}
                    onMouseOver={() => setHoveredImage(Images.type1_large)}
                    onMouseOut={() => setHoveredImage(null)}
                  >
                    <Image
                      src={Images.type1}
                      alt="type 1"
                      className={styles.image}
                    />
                  </div>
                  <div
                    className={
                      extensionType === "type2"
                        ? styles.activeExtensionType
                        : styles.choose_phy
                    }
                    onClick={() => handleTypes("type2")}
                    onMouseOver={() => setHoveredImage(Images.type3_large)}
                    onMouseOut={() => setHoveredImage(null)}
                  >
                    <Image
                      src={Images.type2}
                      alt="type 2"
                      className={styles.image}
                    />
                  </div>
                  <div
                    className={
                      extensionType === "type3"
                        ? styles.activeExtensionType
                        : styles.choose_phy
                    }
                    onClick={() => handleTypes("type3")}
                    onMouseOver={() => setHoveredImage(Images.type2_large)}
                    onMouseOut={() => setHoveredImage(null)}
                  >
                    <Image
                      src={Images.type3}
                      alt="type 3"
                      className={styles.image}
                    />
                  </div>
                </div>
                {hoveredImage && (
                  <div className={styles.hoveredImage}>
                    <Image src={hoveredImage} alt="hovered image" />
                  </div>
                )}
              </div>

              {/* <div className={styles.signup_extension}>
                <div className={styles.phy_extension}>Choose Extension</div>
                <div className={styles.extension_inc_dec}>
                  <div
                    className={
                      extensionType === "type1"
                        ? styles.activeExtensionType
                        : styles.choose_phy
                    }
                    onClick={() => handleTypes("type1")}
                  >
                    <Image src={Images.type1} alt="type 1" />
                  </div>
                  <div
                    className={
                      extensionType === "type2"
                        ? styles.activeExtensionType
                        : styles.choose_phy
                    }
                    onClick={() => handleTypes("type2")}
                  >
                    <Image src={Images.type2} alt="type 2" />
                  </div>
                  <div
                    className={
                      extensionType === "type3"
                        ? styles.activeExtensionType
                        : styles.choose_phy
                    }
                    onClick={() => handleTypes("type3")}
                  >
                    <Image src={Images.type3} alt="type 3" />
                  </div>
                </div>
              </div> */}
              <div className={styles.signup_extension}>
                <div className={styles.phy_extension}>Remote Extensions</div>
                <div className={styles.extension_inc_dec}>
                  <div
                    className={styles.minus}
                    onClick={decreaseRemoteExtension}
                  >
                    -
                  </div>
                  <div className={styles.extension_count}>
                    {extensionValues?.remoteCount}
                  </div>
                  <div
                    className={styles.plus}
                    onClick={increaseRemoteExtension}
                  >
                    +
                  </div>
                </div>
              </div>
              <div className={styles.extension_instruction}>
                *This is a soft extension to be used from your mobile phone
              </div>

              <div className={styles.signup_extension_form}>
                <Row className={styles.rowofinputs}>
                  <Col md={6}>
                    <div className={styles.sub_inp_box}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={styles["inputs"]}>
                          <Form.Control
                            className={styles["inputs_text"]}
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            onChange={handleInputChange}
                          />
                          <Image
                            className={styles.signup_icons}
                            src={Images.userIconBlack}
                            alt="user icon"
                          />
                        </div>
                        <span className={styles?.error_meassage}>
                          {errors.f_name}
                        </span>
                        {errors?.name && (
                          <div className={styles?.error_meassage}>
                            {errors.name}
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={styles.sub_inp_box}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={styles["inputs"]}>
                          <Form.Control
                            className={styles["inputs_text"]}
                            type="email"
                            placeholder="Your Email Address"
                            name="email"
                            onChange={handleInputChange}
                          />
                          <Image
                            className={styles.signup_icons}
                            src={Images.emailIcon}
                            alt="email icon"
                          />
                        </div>
                        {errors?.email && (
                          <div className={styles?.error_meassage}>
                            {errors.email}
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                <Row className={styles.rowofinputs}>
                  <Col md={6}>
                    <div className={styles.sub_inp_box}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={styles["inputs"]}>
                          <div className={styles["senOtpNumber"]}>
                            <Form.Control
                              className={styles["inputs_text"]}
                              type="text"
                              placeholder="Enter Mobile Number"
                              name="mobileNumber"
                              value={values?.mobileNumber}
                              onChange={handleInputChange}
                              maxLength="10"
                            />
                          </div>
                        </div>
                        {errors?.mobileNumber && (
                          <div className={styles?.error_meassage}>
                            {errors.mobileNumber}
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={styles.sub_inp_box}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={styles["inputs"]}>
                          <div className={styles["senOtpNumber"]}>
                            <Form.Control
                              className={`${styles["inputs_text"]} ${styles["coupon_inputs"]}`}
                              type="text"
                              placeholder="Coupon code"
                              name="coupon"
                              value={
                                isCouponApplied ? appliedCoupon : values?.coupon
                              }
                              onChange={handleInputChange}
                              readOnly={isCouponApplied}
                            />
                            {buttonDisabled ? (
                              <>
                                <div
                                  className={styles["close_applied_coupon"]}
                                  onClick={removeCoupon}
                                >
                                  x
                                </div>
                                <div
                                  className={styles["send_otp_btn_disabled"]}
                                >
                                  APPLY
                                </div>
                              </>
                            ) : (
                              <div
                                className={styles["send_otp_btn"]}
                                onClick={couponApply}
                              >
                                APPLY
                              </div>
                            )}
                          </div>
                        </div>
                        {showCouponDiscount !== null && (
                          <div
                            className={
                              showCouponDiscount ===
                                "Discount cannot be applied. It exceeds the total price." ||
                                showCouponDiscount === "Invalid coupon"
                                ? styles.invalid_coupon_applied_message
                                : styles.coupon_applied_message
                            }
                          >
                            {showCouponDiscount}
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                {/* <Row className={styles.rowofinputs}>
                  <Col md={6}>
                    <div className={styles.sub_inp_box}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={styles["inputs"]}>
                          <Form.Control
                            className={styles["inputs_text"]}
                            type="text"
                            placeholder="Coupon code"
                            name="coupon"
                            value={
                              isCouponApplied ? appliedCoupon : values?.coupon
                            }
                            onChange={handleInputChange}
                            readOnly={isCouponApplied}
                          />

                          {isCouponApplied ? (
                            <button
                              className="remove_coupon"
                              onClick={removeCoupon}
                            >
                              X
                            </button>
                          ) : null}
                        </div>
                        {buttonDisabled && (
                          <div className={styles.price_discount}>
                            {extensionPriceAmount?.discount}
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={styles.signup_extension_coupons}>
                      <div className={styles.input_cont_coupons}>
                        <div className={styles.coupon_apply_coupons}>
                          {buttonDisabled ? (
                            <button
                              className="apply_btn_disabled"
                              disabled={buttonDisabled}
                            >
                              APPLY
                            </button>
                          ) : (
                            <button onClick={couponApply}>Apply</button>
                          )}
                          {showCoupons && (
                            <div className={styles.coupons_name_coupons}>
                              <div className={styles.coupons_img}>
                                <Image src={Images.couponEditIcon} alt="" />
                                <span>{appliedCoupon}</span>
                              </div>
                              <span
                                className={styles.close_icon}
                                onClick={removeCoupon}
                              >
                                x
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row> */}
              </div>

              <div className={styles.payment_info}>
                <div className={styles.payment_info_txt}>
                  Payment Information
                </div>
                <div className={styles.payment_info_text}></div>
              </div>

              <div className={styles.signup_extension}>
                <div className={styles.input_cont}>
                  <Row>
                    <Col lg={4}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={styles["inputs"]}>
                          <div className={styles.input_with_icons}>
                            <Form.Control
                              className={styles["inputs_text"]}
                              type="text"
                              name="cardNumber"
                              placeholder="xxxx xxxx xxxx xxxx"
                              value={values?.cardNumber}
                              onChange={handleInputChange}
                              maxLength="16"
                            />
                            <span className={styles.card_icons}>
                              <FontAwesomeIcon
                                icon={getCardTypeIcon(values?.cardNumber)}
                                className="card-type-icon"
                              />
                            </span>
                          </div>
                        </div>
                        {errors?.cardNumber && (
                          <div className={styles?.error_meassage}>
                            {errors.cardNumber}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={styles["inputs"]}>
                          <Form.Control
                            className={styles["inputs_text"]}
                            onChange={handleInputChange}
                            type="text"
                            name="expiryMonth"
                            placeholder="MM/YY"
                            maxLength="5"
                            value={values?.expiryMonth}
                          />
                        </div>
                        {errors.expiryMonth && (
                          <div className={styles?.error_meassage}>
                            {errors.expiryMonth}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col lg={4}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div className={styles["inputs"]}>
                          <Form.Control
                            className={styles["inputs_text"]}
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            pattern="\d{3,4}"
                            value={values?.cvv}
                            onChange={handleInputChange}
                            maxLength={cvvLength}
                          />
                        </div>
                        {errors.cvv && (
                          <div className={styles?.error_meassage}>
                            {errors.cvv}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>

              {/* <div className={styles.signup_extension}>
              <div className={styles.input_cont}> */}
              <Row>
                <Col lg={8}>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className={styles["inputs"]}>
                      <Form.Control
                        className={styles["inputs_text"]}
                        type="text"
                        placeholder="Name On Card"
                        name="cardHolderName"
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors?.cardHolderName && (
                      <div className={styles?.error_meassage}>
                        {errors.cardHolderName}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className={styles["inputs"]}>
                      <Form.Control
                        className={styles["inputs_text"]}
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        pattern="\d{3,4}"
                        value={values?.zipCode}
                        onChange={handleInputChange}
                        maxLength="6"
                      />
                    </div>
                    {errors.zipCode && (
                      <div className={styles?.error_meassage}>
                        {errors.zipCode}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className={styles.signup_extension_button}>
                <div className={styles.input_cont_button}>
                  <div
                    className={
                      activePlan === "monthly"
                        ? styles.plan_monthly
                        : styles.plan_yearly
                    }
                    onClick={() =>
                      handleActivePlan(
                        "monthly",
                        extensionPriceAmount?.data?.totalMontlyPrice
                      )
                    }
                  >
                    <button>
                      Monthly Only $
                      {extensionPriceAmount?.data?.totalMontlyPrice}
                      /Monthly
                    </button>
                  </div>
                  <br />
                  <div
                    className={
                      activePlan === "yearly"
                        ? styles.plan_monthly
                        : styles.plan_yearly
                    }
                    onClick={() =>
                      handleActivePlan(
                        "yearly",
                        extensionPriceAmount?.data?.totalYearlyPrice
                      )
                    }
                  >
                    <button>
                      Yearly Only $
                      {extensionPriceAmount?.data?.totalYearlyPrice}
                      /Yearly
                    </button>
                  </div>
                </div>
              </div>
              {activePlan === null && (
                <div className={styles.error_div}>
                  {errors?.activePlan && (
                    <div className={styles?.error_meassage}>
                      {errors.activePlan}
                    </div>
                  )}
                </div>
              )}
              <div className={styles.terms_check}>
                <div className={styles.terms_check_label}>
                  <input
                    type="checkbox"
                    id="termsCheck"
                    name="checkbox"
                    onChange={handleInputChange}
                    className="custom-checkbox"
                  />
                  <label htmlFor="termsCheck">
                    I Accept the{" "}
                    <Link href="/terms-and-condition" target="_blank">
                      <span> Terms and Conditions</span>
                    </Link>
                  </label>
                </div>
              </div>
              <div className={styles.error_div}>
                {errors.checkbox && (
                  <div className={styles?.error_meassage}>
                    {errors.checkbox}
                  </div>
                )}
              </div>
              <div className={styles.enroll_subs}>
                <button
                  onClick={handleEnroll}
                  disabled={stripeApiCallInProgress || isLoading}
                >
                  <span>Enroll</span>
                  {isLoading && <ButtonSpinnerLoader />}
                </button>
              </div>
              <div className={styles.terms_check}>
                <div className={styles.already_acc}>
                  Already have an account?&nbsp;
                  <Link href="/login">
                    <span>Sign in</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showFullPlanPopup && (
        <RightCustomModal
          isOpen={showFullPlanPopup}
          onClose={handleClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <SubscriptionPlans
            setShowFullPlanPopup={setShowFullPlanPopup}
            selectedPlan={selectedPlan}
            showPlanType={showPlanType}
          />
        </RightCustomModal>
      )}
      {openVerifyNumber && (
        <CustomModal
          isOpen={openVerifyNumber}
          onClose={handleClose}
          width="70w"
        >
          <VerifyMobileNumber
            setOpenVerifyNumber={setOpenVerifyNumber}
            number={values?.mobileNumber}
          />
        </CustomModal>
      )}
    </>
  );
};
