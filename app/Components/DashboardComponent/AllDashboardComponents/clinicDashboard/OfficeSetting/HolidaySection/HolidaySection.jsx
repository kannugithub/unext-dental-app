import React, { useEffect, useState } from "react";
import styles from "./holidaySection.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHolidaysList,
  sendCustomizeHoliday,
} from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";

const HolidaySection = ({ isDarkTheme }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const fetchHolidaysListData = useAppSelector(
    (state) => state.clinic.fetchHolidaysListData
  );
  const clinicId = useSelector((state) => state.clinic.clinicId);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    dispatch(fetchHolidaysList());
  }, []);

  const handleCustomize = async () => {
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }

    if (isToggled && (!startTime || !endTime)) {
      toast.error("Please select both start time and end time.");
      return;
    }

    const data = {
      date: selectedDate,
      clinicId: clinicId,
      userId: userInfoData?.user?._id,
      ...(isToggled && { start_time: startTime, end_time: endTime }),
    };

    try {
      const actionResult = await dispatch(sendCustomizeHoliday(data));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
        setSelectedDate("");
        setStartTime("");
        setEndTime("");
        setIsToggled(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.select_holiday_section}>
          <div className={styles.select_date}>Select Date</div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className={styles.holidays_heading}>
          <div>Holidays/Off Day</div>
          <div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={isToggled}
                onChange={handleToggle}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        {isToggled && (
          <div className={styles.select_holiday_time}>
            <div className={styles.select_time_box}>
              <div className={styles.select_date}>Start Time</div>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="start time"
              />
            </div>
            <div className={styles.select_time_box}>
              <div className={styles.select_date}>End Time</div>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="end time"
              />
            </div>
          </div>
        )}
        <div className={styles.save_buttons}>
          <button onClick={handleCustomize}>Save</button>
        </div>
        <div className={styles.all_Holidays_box}>
          <div className={styles.select_holiday_tag}>Select Holiday</div>
          <div className={styles.all_holiday}>
            {fetchHolidaysListData?.data &&
              Object.entries(fetchHolidaysListData.data).map(
                ([holiday, isChecked], index) => (
                  <div className={styles.holidays_days} key={index}>
                    <input type="checkbox" id={holiday} checked={isChecked} />
                    <label htmlFor={holiday}>
                      {holiday.replace(/_/g, " ").toLowerCase()}
                    </label>
                  </div>
                )
              )}
          </div>
          <div className={styles.save_holiday_buttons}>
            <button>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HolidaySection;
