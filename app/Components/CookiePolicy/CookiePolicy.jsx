"use client";
import React from "react";
import styles from "../privacypolicy/privacypolicy.module.scss";
import Header from "../Header/Header";
import Images from "../Images/Images";
import Image from "next/image";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const CookiePolicy = () => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  // console.log(isDarkTheme, "isDarkTheme");
  // const isDarkTheme = localStorage.getItem("theme");
  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.home_wrapper}>
          <div className={styles.home_wrapper2}>
            <Header />

            <div className="container">
              <div className={styles.upper_div}>
                <p>Cookie Policy</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className={styles.main_div_content}>
              <div className={styles.main_div}>
                <h1>Cookie Policy</h1>
                <p>
                  At <span>uNEXT</span>, we prioritize the privacy and security
                  of our users. This Cookie Policy outlines how we utilize
                  cookies on our website. Please read this policy carefully to
                  understand how we collect and use these cookies..
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>What are Cookies?</h1>
                <p>
                  Cookies are small text files that are placed on your device
                  (computer, smartphone, etc.) when you visit websites. While
                  most commonly used to analyze website traffic and improve
                  performance, here at [Website Name], we want to assure you
                  that we do not collect any personal data through cookies.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>How We Use Cookies</h1>
                <p>
                  Our cookies serve the purpose of analyzing website traffic and
                  performance, allowing us to understand how users interact with
                  our website and make improvements accordingly. These cookies
                  are anonymous and do not store any personal information.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Managing Cookies</h1>
                <p>
                  It is important to note that you have the ability to control
                  and manage cookies in your browser settings. You can choose to
                  accept or reject cookies, or even set preferences for specific
                  websites. However, bear in mind that disabling or rejecting
                  cookies may impact certain functionalities or features of our
                  website.
                </p>
              </div>

              <div className={styles.main_div}>
                <h1>Your Privacy Matters</h1>
                <p>
                  We are firm believers in safeguarding your privacy. Rest
                  assured, we do not collect any personal data through cookies.
                  For more information on how we protect your privacy, please
                  refer to our Privacy Policy.
                  <br />
                  Thank you for taking the time to understand our Cookie Policy.
                  If you have any further questions or concerns, please feel
                  free to reach out to us at{" "}
                  <a href="mailto:support@gounext.com">support@gounext.com.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
