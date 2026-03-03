import React, { useEffect, useState } from "react";
import BarChart from "../../clinicDashboard/BarChart";
import DashboardCard from "@/app/Components/common/dashboardCard/DashboardCard";
import styles from "./AdminDashboard.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import LineChart from "../LineChart";
import { useAppSelector } from "@/app/store/lib/hooks";
import Adminbarchart from "../../clinicDashboard/Adminbarchart";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import CalendarRange from "@/app/Components/common/CalendarPopup/CalendarRange";
import { useRef } from "react";
import useOutsideClick from "../OutSideClick/useOutsideClick";
const AdminDashboard = () => {
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);

  const [openweek, setOpenweek] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);
  const [openlogout, setOpenlogout] = useState(false);
  const [openRangeCalender, setOpenRangeCalender] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Past 3 months");
  const [exportVisible, setExportVisible] = useState(true);
  const [startMonth, setStartMonth] = useState({});
  const [endMonth, setEndMonth] = useState({});
  const [year, setYear] = useState(2024);
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();
  const cardList = [
    {
      title: "Total Office",
      card_number: "350, 895",
      percentIncre: "3.48%",
      card_review: "Since Last Month",
      icons: "/assets/images/clinic_icon.png",
    },
    {
      title: "Total Users",
      card_number: "2,356",
      percentIncre: "3.48%",
      card_review: "Since Last Month",
      icons: "/assets/images/super_user.png",
    },
    {
      title: "Today Calls",
      card_number: "985",
      percentIncre: "3.48%",
      card_review: "Since Last Month",
      icons: "/assets/images/admincallicon.png",
    },
    {
      title: "Today massages",
      card_number: "49,65",
      percentIncre: "3.48%",
      card_review: "Since Last Month",
      icons: "/assets/images/super_message.png",
    },
  ];
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const popupRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  useOutsideClick(popupRef, () => {
    if (openCalender) {
      setOpenCalender(false);
    } else if (openRangeCalender) {
      setOpenRangeCalender(false);
    }
  });
  const handleDateRange = (range) => {
    if (range === "Specify Date Range") {
      setSelectedRange(range);
      setOpenRangeCalender(true);
      setExportVisible(false);
      setOpenCalender(false);
    } else {
      setSelectedRange(range);
      setOpenCalender(true);
      setOpenRangeCalender(false);
      setExportVisible(true);

      const checkboxes = document.getElementsByName(range);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    }
  };

  const closePopupHandler = (range) => {
    if (range === "Specify Date Range") {
      setSelectedRange("Past 3 months");
      setOpenCalender(false);
      setOpenRangeCalender(false);
      setExportVisible(true);
    }
  };
  useOutsideClick(popupRef, closePopupHandler);
  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div
          className={styles.dashboard_container}
          style={
            isDarkTheme === "dark"
              ? userInfoData?.user?.role === "Clinic Admin"
                ? {}
                : {}
              : userInfoData?.user?.role === "Clinic Admin"
              ? { background: "#0a22a8" }
              : { background: "#409eee" }
          }
        >
          <div className="pt-3">
            {/* <div className={styles.notice_board}>
            <div>
              <Image src={Images.danger} alt="" />
              Your Office account not create successful please create again{" "}
            </div>
            <Image src={Images.crossIcon} alt="" />
          </div> */}
          </div>
          <div className={styles.dashboard_name}>
            <div className={styles.dashboard_text}>Dashboard</div>
            <div className={styles.dash_btn}>
              {isDarkTheme === "dark" ? (
                <Image
                  src={Images.calendar}
                  onClick={() => {
                    if (userInfoData?.user?.role === "Clinic Admin") {
                      setOpenlogout(!openlogout);
                    } else {
                      setOpenCalender(!openCalender);
                    }
                  }}
                ></Image>
              ) : (
                <Image
                  src={Images.calendar}
                  onClick={() => {
                    if (userInfoData?.user?.role === "Clinic Admin") {
                      setOpenlogout(!openlogout);
                    } else {
                      setOpenCalender(!openCalender);
                    }
                  }}
                ></Image>
              )}
              {openCalender && !openRangeCalender && (
                <div
                  ref={popupRef}
                  className={
                    isDarkTheme === "dark"
                      ? styles.darkHeader2
                      : styles.lightHeader2
                  }
                >
                  <Link href="/user-setting" style={{ textDecoration: "none" }}>
                    <div className={styles.appointment_list_control}>
                      <button onClick={() => handleDateRange("Past 3 months")}>
                        {selectedRange === "Past 3 months" && (
                          <svg
                            width="14"
                            height="11"
                            viewBox="0 0 14 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 1.5L4.75 9.75L1 6"
                              stroke="#409EEE"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        )}
                        Past 3 months
                      </button>
                    </div>
                  </Link>
                  <div className={styles.top_border}></div>
                  <div className={styles.appointment_list_control}>
                    <button onClick={() => handleDateRange("Past 6 months")}>
                      {selectedRange === "Past 6 months" && (
                        <svg
                          width="14"
                          height="11"
                          viewBox="0 0 14 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 1.5L4.75 9.75L1 6"
                            stroke="#409EEE"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                      Past 6 months
                    </button>
                  </div>
                  <div className={styles.top_border}></div>
                  <div className={styles.appointment_list_control}>
                    <button
                      onClick={() => handleDateRange("Specify Date Range")}
                    >
                      {selectedRange === "Specify Date Range" && (
                        <svg
                          width="14"
                          height="11"
                          viewBox="0 0 14 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 1.5L4.75 9.75L1 6"
                            stroke="#409EEE"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                      Specify Date Range
                    </button>
                  </div>
                </div>
              )}
              <p onClick={() => closePopupHandler(selectedRange)}>
                {selectedRange}
              </p>
              {openRangeCalender && (
                <div className={styles.date_range_month} ref={popupRef}>
                  <div className={styles.selected_montth}>
                    <div className={styles.selected_montth_item}>
                      {startMonth?.fullName} {year}
                    </div>
                    <div className={styles.selected_montth_item}>
                      {endMonth?.fullName} {year}
                    </div>
                  </div>
                  <CalendarRange
                    setStartMonth={setStartMonth}
                    startMonth={startMonth}
                    endMonth={endMonth}
                    setEndMonth={setEndMonth}
                    year={year}
                    setYear={setYear}
                    setEndYear={setEndYear}
                    setStartYear={setStartYear}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.dash_card_list}>
            {cardList.map((item, key) => (
              <DashboardCard item={item} key={key} />
            ))}
          </div>
          <div className={styles.left_graph}>
            <div className={styles.graph_one}>
              <div className={isDarkTheme === "dark" ? "card_dark" : "card1"}>
                <LineChart />
              </div>
            </div>
            <div className={styles.graph_two}>
              <div className={isDarkTheme === "dark" ? "card_dark2" : "card1"}>
                <Adminbarchart />
              </div>
            </div>
          </div>
        </div>
        {openweek && (
          <>
            <div
              className={
                isDarkTheme === "dark"
                  ? styles.darkHeader2
                  : styles.lightHeader2
              }
            >
              <div className={styles.appointment_list_control}>Week</div>
              <hr></hr>

              <div className={styles.appointment_list_control}>Month</div>
              <hr></hr>
              <div className={styles.appointment_list_control}>Date Range</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
