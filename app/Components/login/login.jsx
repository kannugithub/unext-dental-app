"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import Image from "next/image";
import Images from "../Images/Images";
import { useDispatch, useSelector } from "react-redux";
import { webLogin } from "@/app/store/slices/authSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { validateInput } from "../common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";

const Login = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.authWeb.token);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const themeData = localStorage.getItem("theme");
      setIsDarkTheme(reduxTheme ? "dark" : "light");
      setIsDarkTheme(themeData);
    }
  }, [reduxTheme]);

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  useEffect(() => {
    if (token) {
      router.push("/dashboard/clinic-dashboard");
      return;
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();

    let errors = validateInput(values, { email: ["required", "emailOrPhone"] });

    if (showPassword) {
      errors = {
        ...errors,
        ...validateInput(values, { password: ["required"] }),
      };
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("Validation errors:", errors);
      return;
    }

    const loginData = {
      email: values?.email,
      password: showPassword ? values?.password : undefined,
    };
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const actionResult = await dispatch(webLogin(loginData));
      const { success, message, role, data } = unwrapResult(actionResult);
      if (success) {
        if (typeof data === "string" && data.split(".").length === 3) {
          localStorage.setItem("token", data);
        }
        setIsLoading(false);
        toast.success(message);
        if (role === "Admin") {
          router.push(`/dashboard/clinic-dashboard`);
        } else {
          if (showPassword) {
            router.push(`/dashboard/clinic-dashboard`);
          } else {
            router.push(`/otp-verification?email=${values?.email}`);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      // toast.error(error.message || "Something went wrong");
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
              {" "}
              <span>Login</span> Your Account
            </div>
            <form className={styles.login_form} onSubmit={handleLogin}>
              <div className={styles.name_row}>
                <div className={styles.lable_with_inp}>
                  <label>Email or Phone Number</label>
                  <div className={styles.inp_with_icon}>
                    <input
                      className={styles.input_text}
                      type="text"
                      name="email"
                      placeholder="Enter your email or phone number"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {errors?.email && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "-7px",
                      }}
                    >
                      {errors.email} <br />{" "}
                    </p>
                  )}
                </div>
              </div>
              {showPassword && (
                <>
                  <div className={styles.name_row}>
                    <div className={styles.lable_with_inp}>
                      <label>Password</label>
                      <div className={styles.inp_with_icon}>
                        <input
                          className={styles.input_text}
                          name="password"
                          type="password"
                          placeholder="Enter your Password"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {errors?.password && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "12px",
                            marginTop: "-7px",
                            marginBottom: "10px",
                          }}
                        >
                          {errors.password} <br />{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              {showPassword && (
                <div className={styles.forgot_link_div}>
                  <Link href="/forgotPassword" className={styles.forgot_link}>
                    Forgot Password?
                  </Link>
                </div>
              )}

              <div className={styles.forgot_pass} onClick={handleLogin}>
                <button
                  className={styles.login_btn}
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </button>
              </div>
            </form>
            <div className={styles.bottom_div_wrapper}>
              <div className={styles.not_using}>
                <span>Not Using uNext?</span>
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem("scrollTo", "subscribeSection");
                    router.push("/");
                  }}
                  className={styles.enroll_link}
                >
                  <span>Enroll Now</span>
                </Link>
              </div>
              {!showPassword && (
                <div
                  className={styles.show_password}
                  onClick={handleShowPassword}
                >
                  Login with password
                </div>
              )}
              {showPassword && (
                <div
                  className={styles.show_password}
                  onClick={() => setShowPassword(false)}
                >
                  Login with OTP
                </div>
              )}
            </div>
          </div>

          <div className={styles.login_right_container}>
            <Image src={Images.uNext_Web} alt="unext full web" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
