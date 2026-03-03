import React, { useEffect, useState } from "react";
import styles from "./officehours.module.scss";
import { Row, Col } from "react-bootstrap";
import {
  fetchGetClinicListByUser,
  updateOfficeHoursdata,
} from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import HolidaySection from "../HolidaySection/HolidaySection";

const OfficeHours = () => {
  const [officeHours, setOfficeHours] = useState([]); // State to store office hours data
  const [selectedDivs, setSelectedDivs] = useState({}); // State to track selected divs
  const [selectedClinic, setSelectedClinic] = useState(null); // State to store selected clinic
  const [clinicId, setClinicId] = useState();
  const [selectedDivId, setSelectedDivId] = useState(null); // State to store selected div id
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [settingTab, setSettingTab] = useState("office hours");

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const clinicList = useAppSelector(
    (state) => state.clinic.getClinicListData?.clinic_data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfoData?.user?._id !== undefined) {
      dispatch(fetchGetClinicListByUser(userInfoData?.user?._id));
    }
  }, [userInfoData, dispatch]);

  useEffect(() => {
    if (clinicList && clinicList.length > 0) {
      const clinicId = localStorage.getItem("clinicId");
      const foundClinic = clinicList.find((clinic) => clinic._id === clinicId);
      if (foundClinic) {
        setSelectedClinic(foundClinic);
        setOfficeHours(foundClinic.office_hours || []);
      }
    }
  }, [clinicList]);

  const handleTimeChange = (index, timeType, value) => {
    const updatedOfficeHours = officeHours.map((day, idx) => {
      if (idx === index) {
        return {
          ...day,
          [timeType]: value,
        };
      }
      return day;
    });
    setOfficeHours(updatedOfficeHours);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  const handleClick = (divNumber, day) => {
    setSelectedDivs((prevDivs) => ({
      ...prevDivs,
      [divNumber]: !prevDivs[divNumber],
    }));

    // Store the id of the selected div
    setSelectedDivId(`office-hour-${divNumber}`);

    // Also, store the selected day
    setSelectedDay(day);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Filter the officeHours array to get only the selected days
    const selectedOfficeHours = officeHours.filter(
      (day, index) => selectedDivs[index + 1]
    );

    // Construct data object with only selected days
    const data = {
      day: selectedOfficeHours.map((day) => day.day),
      start_time: selectedOfficeHours.map((day) => day.start_time),
      end_time: selectedOfficeHours.map((day) => day.end_time),
    };

    try {
      // Dispatch the updateOfficeHoursdata action with the constructed data
      const actionResult = await dispatch(
        updateOfficeHoursdata({ clinicId, data })
      );
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        // Handle success
      }
    } catch (error) {
      // Handle error
    }
  };

  // Time slots options including both 12-hour and 24-hour formats
  const timeSlots = [
    "12:00 AM",
    "12:30 AM",
    ...Array.from({ length: 11 }, (_, i) => `${i + 1}:00 AM`),
    ...Array.from({ length: 11 }, (_, i) => `${i + 1}:30 AM`),
    "12:00 PM",
    "12:30 PM",
    ...Array.from({ length: 11 }, (_, i) => `${i + 1}:00 PM`),
    ...Array.from({ length: 11 }, (_, i) => `${i + 1}:30 PM`),
  ];

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.OfficeHours_wrapper}>
        <div className={isDarkTheme === "dark" ? "card2 mx-4" : "card2  mx-4"}>
          <div className="card-body">
            <div>
              <div className={styles.office_details_title}>
                <div
                  className={
                    settingTab === "office hours"
                      ? styles.setting_active_tab
                      : styles.setting_office_hours
                  }
                  onClick={() => setSettingTab("office hours")}
                >
                  office hours
                </div>
                <div
                  className={
                    settingTab === "Holidays"
                      ? styles.setting_active_tab
                      : styles.setting_office_hours
                  }
                  onClick={() => setSettingTab("Holidays")}
                >
                  Holidays
                </div>
              </div>
            </div>
          </div>
          {settingTab === "Holidays" ? (
            <HolidaySection isDarkTheme={isDarkTheme} />
          ) : (
            <div className={styles.office_upper_div}>
              <Row>
                {officeHours.map((day, index) => (
                  <div className={styles.office_upper} key={index}>
                    <div
                      id={`office-hour-${index}`}
                      className={`${styles.office_head} ${
                        true ? styles.selected : ""
                      }`}
                      onClick={() => handleClick(index + 1, day.day)}
                      data-day={day.day}
                      data-start-time={day.start_time}
                      data-end-time={day.end_time}
                    >
                      <div className={styles.office_down}>
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          value={day.day || ""}
                        />
                        <span className={styles.office_content}>{day.day}</span>
                      </div>

                      <div className={styles.office_down1}>
                        <select
                          name="start_time"
                          value={day.start_time || ""}
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "start_time",
                              e.target.value
                            )
                          }
                        >
                          <option value={day.start_time}>
                            {day.start_time}
                          </option>

                          {timeSlots.map(
                            (time, timeIndex) =>
                              time !== day.start_time && (
                                <option key={timeIndex} value={time}>
                                  {time}
                                </option>
                              )
                          )}
                        </select>
                        <span className={styles.office_content}>to</span>
                        <select
                          name="end_time"
                          value={day.end_time || ""}
                          onChange={(e) =>
                            handleTimeChange(index, "end_time", e.target.value)
                          }
                        >
                          <option value={day.end_time}>{day.end_time}</option>

                          {timeSlots.map(
                            (time, timeIndex) =>
                              time !== day.end_time && (
                                <option key={timeIndex} value={time}>
                                  {time}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                <div className={styles.office_down1}>
                  <button onClick={handleSave}>Save</button>
                </div>
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeHours;
