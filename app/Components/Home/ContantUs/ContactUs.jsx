"use client";
import React, { useEffect, useState } from "react";
import "./contact.scss";
import moment from "moment";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { validateInput } from "../../common/ValidateInput/validateInput";
import {
  requestDemoTimeSlot,
  sendRequestDemo,
} from "@/app/store/slices/authSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const TimeSlot = ({ time, isSelected, onClick }) => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
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

const DayColumn = ({ day, date, timeslots, selectedSlot, handleTime }) => {
  const dateObj = new Date(date);
  const dayOfMonth = dateObj.getDate();
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
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

const ContactUs = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedSlot, setSelectedSlot] = useState({ day: null, time: null });
  const getRequestDemoTimeSlotsList = useAppSelector(
    (state) => state.authWeb.getRequestDemoTimeSlots
  );
  const handleTime = (day, time, date) => {
    setSelectedSlot({ day, time, date });
    // Reset the date error when a valid selection is made
    setErrors((prevErrors) => ({
      ...prevErrors,
      date: null,
    }));
  };

  const [selectedTimes, setSelectedTimes] = useState({});

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

  useEffect(() => {
    dispatch(requestDemoTimeSlot());
  }, []);
  const seduleSubmitHandler = async (e) => {
    e.preventDefault();

    // Trim all fields
    const trimmedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()])
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
        phonenumber: trimmedValues.mobileNumber,
        date: selectedSlot?.date,
        scheduleTime: selectedSlot?.time,
      };

      try {
        const actionResult = await dispatch(sendRequestDemo({ data }));
        const { Success, message } = actionResult.payload.data;
        if (Success) {
          toast.success(message);
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

  // const handleTime = (day, time) => {
  //   setSelectedTimes((prevState) => ({
  //     ...prevState,
  //     [day]: time,
  //   }));
  // };

  const days = [
    { day: "Sun", date: 8 },
    { day: "Mon", date: 9 },
    { day: "Tue", date: 10 },
    { day: "Wed", date: 11 },
    { day: "Thu", date: 12 },
    { day: "Fri", date: 13 },
    { day: "Sat", date: 14 },
  ];

  return (
    <>
      <div className={isDarkTheme ? "darkHeader" : "lightHeader"}>
        <div className="conect-bg">
          <div className="container">
            <div className="contact_flex">
              <div className="left_contact fade-in-bottom" id="infoSec">
                <div className="info-bg">
                  <div className="info_infotext">
                    <h4>Contact Info</h4>
                    <p>
                      Offer onboarding training and 24/7 customer support. If
                      you need our support team, call the number below for
                      assistance or click the chat bubble
                    </p>
                  </div>
                  <div className="location-wrapper">
                    <div>
                      {isDarkTheme ? (
                        <svg
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="33.5"
                            cy="33.5"
                            r="33.5"
                            fill="white"
                            fill-opacity="0.07"
                          />
                          <path
                            d="M25.8333 32.3933C27.7533 36.1667 30.84 39.2533 34.62 41.1733L37.5533 38.2333C37.92 37.8667 38.4467 37.76 38.9067 37.9067C40.4 38.4 42.0067 38.6667 43.6667 38.6667C44.4067 38.6667 45 39.26 45 40V44.6667C45 45.4067 44.4067 46 43.6667 46C31.1467 46 21 35.8533 21 23.3333C21 22.5933 21.6 22 22.3333 22H27C27.74 22 28.3333 22.5933 28.3333 23.3333C28.3333 24.9933 28.6 26.6 29.0933 28.0933C29.24 28.5533 29.1333 29.08 28.7667 29.4467L25.8333 32.3933Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                        >
                          <circle cx="33.5" cy="33.5" r="33.5" fill="white" />
                          <path
                            d="M25.8333 32.3933C27.7533 36.1667 30.84 39.2533 34.62 41.1733L37.5533 38.2333C37.92 37.8667 38.4467 37.76 38.9067 37.9067C40.4 38.4 42.0067 38.6667 43.6667 38.6667C44.4067 38.6667 45 39.26 45 40V44.6667C45 45.4067 44.4067 46 43.6667 46C31.1467 46 21 35.8533 21 23.3333C21 22.5933 21.6 22 22.3333 22H27C27.74 22 28.3333 22.5933 28.3333 23.3333C28.3333 24.9933 28.6 26.6 29.0933 28.0933C29.24 28.5533 29.1333 29.08 28.7667 29.4467L25.8333 32.3933Z"
                            fill="#0978F5"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="location-texts">
                      <ul>
                        <li className="locationt-hading">Contact Us:</li>
                        <li className="contect-details">
                          <a
                            href="tel:+1 (877) 392 - 0652"
                            className="pages-link"
                          >
                            +1 (877) 392 - 0652
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="location-wrapper">
                    <div>
                      {isDarkTheme ? (
                        <svg
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="33.5"
                            cy="33.5"
                            r="33.5"
                            fill="white"
                            fill-opacity="0.07"
                          />
                          <path
                            d="M43.3333 23H24.6667C22.1 23 20 25.1 20 27.6667V39.3333C20 41.9 22.1 44 24.6667 44H43.3333C45.9 44 48 41.9 48 39.3333V27.6667C48 25.1 45.9 23 43.3333 23ZM45.2 29.7667L35.9833 35.95C35.4 36.3 34.7 36.5333 34 36.5333C33.3 36.5333 32.6 36.3 32.0167 35.95L22.8 29.7667C22.3333 29.4167 22.2167 28.7167 22.5667 28.1333C22.9167 27.6667 23.6167 27.55 24.2 27.9L33.4167 34.0833C33.7667 34.3167 34.35 34.3167 34.7 34.0833L43.9167 27.9C44.5 27.55 45.2 27.6667 45.55 28.25C45.7833 28.7167 45.6667 29.4167 45.2 29.7667Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                        >
                          <circle cx="33.5" cy="33.5" r="33.5" fill="white" />
                          <path
                            d="M43.3333 23H24.6667C22.1 23 20 25.1 20 27.6667V39.3333C20 41.9 22.1 44 24.6667 44H43.3333C45.9 44 48 41.9 48 39.3333V27.6667C48 25.1 45.9 23 43.3333 23ZM45.2 29.7667L35.9833 35.95C35.4 36.3 34.7 36.5333 34 36.5333C33.3 36.5333 32.6 36.3 32.0167 35.95L22.8 29.7667C22.3333 29.4167 22.2167 28.7167 22.5667 28.1333C22.9167 27.6667 23.6167 27.55 24.2 27.9L33.4167 34.0833C33.7667 34.3167 34.35 34.3167 34.7 34.0833L43.9167 27.9C44.5 27.55 45.2 27.6667 45.55 28.25C45.7833 28.7167 45.6667 29.4167 45.2 29.7667Z"
                            fill="#0978F5"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="location-texts">
                      <ul>
                        <li className="locationt-hading">Email:</li>
                        <li className="contect-details">
                          <a
                            href="mailto:sales@unextcomm.com"
                            className="pages-link"
                          >
                            sales@unextcomm.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="location-wrapper">
                    <div>
                      {isDarkTheme ? (
                        <svg
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="33.5"
                            cy="33.5"
                            r="33.5"
                            fill="white"
                            fill-opacity="0.07"
                          />
                          <path
                            d="M34.085 20C28.5166 20 24 24.5166 24 30.085C24 37.6488 34.085 48.8143 34.085 48.8143C34.085 48.8143 44.17 37.6488 44.17 30.085C44.17 24.5166 39.6534 20 34.085 20ZM34.085 33.6868C32.0968 33.6868 30.4832 32.0732 30.4832 30.085C30.4832 28.0968 32.0968 26.4832 34.085 26.4832C36.0732 26.4832 37.6868 28.0968 37.6868 30.085C37.6868 32.0732 36.0732 33.6868 34.085 33.6868Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                        >
                          <circle cx="33.5" cy="33.5" r="33.5" fill="white" />
                          <path
                            d="M34.085 20C28.5166 20 24 24.5166 24 30.085C24 37.6488 34.085 48.8143 34.085 48.8143C34.085 48.8143 44.17 37.6488 44.17 30.085C44.17 24.5166 39.6534 20 34.085 20ZM34.085 33.6868C32.0968 33.6868 30.4832 32.0732 30.4832 30.085C30.4832 28.0968 32.0968 26.4832 34.085 26.4832C36.0732 26.4832 37.6868 28.0968 37.6868 30.085C37.6868 32.0732 36.0732 33.6868 34.085 33.6868Z"
                            fill="#0978F5"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="location-texts">
                      <ul>
                        <li className="locationt-hading">Address:</li>
                        <li className="contect-details">
                          <a className="pages-link">
                            500 East McBee Ave Suite 100 Greenville, SC 29601
                            United States
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right_request fade-in-bottom" id="formSec">
                <form
                  onSubmit={seduleSubmitHandler}
                  className="contact-form-wrapper"
                >
                  <p className="Get-in-touch"> Request a Demo </p>
                  <div className="form-group row">
                    <div className="col-sm-6 ">
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
                    <div className="col-sm-6 matchinwl-wrap">
                      <label htmlFor="">Email Address</label>
                      <input
                        className="contecttextinpt"
                        type="text"
                        name="email"
                        placeholder="Enter Your Email"
                        value={values?.email}
                        onChange={onInputChange}
                      />
                      {errors?.email && (
                        <p className="error-message">{errors.email}</p>
                      )}
                    </div>

                    <div className="col-12 matchinwl-wrap">
                      <label htmlFor="" className="mb-1">
                        Mobile Number
                      </label>
                      <input
                        className=" contecttextinpt mobnumcon"
                        type="mobileNumber"
                        name="mobileNumber"
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
                    <div className="select_time">Select Date And Time</div>

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
                  {errors?.date && (
                    <p className="error-message2">{errors.date}</p>
                  )}
                  <div className="form-group">
                    <button type="submit" className="btn send-btn ">
                      Schedule Demo
                    </button>
                  </div>
                </form>

                {/* <button type="submit" className="liveChatbtn"></button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

// const data = {
//   full_name: values?.full_name,
//   email: values?.email,
//   email: values?.email,
//   date: values?.date,
//   message: values?.message,
// };
// if (!values?.full_name) {
//   toast.error("Enter your first name");
// } else if (!values?.email) {
//   toast.error("Enter your last name");
// } else if (!values?.email) {
//   toast.error("Enter your Email");
// } else if (!values?.date) {
//   toast.error("Select your Date");
// } else {
//   // setOrderValues(data);
// }
