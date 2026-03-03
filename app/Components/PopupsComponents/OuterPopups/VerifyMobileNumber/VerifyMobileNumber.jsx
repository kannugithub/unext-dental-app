import React, { useEffect, useState } from "react";
import styles from "./verifyMobileNumber.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import {
  resendOtpForNumberVerify,
  setAuthState,
  verifyRegisterUser,
} from "@/app/store/slices/authSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ButtonSpinnerLoader from "@/app/Components/common/SpinnerLoader/ButtonSpinnerLoader";
import { useAppSelector } from "@/app/store/lib/hooks";

const VerifyMobileNumber = ({ setOpenVerifyNumber, number }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reOtp, setReOtp] = useState(true);
  const [time, setTime] = useState(60);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleOtp = (value) => {
    setOtp(value);
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
      number: number === "null" ? userInfoData?.user?.p_number : "+1" + number,
    };
    setOtp();
    try {
      const actionResult = await dispatch(resendOtpForNumberVerify(data));
      const { success, message } = unwrapResult(actionResult);
      toast.error(actionResult?.payload?.error);
      if (success) {
        toast.success(message || actionResult?.payload?.error);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const data = {
      number: number === "null" ? userInfoData?.user?.p_number : "+1" + number,
      otp: Number(otp),
    };
    if (otp === "" || otp === undefined || otp === null) {
      toast.error("Please enter otp");
      return;
    }
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const actionResult = await dispatch(verifyRegisterUser(data));
      const { success, message, token } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        localStorage.setItem("token", token);
        dispatch(setAuthState(token));
        router.push("/dashboard/clinic-dashboard");
        setOpenVerifyNumber(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.welcome_container}>
          <div className={styles.left_control}>
            <div className={styles.logo_div}>
              {isDarkTheme === "dark" ? (
                <Image src={Images.unextlogodarktheme} alt="" />
              ) : (
                <Image src={Images.unext_logo} alt="" />
              )}
            </div>
            <div className={styles.welcome_tag}>
              <span>Verify OTP </span>
            </div>
            <div className={styles.get_the_most}>
              To get the most out of the platform pls proceed with the following
              steps
            </div>
            <div className={styles.get_otp_email}>
              Enter OTP Received on Email or Phone Number
            </div>
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
                <div>
                  if You Don’t Receive A Code{" "}
                  <span onClick={resendOtp}>Resend</span>{" "}
                </div>
              ) : (
                <div className={styles.otp_timer}>
                  {" "}
                  You can resend an OTP after <span>{time} seconds</span>
                </div>
              )}
            </div>
            <div className={styles.continue_btn}>
              <button onClick={(e) => handleVerifyOtp(e)} disabled={isLoading}>
                Verify{" "}
                {isLoading ? (
                  <ButtonSpinnerLoader />
                ) : (
                  <Image src={Images.arrow} alt="" />
                )}
              </button>
            </div>
          </div>
          <div className={styles.right_control}>
            <Image src={Images.welcomeFirst1} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyMobileNumber;
