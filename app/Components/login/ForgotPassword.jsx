"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Images from "../Images/Images";
import Link from "next/link";
import styles from "./login.module.scss";
import { forgetpasswords } from "@/app/store/slices/authSlices";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import Image from "next/image";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import { validateInput } from "../common/ValidateInput/validateInput";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
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

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSendButtonClick = async (e) => {
    e.preventDefault();

    let errors = validateInput(values, { email: ["required", "emailOrPhone"] });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const data = {
        email: values?.email,
      };

      const actionResult = await dispatch(forgetpasswords(data));
      // Check the result for success
      if (actionResult.payload.data.success) {
        toast.success(actionResult.payload.data.message);
        localStorage.setItem("forgetpasswordkey", "forgetpasswordverify");
        router.push(`/otp-verification?email=${values?.email}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
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
              <span>Forgot</span> Password
            </div>
            <form className={styles.login_form}>
              <div className={styles.name_row}>
                <div className={styles.lable_with_inp}>
                  <label>Email or Phone Number</label>
                  <div className={styles.inp_with_icon}>
                    <input
                      className={styles.input_text}
                      type="text"
                      name="email"
                      placeholder="Enter your email or phone number"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors?.email && (
                    <div className={styles.error_message}>{errors?.email}</div>
                  )}
                </div>
              </div>
              <div className={styles.forgot_pass}>
                <button
                  className={styles.login_btn}
                  onClick={handleSendButtonClick}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className={styles.login_right_container}>
            <Image src={Images.uNext_Web} alt="unext logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
