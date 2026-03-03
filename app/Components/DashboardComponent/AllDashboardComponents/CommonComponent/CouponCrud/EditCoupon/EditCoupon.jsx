import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "../AddCoupon/addCoupon.module.scss";
import { Form, FormGroup, FormControl, Col, Row } from "react-bootstrap";
import {
  getSingleCoupon,
  updateCouponDetails,
} from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const EditCoupon = ({ changeTab }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [valueId, setValueId] = useState({});
  const getSingleCouponData = useAppSelector(
    (state) => state.admin.getSingleCouponData
  );
  const dispatch = useDispatch();
  // const router = useRouter();
  const [url, setUrl] = useState();
  var params = new URLSearchParams(url);
  useEffect(() => {
    if (typeof window !== undefined) {
      setUrl(window.location.search);
    }
  }, [params, url]);

  useEffect(() => {
    const params = new URLSearchParams(url);
    const itemId = params.get("item");
    if (typeof window !== "undefined") {
      const dataId = localStorage.getItem("item-id");
      setValueId(dataId);
      dispatch(getSingleCoupon(dataId));
    }
  }, [url]);
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (getSingleCouponData) {
      const expirationDate = new Date(
        getSingleCouponData?.data?.expirationDate
      );
      const formattedExpiryDate = expirationDate.toISOString().slice(0, 10);
      const initialData = {
        coupon_name: getSingleCouponData?.data?.couponText,
        discount: getSingleCouponData?.data?.discount,
        expirayDate: formattedExpiryDate,
      };
      setValues(initialData);
      setInitialValues(initialData);
    }
  }, [getSingleCouponData]);

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (e.target.name === "discount") {
      // Replace non-numeric characters
      newValue = newValue.replace(/\D/g, "");
    }
    const trimmedValue = newValue.trim(); // Trim leading and trailing spaces
    setValues({ ...values, [e.target.name]: trimmedValue });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(url);
    const itemId = params.get("item");

    const validations = {
      coupon_name: ["required"],
      discount: ["required"],
      expirayDate: ["required"],
    };

    const allValues = { ...values };
    const errors = validateInput(allValues, validations);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If the values haven't changed, navigate to the next page
    // If the values haven't changed, navigate to the next page
    if (
      JSON.stringify({ ...values, discount: String(values.discount) }) ===
      JSON.stringify({
        ...initialValues,
        discount: String(initialValues.discount),
      })
    ) {
      changeTab("coupon");
      return;
    }

    const data = {
      couponText: values.coupon_name,
      discount: values.discount,
      expiration: values.expirayDate,
    };
    if (disableButton) {
      return;
    }
    setDisableButton(true);
    console.log("valueId", valueId);
    try {
      const actionResult = await dispatch(
        updateCouponDetails({ data, valueId })
      );
      const { sucess, message } = unwrapResult(actionResult);
      if (sucess) {
        setDisableButton(false);
        changeTab("coupon");
        toast.success(message);
      }
    } catch (error) {
      setDisableButton(false);
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.addOffice_container}>
          <div className={styles.add_new_dental_box}>
            <div
              className={styles.add_suer}
              onClick={() => changeTab("coupon")}
            >
              <svg
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75195 13.6209L7.81398 14.5L0.0519524 7.25L7.81398 0L8.75195 0.874531L1.93242 7.25L8.75195 13.6209Z"
                  fill={isDarkTheme === "dark" ? "white" : "black"}
                />
              </svg>
              <h1> Edit Coupon</h1>
            </div>
            <Row>
              <div className="col-md-8">
                <Row>
                  <Col md={12}>
                    <FormGroup className={styles.group}>
                      <label>Coupon Name</label>
                      <FormControl
                        className={styles.input}
                        type="text"
                        name="coupon_name"
                        placeholder="Enter coupon Name"
                        value={values.coupon_name}
                        onChange={handleChange}
                      />
                      {errors.coupon_name && (
                        <span className={styles.error}>
                          {errors.coupon_name}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup className={styles.group}>
                      <label>Create Discount</label>
                      <FormControl
                        className={styles.input}
                        type="text"
                        name="discount"
                        placeholder="Enter Discount"
                        value={values.discount}
                        onChange={handleChange}
                        maxLength="2"
                      />
                      {errors.discount && (
                        <span className={styles.error}>{errors.discount}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup className={styles.group}>
                      <label>Expiration Date</label>
                      <FormControl
                        className={styles.input}
                        type="date"
                        name="expirayDate"
                        value={values.expirayDate}
                        onChange={handleChange}
                      />
                      {errors.expirayDate && (
                        <span className={styles.error}>
                          {errors.expirayDate}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div className="col-md-4">
                <div className={styles.img_upload_box}>
                  <div className={styles.img_boxes}>
                    <div className={styles.legends}>
                      <div className={styles.legend_coupons}>Coupon Code</div>
                      <span>{values.coupon_name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Row>

            <div className={styles.add_new_dental_btn}>
              <button disabled={disableButton} onClick={handleSubmit}>
                Update Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCoupon;
