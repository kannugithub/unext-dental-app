"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import Image from "next/image";
import Images from "../Images/Images";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import {
  onResendOtp,
  setAuthState,
  verifyOtp,
  forgotPasswordVerifyOtp,
} from "@/app/store/slices/authSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [url, setUrl] = useState();
  const [time, setTime] = useState(60);
  const [reOtp, setReOtp] = useState(true);
  const [forgetPassword, setForgetPassword] = useState("");
  const token = useSelector((state) => state.authWeb.token);
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
      const themeData = localStorage.getItem("theme");
      setIsDarkTheme(themeData);
    }
  }, [reduxTheme]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setForgetPassword(localStorage.getItem("forgetpasswordkey"));
    }
  }, [forgetPassword]);

  useEffect(() => {
    if (token) {
      router.push("/dashboard/clinic-dashboard");
      return;
    }
  }, [token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const params = new URLSearchParams(url?.split("?")[1]);
  const userEmail = params.get("email");

  const router = useRouter();
  const handleOtp = (value) => {
    setOtp(value);
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const data = {
      email: userEmail,
      otp: Number(otp),
    };

    try {
      if (forgetPassword) {
        const actionResult = await dispatch(forgotPasswordVerifyOtp(data));
        const { success, message, token } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
          // localStorage.setItem("token", token);
          // dispatch(setAuthState(token));
          router.push("/new-pasword");
          localStorage.setItem("email", data?.email);
          localStorage.removeItem("forgetpasswordkey");
        }
      } else {
        const actionResult = await dispatch(verifyOtp(data));
        const { success, message, token } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
          localStorage.setItem("token", token);
          dispatch(setAuthState(token));
          router.push("/dashboard/clinic-dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setReOtp(false);
    let i = 1;
    const timeout2 = setInterval(() => {
      setTime(time - i);
      i = i + 1;
    }, 1000);
    setTimeout(() => {
      setReOtp(true);
      clearInterval(timeout2);
      setTime(60);
    }, 60000);
  }, []);

  const resendOtp = async () => {
    const data = {
      email: userEmail,
    };
    setOtp();
    try {
      const actionResult = await dispatch(onResendOtp(data));
      const { success, message, token } = unwrapResult(actionResult);
      toast.error(actionResult?.payload?.error);
      if (success) {
        toast.success(message || actionResult?.payload?.error);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
    // dispatch(onResendOtp(data));
    setReOtp(false);
    let i = 1;
    const timeout2 = setInterval(() => {
      setTime(time - i);
      i = i + 1;
    }, 1000);
    setTimeout(() => {
      setReOtp(true);
      clearInterval(timeout2);
      setTime(60);
    }, 60000);
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.login_image_container}>
        <div className={styles.left_login_content}>
          <div className={styles.dd_login_logo}>
            <Link href="/">
              {isDarkTheme === "dark" ? (
                <Image src={Images.unextlogodarktheme} alt="unext logo" />
              ) : (
                <Image src={Images.unext_logo} alt="unext logo" />
              )}
            </Link>
          </div>
          <div className={styles.login_account_title}>
            {" "}
            <span>Verification</span>
          </div>
          <form className={styles.login_form}>
            <div className={styles.name_row}>
              <div className={styles.lable_with_inp}>
                <label>Enter Verification Code</label>
                <div className={styles.otp_boxs}>
                  <OtpInput
                    className="otp_box_div"
                    value={otp}
                    onChange={handleOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <div className={styles.otp_receive}>
                  {reOtp ? (
                    <div className={styles.otp_timer}>
                      if You Don’t Receive A Code{" "}
                      <span onClick={resendOtp}>Resend</span>{" "}
                    </div>
                  ) : (
                    <div className={styles.otp_timer}>
                      You can resend an OTP after <span>{time} seconds</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.forgot_pass}>
              <button
                className={styles.login_btn}
                type="submit"
                onClick={(e) => handleVerifyOtp(e)}
              >
                Verify
              </button>
            </div>
          </form>
        </div>
        <div className={styles.login_right_container}>
          <Image src={Images.uNext_Web} alt="unext full web" />
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
