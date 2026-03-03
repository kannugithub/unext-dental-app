import React, { useEffect, useState } from "react";
import styles from "./clinicWelcome.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const ClinicWelcomePopup = ({ onNext }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
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
              <span>Welcome </span> to uNext
            </div>
            <div className={styles.get_the_most}>
              To get the most out of the platform pls proceed with the following
              steps
            </div>
            <div className={styles.create_acc_div}>
              <div>
                {isDarkTheme === "dark" ? (
                  <Image src={Images.clinicBuildingIcon_dark} alt="" />
                ) : (
                  <Image src={Images.clinicBuildingIcon} alt="" />
                )}
              </div>
              <div className={styles.create_contant}>
                <span>Create Your</span> Office Account{" "}
                <span className={styles.blueTick_img}>
                  <Image src={Images.blueTick} alt="" />
                </span>
              </div>
            </div>
            <div className={styles.create_para}>
              Welcome to uNext! Begin Your Journey by Creating Your Office
              Account. Unlock a World of Efficient Dental Practice Management
              and Seamless Communication. Let's Get Started
            </div>
            <div className={styles.create_acc_div}>
              <div>
                {isDarkTheme === "dark" ? (
                  <Image src={Images.phone_icon_dark} alt="" />
                ) : (
                  <Image src={Images.phoneIcon} alt="" />
                )}
              </div>
              <div className={styles.create_contant}>
                <span>Select a New Phone Number</span> or Transfer Your Existing
                One
              </div>
            </div>
            <div className={styles.create_para}>
              Choose a New Phone Number or Port Your Existing One. Tailor Your
              Experience for Seamless Connectivity and Enhanced Patient
              Interaction. Let's Establish Your Distinct Presence
            </div>
            <div className={styles.create_acc_div}>
              <div>
                {isDarkTheme === "dark" ? (
                  <Image src={Images.establishicon_dark} alt="" />
                ) : (
                  <Image src={Images.establishicon} alt="" />
                )}
              </div>
              <div className={styles.create_contant}>
                <span>Establish a New E-Fax</span> or Migrate Your Existing
                Service
              </div>
            </div>
            <div className={styles.create_para}>
              Simplify Your Communication: Set Up a New Line or Seamlessly
              Migrate Your Existing Service. Elevate Your Practice with Modern
              Communication Solutions
            </div>
            <div className={styles.continue_btn}>
              <button onClick={() => onNext("not-active")}>
                Continue To Setup Account <Image src={Images.arrow} alt="" />
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

export default ClinicWelcomePopup;
