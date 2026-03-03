import React, { useState, useEffect } from "react";
import styles from "./calendarRange.module.scss";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";

const CalendarRange = ({
  setStartMonth,
  startMonth,
  endMonth,
  setEndMonth,
  year,
  setYear,
  setStartYear,
  setEndYear,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const monthArray = [
    { number: 1, fullName: "January", shortName: "Jan" },
    { number: 2, fullName: "February", shortName: "Feb" },
    { number: 3, fullName: "March", shortName: "Mar" },
    { number: 4, fullName: "April", shortName: "Apr" },
    { number: 5, fullName: "May", shortName: "May" },
    { number: 6, fullName: "June", shortName: "Jun" },
    { number: 7, fullName: "July", shortName: "Jul" },
    { number: 8, fullName: "August", shortName: "Aug" },
    { number: 9, fullName: "September", shortName: "Sep" },
    { number: 10, fullName: "October", shortName: "Oct" },
    { number: 11, fullName: "November", shortName: "Nov" },
    { number: 12, fullName: "December", shortName: "Dec" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleSelectMonth = (month) => {
    if (!startMonth?.fullName) {
      setStartMonth(month);
      setStartYear(year);
    } else {
      if (!endMonth?.fullName) {
        setEndMonth(month);
        setEndYear(year);
      } else {
        setStartMonth(month);
        setStartYear(year);
        setEndMonth("");
      }
    }
  };

  const isMonthSelected = (month) => {
    return (
      startMonth?.fullName === month?.fullName ||
      endMonth?.fullName === month?.fullName
    );
  };

  const todayDate = new Date();

  const handleYearChange = (direction) => {
    resetCalendarUI();
    if (direction === "up") {
      if (todayDate.getFullYear() > year) {
        setYear(year + 1);
      }
    } else {
      setYear(year - 1);
    }
  };
  const resetCalendarUI = () => {
    setStartMonth({});
    setEndMonth({});
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div
        className={`${styles["background_theme"]} card text-center`}
        style={{ width: "250px", paddingTop: "20px" }}
      >
        <div className={styles.calendar_box}>
          <div className={styles.year_icon}>
            <div className={styles.year_box}>{year}</div>
            <div className={styles.arrow_icon}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleYearChange("down")}
              >
                <path
                  d="M6.30005 11.3204L2.05035 7.0707L1.06055 8.0605L7.00005 14L7.49495 13.5051L12.9395 8.0605L11.9497 7.0707L7.70005 11.3204V0H6.30005V11.3204Z"
                  fill={isDarkTheme === "dark" ? "white" : "black"}
                />
              </svg>

              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleYearChange("up")}
              >
                <path
                  d="M6.30005 2.6796L2.05035 6.9293L1.06055 5.9395L7.00005 0L7.49495 0.4949L12.9395 5.9395L11.9497 6.9293L7.70005 2.6796V14H6.30005V2.6796Z"
                  fill={
                    isDarkTheme === "dark"
                      ? todayDate.getFullYear() > year
                        ? "white"
                        : "gray"
                      : todayDate.getFullYear() > year
                      ? "black"
                      : "gray"
                  }
                />
              </svg>
            </div>
          </div>
          <div className={styles.month_content}>
            <div className={styles.first_row}>
              {monthArray?.map((month, index) => (
                <span
                  key={index}
                  className={isMonthSelected(month) ? styles.selected : ""}
                  onClick={() => handleSelectMonth(month)}
                >
                  {month?.shortName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarRange;
