import Image from "next/image";
import React, { useEffect, useState } from "react";
import blueTick from "../../../../assets/icons/blueTick.svg";
import styles from "./subscriptionPlans.module.scss";
import Images from "@/app/Components/Images/Images";
import { useSelector } from "react-redux";

const SubscriptionPlans = ({ setShowFullPlanPopup, showPlanType }) => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);

  const plans = [
    {
      name: "uNext Started",
      price: "35.00",
      benefits: [
        "UNLIMITED CALLING TO LOCAL & TOLL NUMBERS",
        "ENCRYPTED TEXT MESSAGING (SMS + MMS)",
        "SINGLE, INTEGRATED PLATFORM ACCESS",
        "HIPAA COMPLIANT e-FAX",
        "LIVE REVIEWS MANAGEMENT",
        "ENHANCED PATIENT COMMUNICATION (TEXT, PHONE, EMAIL)",
        "APPOINTMENT REMINDERS",
        "IMPROVED PATIENT RETENTION",
        "BASIC REPORTING AND ANALYTICS",
        "CUSTOMIZABLE PATIENT PROFILES",
        "CALENDAR INTEGRATION",
        "SECURE DATA STORAGE (UP TO 1 YEAR)",
        "CALL LOGS (UP TO 5 YEAR)",
        "CALL RECORDINGS (UP TO 5 YEARS)",
        "HIPAA COMPLIANCE FOR PATIENT DATA",
        "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
        "CALENDAR INTEGRATION",
        "SECURE DATA STORAGE (UP TO 1 YEAR)",
        "CALL LOGS (UP TO 5 YEAR)",
        "CALL RECORDINGS (UP TO 5 YEARS)",
        "HIPAA COMPLIANCE FOR PATIENT DATA",
        "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
        "MOBILE APP (iPHONE & ANDROID)",
      ],
    },
    {
      name: "uNext Pro",
      price: "45.00",
      benefits: [
        "UNLIMITED CALLING TO LOCAL & TOLL NUMBERS",
        "ENCRYPTED TEXT MESSAGING (SMS + MMS)",
        "SINGLE, INTEGRATED PLATFORM ACCESS",
        "HIPAA COMPLIANT e-FAX",
        "LIVE REVIEWS MANAGEMENT",
        "ENHANCED PATIENT COMMUNICATION (TEXT, PHONE, EMAIL)",
        "APPOINTMENT REMINDERS",
        "IMPROVED PATIENT RETENTION",
        "BASIC REPORTING AND ANALYTICS",
        "CUSTOMIZABLE PATIENT PROFILES",
        "CALENDAR INTEGRATION",
        "SECURE DATA STORAGE (UP TO 1 YEAR)",
        "CALL LOGS (UP TO 5 YEAR)",
        "CALL RECORDINGS (UP TO 5 YEARS)",
        "HIPAA COMPLIANCE FOR PATIENT DATA",
        "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
        "CALENDAR INTEGRATION",
        "SECURE DATA STORAGE (UP TO 1 YEAR)",
        "CALL LOGS (UP TO 5 YEAR)",
        "CALL RECORDINGS (UP TO 5 YEARS)",
        "HIPAA COMPLIANCE FOR PATIENT DATA",
        "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
        "MOBILE APP (iPHONE & ANDROID)",
        "INCREASED REVIEW AMPLIFICATION",
        "TEAM COLLABORATION ENHANCEMENT",
        "FAMILY-LIKE TEAM ATMOSPHERE",
        "GROUP CREATION FOR TEAM COMMUNICATION",
        "ENHANCED COMMUNICATION EFFICIENCY",
        "24/7 PRIORITY CUSTOMER SUPPORT (CHAT / EMAIL / PHONE)",
        "MULTI-USER ACCESS (FOR DENTAL TEAM MEMBERS)",
        "TWO-FACTOR AUTHENTICATION FOR ADDED SECURITY",
        "INCLUDES PHONES AND EQUIPMENT",
        "CUSTOM MUSIC ON HOLD",
        "MULTI-LOCATION SUPPORT",
      ],
    },
  ];

  useEffect(() => {
    const storedSelectedPlan = localStorage.getItem("selectedPlan");
    const planDetails = plans.find((plan) => plan.name === showPlanType);
    if (planDetails) {
      setSelectedPlanDetails(planDetails);
    } else {
      console.error(`No plan found with the name "${showPlanType}"`);
    }
  }, []);

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.subs_box}>
          <div className={styles.unext_started}>
            {selectedPlanDetails?.name}
          </div>
          <div className={styles.imges_cross}>
            {isDarkTheme ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setShowFullPlanPopup(false)}
              >
                <path
                  d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
                  fill="white"
                />
              </svg>
            ) : (
              <Image
                src={Images?.blackCrossIcon}
                alt=""
                onClick={() => setShowFullPlanPopup(false)}
              />
            )}
          </div>
          <div>
            {selectedPlanDetails?.benefits?.map((benefit, index) => (
              <div className={styles.popups_data} key={index}>
                <div className="col-md-10">{benefit}</div>
                <div className="col-md-1">
                  <div className={styles.blue_tick_imges}>
                    <Image src={blueTick} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlans;

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import blueTick from "../../../../assets/icons/blueTick.svg";
// import styles from "./subscriptionPlans.module.scss";
// import Images from "@/app/Components/Images/Images";
// import { useSelector } from "react-redux";

// const SubscriptionPlans = ({
//   setShowFullPlanPopup,
//   selectedPlan,
//   showPlanType,
// }) => {
//   const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

//   const plans = [
//     {
//       name: "uNext Started",
//       price: "35.00",
//       benefits: [
//         "UNLIMITED CALLING TO LOCAL & TOLL NUMBERS",
//         "ENCRYPTED TEXT MESSAGING (SMS + MMS)",
//         "SINGLE, INTEGRATED PLATFORM ACCESS",
//         "HIPAA COMPLIANT e-FAX",
//         "LIVE REVIEWS MANAGEMENT",
//         "ENHANCED PATIENT COMMUNICATION (TEXT, PHONE, EMAIL)",
//         "APPOINTMENT REMINDERS",
//         "IMPROVED PATIENT RETENTION",
//         "BASIC REPORTING AND ANALYTICS",
//         "CUSTOMIZABLE PATIENT PROFILES",
//         "CALENDAR INTEGRATION",
//         "SECURE DATA STORAGE (UP TO 1 YEAR)",
//         "CALL LOGS (UP TO 5 YEAR)",
//         "CALL RECORDINGS (UP TO 5 YEARS)",
//         "HIPAA COMPLIANCE FOR PATIENT DATA",
//         "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
//         "CALENDAR INTEGRATION",
//         "SECURE DATA STORAGE (UP TO 1 YEAR) ",
//         "CALL LOGS (UP TO 5 YEAR) ",
//         "CALL RECORDINGS (UP TO 5 YEARS)",
//         "HIPAA COMPLIANCE FOR PATIENT DATA",
//         "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
//         "MOBILE APP (iPHONE & ANDROID) ",
//       ],
//     },
//     {
//       name: "uNext Pro",
//       price: "45.00",
//       benefits: [
//         "UNLIMITED CALLING TO LOCAL & TOLL NUMBERS",
//         "ENCRYPTED TEXT MESSAGING (SMS + MMS)",
//         "SINGLE, INTEGRATED PLATFORM ACCESS",
//         "HIPAA COMPLIANT e-FAX",
//         "LIVE REVIEWS MANAGEMENT",
//         "ENHANCED PATIENT COMMUNICATION (TEXT, PHONE, EMAIL)",
//         "APPOINTMENT REMINDERS",
//         "IMPROVED PATIENT RETENTION",
//         "BASIC REPORTING AND ANALYTICS",
//         "CUSTOMIZABLE PATIENT PROFILES",
//         "CALENDAR INTEGRATION",
//         "SECURE DATA STORAGE (UP TO 1 YEAR)",
//         "CALL LOGS (UP TO 5 YEAR)",
//         "CALL RECORDINGS (UP TO 5 YEARS)",
//         "HIPAA COMPLIANCE FOR PATIENT DATA",
//         "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
//         "CALENDAR INTEGRATION",
//         "SECURE DATA STORAGE (UP TO 1 YEAR) ",
//         "CALL LOGS (UP TO 5 YEAR) ",
//         "CALL RECORDINGS (UP TO 5 YEARS)",
//         "HIPAA COMPLIANCE FOR PATIENT DATA",
//         "CUSTOMER SUPPORT (7AM - 6PM | CHAT / EMAIL)",
//         "MOBILE APP (iPHONE & ANDROID)",
//         "INCREASED REVIEW AMPLIFICATION",
//         "TEAM COLLABORATION ENHANCEMENT",
//         "FAMILY-LIKE TEAM ATMOSPHERE",
//         "GROUP CREATION FOR TEAM COMMUNICATION",
//         "ENHANCED COMMUNICATION EFFICIENCY",
//         "24/7 PRIORITY CUSTOMER SUPPORT (CHAT / EMAIL / PHONE)",
//         "MULTI-USER ACCESS (FOR DENTAL TEAM MEMBERS)",
//         "TWO-FACTOR AUTHENTICATION FOR ADDED SECURITY",
//         "INCLUDES PHONES AND EQUIPMENT",
//         "CUSTOM MUSIC ON HOLD",
//         "MULTI-LOCATION SUPPORT",
//       ],
//     },
//   ];

//   const selectedPlanDetails = plans.find((plan) => plan.name === showPlanType);

//   console.log(selectedPlanDetails, "selectedPlanDetails");

//   selectedPlanDetails.benefits = [...new Set(selectedPlanDetails?.benefits)];

//   return (
//     <>
//       <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
//         <div className={styles.subs_box}>
//           <div className={styles.unext_started}>{showPlanType}</div>
//           <div className={styles.imges_cross}>
//             {isDarkTheme ? (
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 onClick={() => setShowFullPlanPopup(false)}
//               >
//                 <path
//                   d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
//                   fill="white"
//                 />
//               </svg>
//             ) : (
//               <Image
//                 src={Images?.blackCrossIcon}
//                 alt=""
//                 onClick={() => setShowFullPlanPopup(false)}
//               />
//             )}
//           </div>
//           <div>
//             {selectedPlanDetails.benefits.map((benefit, index) => (
//               <div className={styles.popups_data} key={index}>
//                 <div className="col-md-10">{benefit}</div>
//                 <div className="col-md-1">
//                   <div className={styles.blue_tick_imges}>
//                     <Image src={blueTick} alt="" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SubscriptionPlans;
