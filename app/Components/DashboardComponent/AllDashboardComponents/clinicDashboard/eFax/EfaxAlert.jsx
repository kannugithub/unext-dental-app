import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./efaxalert.module.scss";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import {
  SendrequestPaymentLink,
  forwardByMail,
} from "@/app/store/slices/clinicAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";

const EfaxAlert = ({ setCallAlert, recordingfile }) => {
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [clinicID, setClinicId] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);
  console.log(clinicID, "clinicID");
  const Sendemail = async (files) => {
    const data = {
      file: recordingfile,
    };

    try {
      const actionResult = await dispatch(forwardByMail({ data, clinicID }));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error);
    }
    setCallAlert(true);
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.popupContainer}>
        <div className={`${styles.alert} ${styles.slideIn}`}>
          <Alert
            variant="danger"
            onClose={() => setCallAlert(false)}
            dismissible={false}
            className={styles.alert}
          >
            <div className={styles.img_text_bar}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M49.543 70.3023C49.1036 70.302 48.6731 70.1782 48.3007 69.9451C47.9283 69.7119 47.6289 69.3787 47.4367 68.9836L36.4211 46.3383L13.7758 35.3242C13.3679 35.1254 13.0264 34.8124 12.793 34.4232C12.5595 34.0341 12.444 33.5855 12.4605 33.132C12.4771 32.6785 12.6249 32.2395 12.8862 31.8684C13.1474 31.4973 13.5107 31.21 13.932 31.0414L72.043 7.66799C72.4694 7.49612 72.9369 7.45345 73.3874 7.54529C73.8379 7.63714 74.2514 7.85943 74.5765 8.18452C74.9015 8.5096 75.1238 8.92311 75.2157 9.37358C75.3075 9.82405 75.2649 10.2916 75.093 10.718L51.718 68.8336C51.5485 69.2546 51.2605 69.6173 50.8888 69.8778C50.5171 70.1382 50.0778 70.2852 49.6242 70.3007L49.543 70.3023ZM20.5774 33.4273L39.1992 42.4898C39.6712 42.7193 40.0525 43.1006 40.2821 43.5726L49.3445 62.1945L68.6867 14.0617L20.5774 33.4273Z"
                  fill="#409EEE"
                />
                <path
                  d="M38.1733 46.9299C37.7098 46.9298 37.2566 46.7922 36.8712 46.5346C36.4859 46.2769 36.1855 45.9108 36.0082 45.4825C35.831 45.0541 35.7847 44.5828 35.8752 44.1282C35.9658 43.6736 36.1892 43.256 36.5171 42.9283L71.2593 8.18614C71.477 7.96853 71.7354 7.79594 72.0198 7.67821C72.3042 7.56048 72.609 7.49993 72.9168 7.5C73.2246 7.50007 73.5294 7.56077 73.8138 7.67863C74.0981 7.7965 74.3565 7.96921 74.5741 8.18692C74.7917 8.40462 74.9643 8.66306 75.082 8.94747C75.1997 9.23188 75.2603 9.53669 75.2602 9.8445C75.2602 10.1523 75.1995 10.4571 75.0816 10.7414C74.9637 11.0258 74.791 11.2842 74.5733 11.5018L39.8311 46.2502C39.3904 46.6874 38.7941 46.9318 38.1733 46.9299Z"
                  fill="#409EEE"
                />
              </svg>
              <div className={styles.alert_text}>
                <p>Are you sure you ? </p>
                <span>Want to send fax in email</span>
              </div>
            </div>
            <div className={styles.top_separator}></div>

            <div className={styles.right_corner}>
              <Button onClick={Sendemail} className={styles.cancelButton}>
                Okay
              </Button>
              <Button
                onClick={() => setCallAlert(false)}
                className={styles.deleteButton}
              >
                Cancel
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default EfaxAlert;
