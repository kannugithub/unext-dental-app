import React, { useEffect, useState } from "react";
import styles from "./dashboardCrad.module.scss";
import Images, { imageMap } from "../../Images/Images";
import Image from "next/image";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const DashboardCard = ({ item }) => {
  // // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  // const isDarkTheme = localStorage.getItem("theme");
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  return (
    <>
      <div
        className={isDarkTheme === "dark" ? styles.darkHeader : styles.card_box}
      >
        <div className={isDarkTheme === "dark" ? "dark2" : "dark"}>
          <div className={styles.card_body}>
            <div className={styles.card_first_cont}>
              <div className={styles.card_head_body}>
                <div className={styles.total_gross}>{item.title}</div>
                <div className={styles.card_count}>{item.card_number}</div>
              </div>
              <div>
                <Image
                  src={imageMap[item.icons]}
                  alt=""
                  width={44}
                  height={44}
                />
              </div>
            </div>
            <div className={styles.card_lastMonth}>
              <Image src={Images.upArrow} alt="" />
              <div className={styles.percentInc}>{item.percentIncre}</div>
              <div className={styles.since_last}>{item.card_review}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
