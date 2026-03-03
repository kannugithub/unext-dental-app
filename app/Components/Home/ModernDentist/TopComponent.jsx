"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Images from "../../Images/Images";
import styles from "./topcompnent.module.scss";
import Modal from "react-responsive-modal";
import moment from "moment";
import { toast } from "react-toastify";
import { sendDemoDetails } from "@/app/store/slices/authSlices";
import { validateInput } from "../../common/ValidateInput/validateInput";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import RequestDemo from "../../common/RequestDemo/RequestDemo";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const TopComponent = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const onOpenModal = (e) => {
    e.preventDefault();
    // const { email } = values;

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (email && email.trim() !== "") {
    //   if (emailRegex.test(email.trim())) {
    setOpen(true);
    //   } else {
    //     toast.error("Please enter a valid email address");
    //   }
    // } else {
    //   toast.error("Email is required");
    // }
  };
  const onCloseModal = () => setOpen(false);

  const inputHeaderHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const seduleSubmitHandler = async (e) => {
    e.preventDefault();
    setErrors(validateInput(values));

    const data = {
      email: values?.email,
      title: "Testing Demo",
      first_name: values?.first_name,
      last_name: values?.last_name,
      date: values?.date,
      address: values?.address,
    };
    try {
      const actionResult = await dispatch(sendDemoDetails({ data, setOpen }));
      const { success, message } = unwrapResult(actionResult);

      if (success) {
        toast.success(message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <Row className={styles.Col_of_row} id="home">
          <Col lg={6} className={styles.left_col}>
            <h5>Designed For The </h5>
            <h3>Modern Dentist</h3>
            <p>
              Enhance the Management of Your Dental Practice with the Aid of
              Technology, Streamlining Business Growth Efforts
            </p>
            <h6>Available For Download Soon:</h6>
            <div className={styles.btn_div_logo}>
              <Button className={styles.btn_logo}>
                <span className={styles.span_1}>
                  <svg
                    enable-background="new 0 0 40 40"
                    height="35px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 56.693 56.693"
                    width="35px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        d="M41.777,30.517c-0.062-6.232,5.082-9.221,5.312-9.372c-2.891-4.227-7.395-4.807-8.998-4.873   c-3.83-0.389-7.477,2.256-9.42,2.256c-1.939,0-4.941-2.199-8.117-2.143c-4.178,0.062-8.029,2.43-10.179,6.17   c-4.339,7.527-1.11,18.682,3.118,24.791c2.067,2.986,4.532,6.346,7.766,6.223c3.117-0.123,4.293-2.016,8.061-2.016   s4.826,2.016,8.123,1.953c3.352-0.061,5.477-3.043,7.527-6.041c2.373-3.469,3.35-6.828,3.408-6.998   C48.305,40.433,41.844,37.958,41.777,30.517z"
                        fill="#ffffff"
                      />
                      <path
                        d="M35.582,12.229c1.715-2.082,2.877-4.975,2.561-7.855c-2.475,0.1-5.471,1.645-7.248,3.725   c-1.592,1.846-2.984,4.785-2.611,7.613C31.045,15.926,33.861,14.307,35.582,12.229z"
                        fill="#ffffff"
                      />
                    </g>
                  </svg>
                </span>
                <span className={styles.span_2}>
                  <span className={styles.span_21}> Download on the</span>
                  <span className={styles.span_22}> App Store</span>
                </span>
              </Button>
              <Button className={styles.btn_logo}>
                <span className={styles.span_1}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 480 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M264.8 246.201L27.4698 484.201C21.8632 478.846 17.4188 472.395 14.4132 465.248C11.4077 458.102 9.90537 450.413 9.9998 442.661V69.4208C9.9518 61.5328 11.5339 53.7199 14.6468 46.4719C17.7597 39.2239 22.3363 32.6972 28.0898 27.3008L264.8 246.201Z"
                      fill="#2299F8"
                    />
                    <path
                      d="M469.93 256.001C469.93 277.521 458.27 296.581 438.93 307.351L371.51 344.901L287.8 267.411L264.8 246.201L353.41 157.351L439 204.691C458.31 215.461 470 234.521 470 256.041L469.93 256.001Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M264.8 246.2L28.0898 27.3004C31.4322 24.1283 35.1223 21.3439 39.0898 19.0004C58.4098 7.32036 81.7098 7.00036 101.64 18.0804L353.41 157.35L264.8 246.2Z"
                      fill="#5ACF5F"
                    />
                    <path
                      d="M371.51 344.9L101.68 494C92.3372 499.324 81.753 502.084 71 502C59.7457 502.095 48.6939 499.007 39.12 493.09C34.8583 490.642 30.9379 487.643 27.46 484.17L264.79 246.17L287.79 267.38L371.51 344.9Z"
                      fill="#F84437"
                    />
                  </svg>
                </span>
                <span className={styles.span_2}>
                  <span className={styles.span_21}>Get it on</span>
                  <span className={styles.span_22}>Google Play</span>
                </span>
              </Button>
            </div>
            <div className={styles.input_of_upper} onSubmit={onOpenModal}>
              {/* <input
                className={styles.inputs_text}
                type="text"
                placeholder="Enter your email."
                onChange={inputHeaderHandler}
                name="email"
              /> */}

              <Button className={styles.btn_head2} onClick={onOpenModal}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2416_125)">
                    <path
                      d="M20.1671 2.0625H17.1875V0.6875C17.1875 0.307313 16.8802 0 16.5 0C16.1198 0 15.8125 0.307313 15.8125 0.6875V2.0625H11.6875V0.6875C11.6875 0.307313 11.3795 0 11 0C10.6205 0 10.3125 0.307313 10.3125 0.6875V2.0625H6.1875V0.6875C6.1875 0.307313 5.8795 0 5.5 0C5.1205 0 4.8125 0.307313 4.8125 0.6875V2.0625H1.83356C0.820875 2.0625 0 2.88269 0 3.89538V20.1664C0 21.1791 0.820875 22 1.83356 22H20.1671C21.1798 22 22 21.1791 22 20.1664V3.89538C22 2.88269 21.1798 2.0625 20.1671 2.0625ZM20.625 20.1664C20.625 20.4194 20.4194 20.625 20.1671 20.625H1.83356C1.58056 20.625 1.375 20.4194 1.375 20.1664V3.89538C1.375 3.64306 1.58056 3.4375 1.83356 3.4375H4.8125V4.8125C4.8125 5.19269 5.1205 5.5 5.5 5.5C5.8795 5.5 6.1875 5.19269 6.1875 4.8125V3.4375H10.3125V4.8125C10.3125 5.19269 10.6205 5.5 11 5.5C11.3795 5.5 11.6875 5.19269 11.6875 4.8125V3.4375H15.8125V4.8125C15.8125 5.19269 16.1198 5.5 16.5 5.5C16.8802 5.5 17.1875 5.19269 17.1875 4.8125V3.4375H20.1671C20.4194 3.4375 20.625 3.64306 20.625 3.89538V20.1664Z"
                      fill="white"
                    />
                    <path
                      d="M7.5625 8.25H4.8125V10.3125H7.5625V8.25Z"
                      fill="white"
                    />
                    <path
                      d="M7.5625 11.6875H4.8125V13.75H7.5625V11.6875Z"
                      fill="white"
                    />
                    <path
                      d="M7.5625 15.125H4.8125V17.1875H7.5625V15.125Z"
                      fill="white"
                    />
                    <path
                      d="M12.375 15.125H9.625V17.1875H12.375V15.125Z"
                      fill="white"
                    />
                    <path
                      d="M12.375 11.6875H9.625V13.75H12.375V11.6875Z"
                      fill="white"
                    />
                    <path
                      d="M12.375 8.25H9.625V10.3125H12.375V8.25Z"
                      fill="white"
                    />
                    <path
                      d="M17.1875 15.125H14.4375V17.1875H17.1875V15.125Z"
                      fill="white"
                    />
                    <path
                      d="M17.1875 11.6875H14.4375V13.75H17.1875V11.6875Z"
                      fill="white"
                    />
                    <path
                      d="M17.1875 8.25H14.4375V10.3125H17.1875V8.25Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2416_125">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Schedule A Demo
              </Button>
              <Image
                src={isDarkTheme ? Images.arrow_dark : Images.arrow_1}
                className={styles.img_of_upper}
                alt=""
              />
            </div>
          </Col>
          <Col lg={6} className={styles.right_col}>
            <Image
              src={isDarkTheme ? Images.right_col_dark : Images.home_banner}
              alt=""
            />
          </Col>
        </Row>
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        className={styles.modal_wrapper}
      >
        {/* <div className={styles.modal_wrapper2}>
          <h4>Request a Demo</h4>
          <hr />
          <form onSubmit={seduleSubmitHandler}>
            <div className={styles.lab_name_div}>
              <div className={styles.lab_name}>
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={inputHeaderHandler}
                />
              </div>
              <div className={styles.lab_name}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={inputHeaderHandler}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "50%" }}>
                {errors?.first_name && (
                  <p style={{ color: "red" }}>{errors.first_name} </p>
                )}
              </div>
              <div style={{ width: "50%" }}>
                {errors?.last_name && (
                  <p style={{ color: "red" }}>{errors.last_name} </p>
                )}
              </div>
            </div>
            <div className={styles.lab_name_div}>
              <div className={styles.lab_name}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={inputHeaderHandler}
                  value={values?.email}
                />
              </div>
              <div className={styles.lab_name}>
                <label>Date & TIme</label>
                <input
                  type="datetime-local"
                  name="date"
                  placeholder="YYYY-MM-DD"
                  onChange={inputHeaderHandler}
                  min={moment(new Date()).format("YYYY-MM-DD")}
                  // max={moment(productAvailability?.to_date).format("YYYY-MM-DD")}
                  className={styles.datepicker_input}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "50%" }}>
                {errors?.email && (
                  <p style={{ color: "red" }}>{errors.email} </p>
                )}
              </div>
              <div style={{ width: "50%" }}>
                {errors?.date && <p style={{ color: "red" }}>{errors.date} </p>}
              </div>
            </div>
            <div className={styles.lab_name_add}>
              <div className={styles.lab_names}>
                <label>Address</label>
                <textarea
                  cols="30"
                  rows="5"
                  name="address"
                  className={styles.text_area}
                  onChange={inputHeaderHandler}
                ></textarea>
              </div>
              <div style={{ width: "50%" }}>
                {errors?.address && (
                  <p style={{ color: "red" }}>{errors.address} </p>
                )}
              </div>
            </div>
            <div className={styles.btn_div_modal}>
              <Button type="submit">
                Send Request{" "}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1249 8.325L2.69985 1.57501C2.02485 1.27501 1.27485 1.87501 1.57485 2.55001L3.44985 7.575L11.9998 9L3.44985 10.425L1.57485 15.45C1.34985 16.125 2.02485 16.725 2.69985 16.35L16.1249 9.6C16.6499 9.375 16.6499 8.625 16.1249 8.325Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </div>
          </form>
        </div> */}
        <RequestDemo onCloseModal={onCloseModal} />
      </Modal>
    </>
  );
};

export default TopComponent;
