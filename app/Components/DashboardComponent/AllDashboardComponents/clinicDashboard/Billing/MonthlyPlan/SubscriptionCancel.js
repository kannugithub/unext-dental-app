import React, { useEffect, useState } from "react";
import styles from "./subcriptioncancel.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useDispatch } from "react-redux";
import {
  activeSubscriptionPlan,
  cancelSubscriptionPlan,
} from "@/app/store/slices/clinicAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const SubscriptionCancel = ({
  closeCancelSubscription,
  clinicId,
  subscriptionType,
}) => {
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleSubscription = async () => {
    const data = {
      clinicId: clinicId,
    };
    if (subscriptionType === "active") {
      try {
        const actionResult = await dispatch(activeSubscriptionPlan(data));
        const { success, message } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
          closeCancelSubscription(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      try {
        const actionResult = await dispatch(cancelSubscriptionPlan(data));
        const { success, message } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
          closeCancelSubscription(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.ChangeNumberPopup_wrapper}>
        {isDarkTheme === "dark" ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => closeCancelSubscription(false)}
          >
            <path
              d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            onClick={() => closeCancelSubscription(false)}
          >
            <path
              d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
              fill="black"
            />
          </svg>
        )}

        <div className={styles.main_wrapper}>
          <div className={styles.phy_extension_amount}>
            <Image src={Images.subscriptiondelete}></Image>
          </div>
          <div className={styles.phy_extension_amount}>
            <p>
              {" "}
              {subscriptionType === "active"
                ? "Active Subscription"
                : "Subscription Cancel"}
            </p>
          </div>
          <div className={styles.phy_extension_amount}>
            <span>
              {" "}
              {subscriptionType === "active"
                ? "Are you sure you want to active this subscription ?"
                : "Are you sure want to cancel this subscription ?"}
            </span>
          </div>
          <div className={styles.Button_wrappr}>
            <div className={styles.cn_btn}>
              {/* <button onClick={handleSubscription}>
                Yes cancel my subscription
              </button> */}
              <button  className={styles.btn1} onClick={handleSubscription}>
                 YES, REQUEST CANCELLATION
              </button>
              <button className={styles.btn2} onClick={() => closeCancelSubscription(false)}>
                KEEP SUBSCRIPTION OF SERVICE
              </button>
            </div>
          </div>
          <div className={styles.cancel_plan_contant}>
            Phone Devices must be sent back within 30 days after cancellation to
            avoid equipment recovery fees. Please mail back to: 500 East McBee
            Ave Suite 100 Greenville, SC 29601 United States
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCancel;
