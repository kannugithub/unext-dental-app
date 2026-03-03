"use client";
import React, { useState } from "react";
import styles from "./subscriptionPlan.module.scss";
import Image from "next/image";
import Images from "../../Images/Images";
import Link from "next/link";
import subsSentIcon from "../../../assets/icons/subsSend.svg";
import unextPro from "../../../assets/icons/unextPro.svg";
import subsSentIconPlan from "../../../assets/icons/subsProplanPlan.svg";
import blueTick from "../../../assets/icons/blueTick.svg";
import dropDwn from "../../../assets/icons/caret-down-filled.svg";
import dropUp from "../../../assets/icons/dropup_arrow.svg";
import { useEffect } from "react";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const SubscriptionPlan = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [show, setShow] = useState(false);
  const [tokenid, setTokenid] = useState("");

  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTokenid(localStorage.getItem("token"));
    }
  }, [tokenid]);

  const benifit_static_name = [
    {
      benefits_name: "UNLIMITED CALLING TO LOCAL & TOLL NUMBERS",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "ENCRYPTED TEXT MESSAGING (SMS + MMS)",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "SINGLE, INTEGRATED PLATFORM ACCESS",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "HIPAA COMPLIANT e-FAX",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "LIVE REVIEWS MANAGEMENT",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "APPOINTMENT REMINDERS",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "IMPROVED PATIENT RETENTION",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "BASIC REPORTING AND ANALYTICS",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CUSTOMIZABLE PATIENT PROFILES",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CALENDAR INTEGRATION",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "SECURE DATA STORAGE (UP TO 1 YEAR)",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CALL LOGS (UP TO 5 YEAR)",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CALL RECORDINGS (UP TO 5 YEARS)",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "HIPAA COMPLIANCE FOR PATIENT DATA",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CALENDAR INTEGRATION",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "SECURE DATA STORAGE (UP TO 1 YEAR) ",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CALL LOGS (UP TO 5 YEAR) ",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CALL RECORDINGS (UP TO 5 YEARS)",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "HIPAA COMPLIANCE FOR PATIENT DATA",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "MOBILE APP (iPHONE & ANDROID)",
      basic_plan: true,
      pro_plan: true,
    },
    {
      benefits_name: "INCREASED REVIEW AMPLIFICATION",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "TEAM COLLABORATION ENHANCEMENT",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "FAMILY-LIKE TEAM ATMOSPHERE",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "GROUP CREATION FOR TEAM COMMUNICATION",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "ENHANCED COMMUNICATION EFFICIENCY",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "24/7 PRIORITY CUSTOMER SUPPORT (CHAT / EMAIL / PHONE)",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "MULTI-USER ACCESS (FOR DENTAL TEAM MEMBERS)",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "TWO-FACTOR AUTHENTICATION FOR ADDED SECURITY",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "INCLUDES PHONES AND EQUIPMENT",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "CUSTOM MUSIC ON HOLD",
      basic_plan: false,
      pro_plan: true,
    },
    {
      benefits_name: "MULTI-LOCATION SUPPORT",
      basic_plan: false,
      pro_plan: true,
    },
  ];

  const handleSubscriptionPlan = (planName) => {
    setActivePlan(planName);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPlan", planName);
    }
  };

  const handleViewToggle = () => {
    setShow(!show);
  };
  const uniqueBenefits = new Set();
  const filteredBenefits = benifit_static_name.filter((item) => {
    if (uniqueBenefits.has(item.benefits_name)) {
      return false;
    } else {
      uniqueBenefits.add(item.benefits_name);
      return true;
    }
  });

  const displayedBenefits = show
    ? filteredBenefits
    : filteredBenefits.slice(0, 8);

  return (
    <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
      <div className={styles.subscription_plan} id="subscribeSection">
        <div className={styles.table_wrap}>
          <table id="planing">
            <tr className="head_row">
              <th>
                {" "}
                <span className={styles.main_header_wrapper}>
                  <span className={styles.tableHeader_wrapper}>
                    <span className={styles.subs_head}>Subscription Plan</span>{" "}
                    <br />
                    <span className={styles.payMonthly}>
                      Pay monthly. start making your next great business
                    </span>
                  </span>
                </span>
              </th>
              <th>
                <span
                  className={styles.plean_Wrapper}
                  onClick={() => {
                    localStorage.setItem("selectedPlan", "uNext Started");
                  }}
                >
                  {isDarkTheme ? (
                    <Image src={Images.subscription_dark1} alt="" />
                  ) : (
                    <Image src={subsSentIcon} alt="" />
                  )}
                  <span>uNext Started</span>
                  <p>$35/Month</p>
                  <Link href={tokenid ? "#" : "/signup"}>
                    <button disabled={tokenid}>Get Started</button>
                  </Link>
                </span>
              </th>
              <th>
                <span
                  className={styles.plean_Wrapper}
                  onClick={() => {
                    localStorage.setItem("selectedPlan", "uNext Pro");
                  }}
                >
                  {isDarkTheme ? (
                    <Image src={Images.subscription_dark2} alt="" />
                  ) : (
                    <Image src={unextPro} alt="" />
                  )}

                  <span>uNext Pro</span>
                  <p>$45/Month</p>
                  <Link href={tokenid ? "#" : "/signup"}>
                    <button disabled={tokenid}>Get Started</button>
                  </Link>
                </span>
              </th>
            </tr>
            {displayedBenefits.map((item) => (
              <tr key={item.benefits_name} className="plan_details">
                <th className={styles.jadoo}>{item.benefits_name}</th>
                <td>
                  {item.basic_plan ? (
                    isDarkTheme ? (
                      <Image src={Images.subscription_done} alt="" />
                    ) : (
                      <Image src={blueTick} alt="" />
                    )
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {item.pro_plan ? ( // Check for pro_plan here
                    isDarkTheme ? (
                      <Image src={Images.subscription_done} alt="" />
                    ) : (
                      <Image src={blueTick} alt="" />
                    )
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className={styles.viewmore}>
          <button onClick={handleViewToggle}>
            {show ? (
              <span>
                {" "}
                View Less <Image src={dropUp} alt="" />{" "}
              </span>
            ) : (
              <span>
                {" "}
                View More <Image src={dropDwn} alt="" />{" "}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
