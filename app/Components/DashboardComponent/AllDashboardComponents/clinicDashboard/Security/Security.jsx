import React, { useEffect, useRef, useState } from "react";
import styles from "./security.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  addClinicStaff,
  fetchClinicsList,
} from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { FormSelect } from "react-bootstrap";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import SwitchToggle from "@/app/Components/common/SwitchToggle/SwitchToggle";
import OtpInput from "react-otp-input";
import OTPInput from "react-otp-input";

const Security = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verificationMethod, setVerificationMethod] = useState("otp");
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const [isDarkTheme, setIsDarkTheme] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const switchToOTPVerification = () => {
    setVerificationMethod("otp");
  };

  const switchToAuthenticatorApp = () => {
    setVerificationMethod("authenticator");
  };

  const handleEmailClick = () => {
    switchToOTPVerification();
  };

  const handleAuthenticatorAppClick = () => {
    switchToAuthenticatorApp();
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
            <div className={styles.office_details_title}>Security</div>
            <div className={styles.office_details_text}>
              <div className={styles.office_details_img}>
                {isDarkTheme === "dark" ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleEmailClick}
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="21"
                      height="21"
                      rx="10.5"
                      fill="#2F2F2F"
                      stroke="#409EEE"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="14"
                      height="14"
                      rx="7"
                      fill="#409EEE"
                    />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleEmailClick}
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="21"
                      height="21"
                      rx="10.5"
                      fill="#F8F9FE"
                      stroke="#409EEE"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="14"
                      height="14"
                      rx="7"
                      fill="#409EEE"
                    />
                  </svg>
                )}{" "}
                Email
              </div>
              <div className={styles.office_details_img}>
                {isDarkTheme === "dark" ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleAuthenticatorAppClick}
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="21"
                      height="21"
                      rx="10.5"
                      fill="#2F2F2F"
                      stroke="#409EEE"
                    />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleAuthenticatorAppClick}
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="21"
                      height="21"
                      rx="10.5"
                      fill="#F8F9FE"
                      stroke="#409EEE"
                    />
                  </svg>
                )}
                Authentication APP
              </div>
            </div>

            {verificationMethod === "otp" && (
              <div className={styles.add_form_box}>
                <div className={styles.office_box}>
                  <div className={styles.office_title}>OTP Verification</div>
                  <div className={styles.office_text}>
                    Please type verification code sent to your mail
                  </div>
                  <div className={styles.sendotp_text}>Send OTP</div>
                  <div className={styles.otp_input}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className={styles.otp_digit}
                      />
                    ))}
                  </div>
                  <button className={styles.verify_otp}>Verify</button>
                </div>
              </div>
            )}

            {verificationMethod === "authenticator" && (
              <div className={styles.add_form_box}>
                <div className={styles.office_box}>
                  <div className={styles.office_title}>
                    Use An Authenticator App
                  </div>
                  <div className={styles.office_text}>
                    Download the free google authenticator app add a new account
                    then scan this barcode to set up your account
                  </div>

                  <div className={styles.otp_input}>
                    {/* <svg
                      width="154"
                      height="154"
                      viewBox="0 0 154 154"
                      fill="none"
                    >
                      {/ Your barcode SVG or component here /}
                    </svg> */}
                    <Image src={Images.qr_code}></Image>
                  </div>
                  <div className={styles.otp_input_verify}>
                    <input type="text" placeholder="Enter code" />
                  </div>
                </div>
              </div>
            )}

            <div className={styles.add_new_btn}>
              <div className={styles.add_btn1}>
                <button>SAVE changes</button>
              </div>
              <div className={styles.add_btn2}>
                <button>Send Request</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
