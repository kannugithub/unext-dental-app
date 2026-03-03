import React, { useEffect, useState } from "react";
import styles from "./clinicSetupInto.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import DentalPracticeFaq from "./FaqComponent/DentalPracticeFaq";
import { useSelector } from "react-redux";

const ClinicSetupInto = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  return (
    <>
      <div className={styles.clinic_setup_video_box}>
        <div
          className={
            isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
          }
        >
          <div className={styles.setup_video_box}>
            <div className={styles.setup_intro_box}>
              <Image src={Images?.setup_intro} alt="" />
            </div>
            <div className={styles.clinic_setp}>Setup Video Tutorial</div>
            <div className={styles.faq_txt}>FAQ's</div>
          </div>
          <div className={styles.faqs_box}>
            <DentalPracticeFaq />
            {/* </fgtdfg> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicSetupInto;
