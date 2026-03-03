"use client";
import React, { useEffect, useState } from "react";
import "./RequestDemo.scss";
import moment from "moment";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { validateInput } from "../../common/ValidateInput/validateInput";
import {
  requestDemoTimeSlot,
  sendRequestDemo,
} from "@/app/store/slices/authSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";

const TimeSlot = ({ time, isSelected, onClick }) => {
  const isDarkTheme = useAppSelector((state) => state.darkTheme.isDarkTheme);
  return (
    <div
      className={
        isDarkTheme
          ? ` text-base px-2 py-1 rounded-sm mt-2 cursor-pointer time_slots ${
              isSelected ? "active_time_slot" : ""
            }`
          : ` border border-slate-500 text-base px-2 py-1 rounded-sm mt-2 cursor-pointer  time_slots${
              isSelected ? "active_time_slot" : ""
            }`
      }
      onClick={onClick}
    >
      {time}
    </div>
  );
};

// In your DayColumn component
const DayColumn = ({ day, date, timeslots, selectedSlot, handleTime }) => {
  const isDarkTheme = useAppSelector((state) => state.darkTheme.isDarkTheme);
  const dateObj = new Date(date);
  const dayOfMonth = dateObj.getDate();
  return (
    <div
      className={
        isDarkTheme
          ? "text-center py-4 px-3 w-full day_column"
          : "border border-slate-500 text-center py-4 px-3 w-full day_column"
      }
    >
      <div className="request_day font-light uppercase">{day}</div>
      <div className="request_date pt-1">{dayOfMonth}</div>
      {timeslots.map(({ time }) => (
        <TimeSlot
          key={time}
          time={time}
          isSelected={selectedSlot.day === day && selectedSlot.time === time}
          onClick={() => handleTime(day, time, date)}
        />
      ))}
    </div>
  );
};

const RequestDemo = ({ onCloseModal, email }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedSlot, setSelectedSlot] = useState({ day: null, time: null });
  const getRequestDemoTimeSlotsList = useAppSelector(
    (state) => state.authWeb.getRequestDemoTimeSlots
  );
  const isDarkTheme = useAppSelector((state) => state.darkTheme.isDarkTheme);
  const [selectedTimes, setSelectedTimes] = useState({});

  const handleTime = (day, time, date) => {
    setSelectedSlot({ day, time, date });
    // Reset the date error when a valid selection is made
    setErrors((prevErrors) => ({
      ...prevErrors,
      date: null,
    }));
  };
  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const groupByDay = (timeslots) => {
    return timeslots?.reduce((acc, timeslot) => {
      const { day, time, date, isBooked } = timeslot;
      if (!acc[day]) {
        acc[day] = {
          date,
          timeslots: [],
        };
      }
      acc[day].timeslots.push({ time, isBooked });
      return acc;
    }, {});
  };

  const timeslotsByDay = groupByDay(getRequestDemoTimeSlotsList?.Scheduled);

  const today = new Date();
  today.setDate(today.getDate() + 1);

  const seduleSubmitHandler = async (e) => {
    e.preventDefault();

    // Trim all fields
    const trimmedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => {
        // Check if the value is defined and is a string
        if (typeof value === "string") {
          return [key, value.trim()];
        } else {
          // If not a string, return the original value
          return [key, value];
        }
      })
    );

    // Validate each field individually
    const inputErrors = {
      full_name: !trimmedValues.full_name
        ? "Please enter your full name"
        : null,
      email: !trimmedValues.email
        ? "Please enter your email"
        : !isValidEmail(trimmedValues.email)
        ? "Please enter a valid email address"
        : null,
      mobileNumber: !trimmedValues.mobileNumber
        ? "Please enter your mobile number"
        : !isValidMobile(trimmedValues.mobileNumber)
        ? "Please enter a valid 10-digit mobile number"
        : null,
    };

    // Validate the selected date and time
    if (!selectedSlot.date || !selectedSlot.time) {
      inputErrors.date = "Please select a date and time";
    }

    setErrors(inputErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(inputErrors).some((error) => error);
    if (!hasErrors) {
      // Submit the data
      const data = {
        email: trimmedValues.email,
        fullname: trimmedValues.full_name,
        phonenumber: "+" + trimmedValues.mobileNumber,
        date: selectedSlot?.date,
        scheduleTime: selectedSlot?.time,
      };

      try {
        const actionResult = await dispatch(sendRequestDemo({ data }));
        const { Success, message } = actionResult.payload.data;
        if (Success) {
          toast.success(message);
          onCloseModal();
          setValues({
            email: "",
            full_name: "",
            mobileNumber: "",
          });
          setSelectedSlot({});
        }
      } catch (error) {
        // toast.error(error.message || "Error");
      }
    } else {
      // toast.error("Please fill in all required fields correctly");
    }
  };

  const isValidMobile = (mobileNumber) => {
    return /^\d{10}$/.test(mobileNumber);
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const days = [
    { day: "Sun", date: 8 },
    { day: "Mon", date: 9 },
    { day: "Tue", date: 10 },
    { day: "Wed", date: 11 },
    { day: "Thu", date: 12 },
    { day: "Fri", date: 13 },
    { day: "Sat", date: 14 },
  ];

  useEffect(() => {
    dispatch(requestDemoTimeSlot());
    setValues({ email: email });
  }, []);

  return (
    <>
      <div className={isDarkTheme ? "darkHeader" : "lightHeader"}>
        <div className="request_demo_control">
          <form className="contact-form-wrapper">
            <div className="request_div">
              <p className="Get-in-touch"> Request a Demo </p>

              {isDarkTheme ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={onCloseModal}
                >
                  <path
                    d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
                    fill="white"
                  />
                </svg>
              ) : (
                ""
              )}
            </div>

            <div className="form-group row">
              <div className="col-sm-4 ">
                <label htmlFor="">Full Name</label>
                <input
                  className="contecttextinpt"
                  type="text"
                  name="full_name"
                  placeholder="Enter Your Name"
                  value={values?.full_name}
                  onChange={onInputChange}
                />
                {errors?.full_name && (
                  <p className="error-message">{errors.full_name}</p>
                )}
              </div>
              <div className="col-sm-4 matchinwl-wrap">
                <label htmlFor="">Email Address</label>
                <input
                  className="contecttextinpt"
                  type="text"
                  name="email"
                  placeholder="Enter Your Email"
                  value={values.email}
                  onChange={onInputChange}
                />
                {errors?.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              <div className="col-sm-4  matchinwl-wrap">
                <label htmlFor="" className="mb-1">
                  Mobile Number
                </label>
                <input
                  className=" contecttextinpt mobnumcon"
                  type="mobileNumber"
                  name="mobileNumber"
                  maxLength={10}
                  placeholder="Enter Your Mobile Number"
                  value={values?.mobileNumber}
                  onChange={onInputChange}
                />
                {errors?.mobileNumber && (
                  <p className="error-message">{errors.mobileNumber}</p>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">Select Date And Time</label>

              <div className="py-0 w-full flex mt-2 request_demo_box ">
                {timeslotsByDay &&
                  Object.entries(timeslotsByDay).map(
                    ([day, { date, timeslots }]) => (
                      <DayColumn
                        key={day}
                        day={day}
                        date={date}
                        selectedSlot={selectedSlot}
                        handleTime={handleTime}
                        timeslots={timeslots.map(({ time }) => ({
                          time,
                          isSelected:
                            selectedSlot.day === day &&
                            selectedSlot.time === time,
                          onClick: () => handleTime(day, time, date),
                        }))}
                      />
                    )
                  )}
              </div>
            </div>
            {errors?.date && <p className="error-message2">{errors.date}</p>}
            <div className="button_div">
              <button
                type="submit"
                className="btn send-btn"
                onClick={seduleSubmitHandler}
              >
                Schedule Demo
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestDemo;
