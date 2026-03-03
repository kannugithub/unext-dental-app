import React, { useEffect, useState } from "react";
import styles from "./sideBraProgress.module.scss";
import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";

const SideProgressBar = ({ currentStep }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [getClinic, setGetClinic] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const userInfo = useAppSelector((state) => state.authWeb.userInfo);

  const steps = [
    {
      title: "Create Your Office Account",
      isStepActive:
        currentStep === "not-active" ||
        currentStep === "welcome" ||
        currentStep === "create-account" ||
        currentStep === "setup-number",
    },
    {
      title: "Pick A New Number or Port Your Current One",
      isStepActive:
        currentStep === "create-account" || currentStep === "setup-number",
    },
    {
      title: "Setup A New e-Fax or Move Existing One",
      isStepActive: currentStep === "setup-number",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
    }
    const clinic = userInfo?.user?.clinics.find(
      (clinic) => clinic?._id === clinicId
    );
    setGetClinic(clinic);
  }, [userInfo, clinicId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  console.log("getClinic", getClinic);

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.progress_container
        }
      >
        <div className={styles.clinic_setup}>Office Setup</div>
        <div className={styles.progress_with_types}>
          <div className={styles.clinicSetupProgress}>
            <div>
              {steps?.map((item, key) => (
                <div className={styles.progress_contant} key={key}>
                  <div className={styles.progress_line_tab}>
                    <Progress.Line
                      vertical
                      percent={0}
                      showInfo={false}
                      className="custom_progress"
                    />
                    <div
                      className={
                        item.isStepActive
                          ? styles.activeProgressBar
                          : styles.progress_steps
                      }
                    >
                      {key + 1}
                    </div>
                  </div>
                  <div className={styles.progress_title}>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
          {getClinic?.physical_extension_type === null ? (
            ""
          ) : (
            <div className={styles.selected_types_box}>
              <div
                className={
                  getClinic?.physical_extension_type === "type1"
                    ? styles.activetype_box
                    : styles.selected_type
                }
              >
                <Image
                  src={Images.type1_mid}
                  alt="type 2"
                  className={styles.image}
                />
                <div className={styles.types_price}>$30</div>
                {getClinic?.physical_extension_type === "type1" && (
                  <div className={styles.extension_number}>
                    {getClinic?.physical_extension}
                  </div>
                )}
              </div>
              <div
                className={
                  getClinic?.physical_extension_type === "type2"
                    ? styles.activetype_box
                    : styles.selected_type
                }
              >
                <Image
                  src={Images.type2_mid}
                  alt="type 2"
                  className={styles.image}
                />
                <div className={styles.types_price}>$35</div>
                {getClinic?.physical_extension_type === "type2" && (
                  <div className={styles.extension_number}>
                    {getClinic?.physical_extension}
                  </div>
                )}
              </div>
              <div
                className={
                  getClinic?.physical_extension_type === "type3"
                    ? styles.activetype_box
                    : styles.selected_type
                }
              >
                <Image
                  src={Images.type3_mid}
                  alt="type 3"
                  className={styles.image}
                />
                <div className={styles.types_price}>$40</div>
                {getClinic?.physical_extension_type === "type3" && (
                  <div className={styles.extension_number}>
                    {getClinic?.physical_extension}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideProgressBar;
