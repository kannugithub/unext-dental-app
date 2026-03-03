import React, { useEffect, useState } from "react";
import styles from "./Ofiicethankpopup.module.scss";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";

const OfficeThanyouPopup = ({ setOpenThankuPopup }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const addNewOfficeFromSuperAdminData = useSelector(
    (state) => state.admin.addNewOfficeFromSuperAdminData
  );

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
        <div className={styles.confirm_container}>
          <div className={styles.cross_img}>
            <Image src={Images.OfficeThankyou}></Image>
          </div>
          <div className={styles.confirm_hTag}>Thank you</div>
          <div className={styles.confirm_text}>
            {addNewOfficeFromSuperAdminData?.data?.clinic_name} office
            successfully created
          </div>
          <div className={styles.confirm_btns}>
            <button onClick={() => setOpenThankuPopup(false)}>Continue</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficeThanyouPopup;
