import React from "react";
import styles from "./homecard.module.scss";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const HomeCard = ({ svg, head, para }) => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  return (
    <>
      <div className={isDarkTheme ? styles.card_wrapper2 : styles.card_wrapper}>
        <div className={styles.svg_main_div}>
          <div className={styles.svg_big_div}>
            <div className={styles.svg_small_div}>{svg}</div>
          </div>
        </div>

        <h2>{head}</h2>
        <p>{para}</p>
      </div>
    </>
  );
};

export default HomeCard;
