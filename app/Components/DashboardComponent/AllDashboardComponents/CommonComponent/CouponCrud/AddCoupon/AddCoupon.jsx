import React, { useEffect, useState } from "react";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Row,
  FormSelect,
} from "react-bootstrap";
import styles from "./addCoupon.module.scss";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { useDispatch } from "react-redux";
import { addCoupons } from "@/app/store/slices/superAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
const AddCoupon = ({ changeTab }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "discount") {
      newValue = newValue.replace(/\D/g, "");
    }

    const trimmedValue = newValue.trim(); // Trim leading and trailing spaces
    setValues({ ...values, [name]: trimmedValue });
    setErrors({ ...errors, [name]: false });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e, "jksdks");

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
    const data = {
      coupon: values.coupon_name,
      discount: values.discount,
      expiration: values.expirayDate,
    };
    console.log(data, "data");
    if (disableButton) {
      return;
    }
    setDisableButton(true);
    try {
      const actionResult = await dispatch(addCoupons(data));
      const { sucess, message } = unwrapResult(actionResult);
      if (sucess) {
        setDisableButton(false);
        router.push("/dashboard/coupon");
        toast.success(message);
      }
    } catch (error) {
      // toast.error(error.message);
      setDisableButton(false);
      toast.error("Coupon is already exist");
    }
  };
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.addOffice_container}>
          <div className={styles.add_new_dental_box}>
            <Row>
              <div className="col-md-8">
                {/* <Link
                  href="/dashboard/coupon"
                  style={{ textDecoration: "none" }}
                > */}
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
                  <h1>Add New Coupon</h1>
                </div>
                {/* </Link> */}
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
                      <label>Expiration Date</label>
                      <FormControl
                        className={styles.input}
                        type="date"
                        name="expirayDate"
                        value={values.expirayDate}
                        onChange={handleChange}
                        min={currentDate} // Set minimum date to current date
                      />

                      {errors.expirayDate && (
                        <span className={styles.error}>
                          {errors.expirayDate}
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
              {
                <button disabled={disableButton} onClick={handleSubmit}>
                  Create Coupon
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
