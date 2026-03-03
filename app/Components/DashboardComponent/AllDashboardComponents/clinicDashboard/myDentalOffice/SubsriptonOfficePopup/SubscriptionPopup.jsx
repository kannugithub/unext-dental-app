import React, { useEffect, useRef, useState } from "react";
import styles from "./subscription.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/store/lib/hooks";
import {
  extensionPricing,
  signupSubscription,
} from "@/app/store/slices/authSlices";
import Stripe from "stripe";
import Images from "@/app/Components/Images/Images";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SubscriptionPlans from "@/app/Components/PopupsComponents/OuterPopups/SubscriptionPlans/SubscriptionPlans";
import { toast } from "react-toastify";
import {
  AddNewOffice,
  fetchgetSavedPayments,
  setConnectedClinicId,
} from "@/app/store/slices/clinicAdminSlices";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import ButtonSpinnerLoader from "@/app/Components/common/SpinnerLoader/ButtonSpinnerLoader";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";

const stripe = new Stripe(process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLIC_KEY);

const SubscriptionPopup = ({ setUpdatePopup }) => {
  const [selectedPlan, setSelectedPlan] = useState({
    name: "uNext Started",
    price: "35.00",
    hideMenu: false,
  });
  const [values, setValues] = useState({ countryCode: "US" });
  const [extensionValues, setExtensionValues] = useState({
    physicalCount: 0,
    remoteCount: 1,
  });
  const [errors, setErrors] = useState({});
  const [activePlan, setActivePlan] = useState(null);
  const [selctedAmount, setSelectedAmount] = useState(null);
  const [showFullPlanPopup, setShowFullPlanPopup] = useState(false);
  const [showPlanType, setShowPlanType] = useState("");
  const [extensionType, setExtensionType] = useState(null);
  const firstUpdate = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [stripeApiCallInProgress, setStripeApiCallInProgress] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [clinicId, setClinicId] = useState();
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const savedPaymentList = useAppSelector(
    (state) => state.clinic.savedPaymentList
  );

  const extensionPriceAmount = useAppSelector(
    (state) => state.authWeb.extensionPrice
  );
  const isDarkTheme = useAppSelector((state) => state.darkTheme.isDarkTheme);

  const dispatch = useAppDispatch();
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

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const selectedPlanName = localStorage.getItem("selectedPlan");
  //     const plan = plans.find((plan) => plan.name === selectedPlanName);
  //     setSelectedPlan(plan);
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    if (clinicId) {
      dispatch(fetchgetSavedPayments(clinicId));
    }
  }, [dispatch, clinicId, userInfoData]);

  const handleActivePlan = (type, amount) => {
    setSelectedAmount(amount);
    setActivePlan(type);
  };

  const handleTypes = (type) => {
    setExtensionType(type);
  };

  useEffect(() => {
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
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    const validations = {
      activePlan: ["activePlan"],
    };

    const allValues = { ...values, activePlan };

    const errors = validateInput(allValues, validations);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    const data = {
      email: userInfoData?.user?.email,
      amount: selctedAmount,
      physical_extension: extensionValues.physicalCount,
      physical_extension_type: extensionType,
      remote_extension: extensionValues.remoteCount,
      subscription: activePlan,
      subscription_plan:
        selectedPlan.name.toLowerCase() === "unext started" ? "started" : "pro",
    };

    try {
      const actionResult = await dispatch(AddNewOffice(data));
      const {
        success,
        message,
        clinicId: newClinicId,
      } = actionResult.payload.data;

      if (success) {
        const currentClinicId = localStorage.getItem("clinicId");
        localStorage.setItem("previousClinicId", currentClinicId);
        dispatch(setConnectedClinicId(newClinicId));
        localStorage.setItem("clinicId", newClinicId);
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
    setShowFullPlanPopup(false);
  };

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.subscription_plan}>
          <div className={styles.imges_cross}>
            {isDarkTheme ? (
              <Image
                src={Images.whiteclose_icon}
                onClick={() => setUpdatePopup(false)}
              ></Image>
            ) : (
              <Image
                src={Images.blackCrossIcon}
                onClick={() => setUpdatePopup(false)}
              ></Image>
            )}
          </div>
          <div className="container">
            <div className={styles.subs_head}>Purchase Subscription</div>
            <div className={styles.payMonthly}>
              Fill in your credentials and click on the Enroll button
            </div>
            {plans.map((plan, index) => (
              <div className={styles.plan_box_container} key={index}>
                <div className={styles.planBox}>
                  <div className={styles.radio_inp}>
                    <input
                      type="radio"
                      id={plan.name}
                      checked={selectedPlan && selectedPlan.name === plan.name}
                      onChange={() => {
                        setSelectedPlan(plan);
                      }}
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
                          <Image src={Images.upArrown} alt="up arrow" />
                        ) : (
                          <Image src={Images.blackUpArrow} alt="black arrow" />
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
                          <Image src={Images.downArrwo} alt="down arrow" />
                        ) : (
                          <Image
                            src={Images.blackDownArrow}
                            alt="black arrow"
                          />
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

              <div className={styles.payment_info}>
                <div className={styles.payment_info_txt}>
                  Payment Information
                </div>
                <div className={styles.payment_info_text}></div>
              </div>
              <div className={styles.payment_info}>
                <div className={styles.payment_info_txt}>Primary</div>
              </div>
              <div className={styles.signup_extension_form}>
                {savedPaymentList?.data?.map((item, key) => (
                  <div key={key}>
                    {item?.is_primary && (
                      <div className={styles.input_text}>
                        *** *** {item?.last4}
                      </div>
                    )}
                  </div>
                ))}
              </div>

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
              <div className={styles.enroll_subs}>
                <button
                  onClick={handleEnroll}
                  disabled={stripeApiCallInProgress || isLoading}
                >
                  <span>Enroll</span>
                  {isLoading && <ButtonSpinnerLoader />}
                </button>
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
    </>
  );
};

export default SubscriptionPopup;
