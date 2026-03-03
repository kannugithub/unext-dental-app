import React, { useState } from "react";
import styles from "./CustomCalendar.module.scss";

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDay = (startOfMonth.getDay() + 6) % 7;
  const daysInMonth = endOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  const renderDays = () => {
    const days = [];

    // Previous month's days
    const prevMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className={`${styles.calendar_day} ${styles.inactive}`}
        >
          {prevMonthEnd - i}
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`${styles.calendar_day} ${
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear()
              ? styles.selected
              : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    // Next month's days
    const nextMonthDays = 42 - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className={`${styles.calendar_day} ${styles.inactive}`}
          style={{ color: "#5a5a5a" }}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header}>
        <div className={styles.calendar_header_label}>
          {currentDate.toLocaleString("default", { month: "short" })},{" "}
          {currentDate.getFullYear()}
        </div>
        <div className={styles.arrow}>
          <button onClick={handlePrevMonth}>&lt;</button>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
      </div>
      <div className={styles.calendar_body}>
        <div className={styles.calendar_weekdays}>
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} className={styles.calendar_weekday}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.calendar_days}>{renderDays()}</div>
      </div>
    </div>
  );
};

export default CustomCalendar;
