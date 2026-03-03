"use client";
import React, { useState } from "react";
import styles from "./aboutApp.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import Image from "next/image";
import Images from "../../Images/Images";
import moment from "moment";
import Modal from "react-responsive-modal";
import axios from "axios";
import { toast } from "react-toastify";
import { validateInput } from "../../common/ValidateInput/validateInput";
import { sendDemoDetails } from "@/app/store/slices/authSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import RequestDemo from "../../common/RequestDemo/RequestDemo";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const AboutApp = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(true);
  };

  const onOpenModal = () => {
    setOpen(true);
    setMenuOpen(false);
  };
  const onCloseModal = () => setOpen(false);

  const handleClose = () => setMenuOpen(false);

  const inputHeaderHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  console.log(errors);

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
        <Row className={styles.second_part} id="aboutus">
          <Col lg={6} className={styles.second_left}>
            <div className={styles.second_left_img}>
              <Image
                src={
                  isDarkTheme
                    ? Images.second_banner_dark
                    : Images.second_banner_img
                }
                alt=""
              />
            </div>
          </Col>
          <Col lg={6} className={styles.second_right}>
            <h4>About App</h4>
            <h3>
              uNext App Simply <span> Better for your Business</span>
            </h3>
            <p>
              Revolutionize Your Dental Practice with Seamless Integration! Our
              Cutting-Edge App Links VOIP Communication with Your Dental
              Management Software, Empowering You to Instantly Access Patient
              Details, Appointment Info, Payment History, Voicemail, Live Team
              Chat, Practice Analytics, Send and receive Fax, and Much More – In
              Real Time, All at Your Fingertips!
            </p>
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
          </Col>
        </Row>
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        className={styles.modal_wrapper}
      >
        <RequestDemo onCloseModal={onCloseModal} />
      </Modal>
    </>
  );
};

export default AboutApp;
