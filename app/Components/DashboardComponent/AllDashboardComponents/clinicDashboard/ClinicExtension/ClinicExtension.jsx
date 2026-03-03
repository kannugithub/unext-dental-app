import React, { useEffect, useState } from "react";
import styles from "./clinicExtension.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const ClinicExtension = ({
  changeTab,
  setActiveNestedItem,
  setExtensionSelected,
}) => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleExtension = () => {
    setActiveNestedItem("subscription");
    changeTab("billing/subscription");
    setExtensionSelected(true);
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.clinic_extension_container}>
          <div className={styles.extension_card}>
            <div
              className={
                isDarkTheme === "dark" ? styles.card2 : styles.card_light
              }
            >
              <div className={styles.extension_body}>
                <div className={styles.phy_body_box}>
                  <h1>Physical Extensions</h1>
                  <div className={styles.physical_extension}>
                    <div className={styles.phy_under}>
                      <div className={styles.physical_name}>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Name:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            Daniel Smith
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Presence Status:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            Available
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Extension:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            1000
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Message:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            0/0/1
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Type:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            SIP(WebRTC)
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            IP And Port:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            10.1.10.25.85214
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Sync To Contact:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            Synced
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Extension Info:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            Message
                          </div>
                        </div>
                      </div>
                      <div className={styles.phy_images}>
                        <div>
                          <Image src={Images.editIcon} alt="" />
                        </div>
                        <div>
                          <Image src={Images.restartIcon} alt="" />
                        </div>
                        <div>
                          <Image src={Images.switchOffIcon} alt="" />
                        </div>
                        {/* <div>
                          <Image src={Images.deleteIcon} alt="" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.phy_body_box}>
                  <h1>Remote Extension</h1>
                  <div className={styles.physical_extension}>
                    <div className={styles.phy_under}>
                      <div className={styles.physical_name}>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Name:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            Daniel Smith
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Presence Status:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            Available
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Extension:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            1000
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Message:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            0/0/1
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Type:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            SIP(WebRTC)
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            IP And Port:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            10.1.10.25.85214
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Sync To Contact:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            Synced
                          </div>
                        </div>
                        <div className="row">
                          <div className={`col-6 ${styles.exten_title}`}>
                            Extension Info:
                          </div>
                          <div className={`col-6 ${styles.exten_value}`}>
                            Message
                          </div>
                        </div>
                      </div>
                      <div className={styles.phy_images}>
                        <div>
                          <Image src={Images.editIcon} alt="" />
                        </div>
                        <div>
                          <Image src={Images.restartIcon} alt="" />
                        </div>
                        <div>
                          <Image src={Images.switchOffIcon} alt="" />
                        </div>
                        {/* <div>
                          <Image src={Images.deleteIcon} alt="" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              style={{
                marginBottom: "30px",
                fontSize: "16px",
                fontWeight: "500",
                background: "#409EEE",
                padding: "10px",
                margin: "0px 25px",
                color: "#fff",
              }}
              onClick={handleExtension}
            >
              update Extension
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicExtension;
