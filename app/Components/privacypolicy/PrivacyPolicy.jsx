"use client";
import React from "react";
import styles from "./privacypolicy.module.scss";
import Header from "../Header/Header";
import Images from "../Images/Images";
import Image from "next/image";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const PrivacyPolicy = () => {
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
                <p>privacy policy</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className={styles.main_div_content}>
              <div className={styles.main_div}>
                <h1>Privacy Policy</h1>
                <p>
                  This Privacy Policy describes how <span>uNext</span>, LLC ("
                  <span>uNext</span>," "we," or "us") collects, uses, and shares
                  your information when you use the <span>uNext</span> website
                  and mobile application (the "Service").
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Information We Collect</h1>
                <p>
                  <span> Information You Provide:</span> When you use the
                  Service, you may provide us with certain information, such as
                  your name, email address, phone number, and other contact
                  details.
                </p>
                <p>
                  <span>Automatically Collected Information:</span> We may
                  automatically collect certain information about your use of
                  the Service, including your IP address, device information,
                  and usage data.
                </p>
                <p>
                  <span>Automatically Collected Information:</span> We may
                  automatically collect certain information about your use of
                  the Service, including your IP address, device information,
                  and usage data.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Sharing Your Information</h1>
                <p>
                  <span>Service Providers: </span> We may share your information
                  with third-party service providers who assist us in operating
                  the Service and providing related services.
                </p>
                <p>
                  <span>Legal Compliance:</span>We may disclose your information
                  if required to do so by law or in response to a valid legal
                  request, such as a court order or subpoena.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Data Retention</h1>
                <p>
                  We retain your information for as long as necessary to fulfill
                  the purposes outlined in this Privacy Policy, unless a longer
                  retention period is required or permitted by law.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Your Choices</h1>
                <p>
                  <span>Your Choices </span>You may opt out of receiving
                  promotional emails from us by following the instructions
                  provided in the emails. Please note that even if you opt-out,
                  we may still send you non-promotional communications.
                </p>
                <p>
                  <span>Access and Update: </span> You may access and update
                  your personal information by logging into your account and
                  editing your profile.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Security</h1>
                <p>
                  We value your trust in providing us With your Personal
                  Information, thus we are striving to use commercially
                  acceptable means of protecting it. But remember that no method
                  of transmission over the internet, or method of electronic
                  storage is 100% secure and reliable, and we cannot guarantee
                  its absolute security.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Children's Privacy</h1>
                <p>
                  The Service is not intended for use by children under the age
                  of 18. We do not knowingly collect personal information from
                  children under 18. If you are a parent or guardian and believe
                  that your child has provided us with personal information,
                  please contact us to request deletion of the information.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Children's Privacy</h1>
                <p>
                  The Service is not intended for use by children under the age
                  of 18. We do not knowingly collect personal information from
                  children under 18. If you are a parent or guardian and believe
                  that your child has provided us with personal information,
                  please contact us to request deletion of the information.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Data Security</h1>
                <p>
                  We take reasonable measures to protect the security of your
                  information, but no method of transmission over the Internet
                  or electronic storage is 100% secure. Therefore, we cannot
                  guarantee absolute security.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Changes to Privacy Policy</h1>
                <p>
                  We reserve the right to modify or revise this Privacy Policy
                  at any time. The updated Privacy Policy will be posted on the
                  Service, and your continued use of the Service constitutes
                  acceptance of the revised Privacy Policy.
                </p>
              </div>
              <div className={styles.main_div}>
                <h1>Contact Us</h1>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at &nbsp;
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

export default PrivacyPolicy;
