"use client";
import React from "react";
import styles from "./termscondition.module.scss";
import Header from "../Header/Header";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const TermsAndCondition = () => {
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
                <p>terms and condition</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className={styles.main_div_content}>
              <div className={styles.main_div}>
                <h1>Acceptance of Terms and Conditions</h1>
                <p>
                  By Downloading, Accessing, Or Using The <span>uNext</span>{" "}
                  Mobile App ("App"), Or Website, You Agree To Comply With And
                  Be Bound By These Terms And Conditions. If You Do Not Agree
                  With These Terms, Please Do Not Use The App.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Terms and Conditions</h1>
                <h6>Introduction</h6>
                <p>
                  Welcome to the <span>uNext</span> website and mobile
                  application (the "Service"). These Terms and Conditions
                  ("Terms") govern your use of the Service provided by{" "}
                  <span>uNext</span>, LLC ("<span>uNext</span>," "we," or "us").
                  By accessing or using the Service, you agree to be bound by
                  these Terms.
                </p>
              </div>
              <div className={styles.main_div}>
                <h6>Use of Service</h6>
                <p>
                  <span> 1.</span> Eligibility: You must be at least 18 years
                  old to use the Service.
                </p>
                <p>
                  <span> 2. </span> License: <span>uNext</span> grants you a
                  limited, non-exclusive, non-transferable license to access and
                  use the Service for your personal or business purposes.
                </p>
              </div>
              <div className={styles.main_div}>
                <h6>Privacy Policy</h6>
                <p>
                  Your use of the Service is also subject to our Privacy Policy,
                  which can be found here. By using the Service, you consent to
                  the collection and use of your information as described in the
                  Privacy Policy.
                </p>
              </div>
              <div className={styles.main_div}>
                <h6>Intellectual Property</h6>
                <p>
                  <span> 1.</span> Ownership: <span>uNext</span> retains all
                  rights, title, and interest in and to the Service, including
                  all intellectual property rights.
                </p>
                <p>
                  <span> 2. </span> <span>uNext</span> does not warrant that the
                  Service will be uninterrupted or error-free, or that any
                  defects in the Service will be corrected.
                </p>
              </div>
              <div className={styles.main_div}>
                <h6>Disclaimers</h6>
                <p>
                  <span> 1.</span> The Service is provided on an "as-is" and
                  "as-available" basis, without warranties of any kind, either
                  express or implied.
                </p>
                <p>
                  <span> 2. </span> <span>uNext</span> does not warrant that the
                  Service will be uninterrupted or error-free, or that any
                  defects in the Service will be corrected.
                </p>
              </div>
              <div className={styles.main_div}>
                <h6>Limitation of Liability</h6>
                <p>
                  <span> 2. </span>In no event shall <span>uNext</span> be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, arising out of or in connection with your
                  use of the Service.
                </p>
              </div>
              <div className={styles.main_div}>
                <h6>Governing Law</h6>
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of Florida, without regard to its conflict of
                  law principles.
                </p>
              </div>
              <div className={styles.main_div}>
                <h6>Changes to Terms</h6>
                <p>
                  <span>uNext</span> reserves the right to modify or revise
                  these Terms at any time. The updated Terms will be posted on
                  the Service, and your continued use of the Service constitutes
                  acceptance of the revised Terms.
                </p>
              </div>
              <div className={styles.main_div}>
                <h6>Contact Us</h6>
                <p>
                  If you have any questions about these Terms, please contact us
                  at &nbsp;
                  <span className={styles.light_content}>
                    support@unextcom.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndCondition;
