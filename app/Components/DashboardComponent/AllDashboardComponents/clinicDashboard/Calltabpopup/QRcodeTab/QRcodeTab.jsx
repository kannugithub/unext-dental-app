import React, { useEffect, useState } from "react";
import styles from "./qrcodetab.module.scss";
import { useSelector } from "react-redux";
import Image from "next/image";

const QRcodeTab = ({ setCallAlert, link }) => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (link && link.startsWith("blob")) {
      blobToImage(link)
        .then((img) => setImageSrc(img.src))
        .catch((error) => console.error(error));
    } else {
      setImageSrc(link);
    }
  }, [link]);

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.addOffice_container}>
          <div className={styles.add_new_dental_box}>
            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                {/* Ensure imageSrc is not null before rendering */}
                {imageSrc && <img src={imageSrc} alt="QR Code" />}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div className={styles.add_new_dental_btn}>
                <button onClick={() => setCallAlert(false)}> Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRcodeTab;
