import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./calltabpopup.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import Link from "next/link";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import LinkTab from "./LinkTab/LinkTab";
import EmailTab from "./EmailTab/EmailTab";
import SmsTab from "./SmsTab/SmsTab";
import Payatoffice from "./Payatoffice/Payatoffice";
import { SendrequestPaymentLink } from "@/app/store/slices/clinicAdminSlices";
import QRcodeTab from "./QRcodeTab/QRcodeTab";
import { toast } from "react-toastify";

const CallTabpopup = ({
  setCallAlert,
  link,
  patient_number,
  amount,
  email,
  patientId,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const dispatch = useDispatch();
  const [clinicId, setClinicId] = useState();

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

  const handleTabClick = async (tabIndex) => {
    setCurrentTab(tabIndex);
    if (tabIndex === 3) {
      const data = {
        patient_number: patient_number,
        amount: amount || 0,
        clinicId: clinicId,
        qrcode: true,
      };

      try {
        const actionResult = await dispatch(SendrequestPaymentLink(data)); // Dispatch the action
        const { success, message } = actionResult.payload;
        if (success) {
          // toast.success(message);
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.assisted_wrapper}>
        <div className={styles.head1}>
          <h4>Request Payment</h4>
          <h6>Use any of the option below to share your link</h6>
        </div>
        <div className={styles.slide_div}>
          <div className="col-md-2">
            <div
              className={currentTab === 0 ? styles.slide1 : styles.slide2}
              onClick={() => handleTabClick(0)}
            >
              Link
            </div>
          </div>
          <div className="col-md-2">
            <div
              className={currentTab === 1 ? styles.slide1 : styles.slide2}
              onClick={() => handleTabClick(1)}
            >
              Email
            </div>
          </div>
          <div className="col-md-2">
            <div
              className={currentTab === 2 ? styles.slide1 : styles.slide2}
              onClick={() => handleTabClick(2)}
            >
              SMS
            </div>
          </div>
          <div className="col-md-3">
            <div
              className={currentTab === 3 ? styles.slide1 : styles.slide2}
              onClick={() => handleTabClick(3)}
            >
              QR Code
            </div>
          </div>
          <div className="col-md-3">
            <div
              className={currentTab === 4 ? styles.slide1 : styles.slide2}
              onClick={() => handleTabClick(4)}
            >
              Pay at office
            </div>
          </div>
        </div>

        {currentTab === 0 && (
          <LinkTab link={link} setCallAlert={setCallAlert} />
        )}
        {currentTab === 1 && (
          <EmailTab
            patient_number={patient_number}
            amount={amount}
            email={email}
            setCallAlert={setCallAlert}
          />
        )}
        {currentTab === 2 && (
          <SmsTab
            setCallAlert={setCallAlert}
            patient_number={patient_number}
            link={link}
          />
        )}
        {currentTab === 3 && (
          <QRcodeTab link={link} setCallAlert={setCallAlert} />
        )}
        {currentTab === 4 && (
          <Payatoffice
            patientId={patientId}
            amount={amount}
            setCallAlert={setCallAlert}
          />
        )}
      </div>
    </div>
  );
};

export default CallTabpopup;
