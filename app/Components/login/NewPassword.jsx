"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import Image from "next/image";
import Images from "../Images/Images";
import { ResetPassword } from "@/app/store/slices/authSlices";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const NewPassword = () => {
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [email, setEmail] = useState("");
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

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Reset error when input changes
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("email"));
    }
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const SetResetPassword = async (e) => {
    e.preventDefault();

    // Check if password or confirm password is empty or contains only whitespace
    if (!values.password.trim()) {
      setErrors({ ...errors, password: "Password is required" });
      return;
    }
    if (!values.confirmPassword.trim()) {
      setErrors({ ...errors, confirmPassword: "Confirm password is required" });
      return;
    }

    // Check if password and confirm password match
    if (values.password !== values.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Confirm password does not match",
      });
      return;
    }

    const data = {
      email: email,
      password: values.password.trim(),
      confirmPassword: values.confirmPassword.trim(),
    };
    try {
      const actionResult = await dispatch(ResetPassword(data));
      const { success, message, token } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        router.push("/login");
      }
    } catch (error) {
      // Handle error
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
              <span>New</span> Password
            </div>
            <form className={styles.login_form}>
              <div className={styles.name_row}>
                <div className={styles.lable_with_inp}>
                  <label>Enter New Password</label>
                  <div className={styles.inp_with_icon}>
                    <input
                      className={styles.input_text}
                      name="password"
                      type="password"
                      placeholder="Enter your new password"
                      value={values.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.password && (
                    <p className={styles.error_message}>{errors.password}</p>
                  )}
                </div>
              </div>
              <div className={styles.name_row}>
                <div className={styles.lable_with_inp}>
                  <label>Confirm Password</label>
                  <div className={styles.inp_with_icon}>
                    <input
                      className={styles.input_text}
                      name="confirmPassword"
                      type="password"
                      placeholder="Enter your confirm password"
                      value={values.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className={styles.error_message}>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.forgot_pass}>
                <button
                  className={styles.login_btn}
                  type="submit"
                  onClick={SetResetPassword}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className={styles.login_right_container}>
            <Image src={Images.uNext_Web} alt="unext full web" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
