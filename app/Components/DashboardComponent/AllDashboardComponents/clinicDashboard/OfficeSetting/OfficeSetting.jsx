import React, { useEffect, useState } from "react";
import styles from "../../../DashboardHeader/subContainer.module.scss";
import style from "./officeSetting.module.scss";
import OfficeDetails from "./OfficeDetails/OfficeDetails";
import MobileNumber from "./MobileNumber/MobileNumber";
import EFaxNumber from "./EFaxNumber/EFaxNumber";
import OfficeHours from "./officeHours/OfficeHours";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import SetOfficeHours from "./setOfficeHours/SetOfficeHours";
import DefaultMessages from "./DefaultMessages/DefaultMessages";
import DefaultMessagesPopup from "./DefaultMessages/DefaultMessagesPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const OfficeSetting = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openDefMsg, setOpenDefMsg] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleOpenDefmessage = () => {
    setOpenDefMsg(true);
  };
  const handleCloseDefmessage = () => {
    setOpenDefMsg(false);
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.dashboard_sub_conatiner}>
          {/* <div className={styles.dashSub_blue}>
            <div className={styles.compo_name}>
               <span>Office setting</span> 
            </div>
          </div> */}
          <div className={styles.card_container}>
            <OfficeDetails />
            <div className="my-4">
              <MobileNumber />
            </div>
            <div>
              <EFaxNumber />
            </div>
            <div onClick={() => handleOpenPopup()}>
              <OfficeHours />
            </div>
            {/* <div onClick={() => handleOpenDefmessage()}>
            <DefaultMessages />
          </div> */}
          </div>
        </div>
      </div>

      {/* {openPopup && (
        <RightCustomModal
          isOpen={openPopup}
          onClose={handleClosePopup}
          width="60w"
          shouldCloseOnOutsideClick={true}
        >
          <SetOfficeHours
            setOpenPopup={setOpenPopup}
            handleClosePopup={handleClosePopup}
          />
        </RightCustomModal>
      )} */}
      {/* 
      {openDefMsg && (
        <RightCustomModal
          isOpen={openDefMsg}
          onClose={handleCloseDefmessage}
          width="560w"
          shouldCloseOnOutsideClick={true}
        >
          <DefaultMessagesPopup handleCloseDefmessage={handleCloseDefmessage} />
        </RightCustomModal>
      )} */}
    </>
  );
};

export default OfficeSetting;
