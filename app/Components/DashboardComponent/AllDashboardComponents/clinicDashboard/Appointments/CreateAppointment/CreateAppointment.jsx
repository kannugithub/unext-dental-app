import React, { useEffect, useState } from "react";
import styles from "./createAppointment.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useAppSelector } from "@/app/store/lib/hooks";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import moment from "moment";
import "./reactCalender.css";
import { toast } from "react-toastify";
import {
  getAppointmentTimeSlot,
  getClinicPatient,
  searchMessages,
  sendAppointmentTimeSlot,
} from "@/app/store/slices/clinicAdminSlices";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";

const CreateAppointment = ({
  setOpenCreateAppointment,
  setOpenNotifyPopup,
  selectedPatientData,
  setSelectedPatientData,
  setGetTimeAndDate,
}) => {
  const [value, setValue] = useState(new Date());
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const getClinicPatientData = useAppSelector(
    (state) => state?.clinic?.getClinicPatientData
  );
  const getAppointmentTimeSlotData = useAppSelector(
    (state) => state?.clinic?.getAppointmentTimeSlotData
  );
  const dispatch = useDispatch();
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
    }
  }, []);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const callpatientDetails = localStorage.getItem("callpatientDetails");
      if (callpatientDetails) {
        setSelectedPatient(callpatientDetails);
        setSelectedPatientData(callpatientDetails);
        handleDateChange(new Date());
        if (!setOpenCreateAppointment) {
          localStorage.removeItem("callpatientDetails");
          localStorage.removeItem("openSchedule");
        }
      }
    }
  }, [setOpenCreateAppointment]);

  const showData = localStorage.getItem("callpatientDetails");

  useEffect(() => {
    if (showData) {
      setValues((prevValues) => ({
        ...prevValues,
        patient_name: showData.patient_name,
        contact: showData.contact ? showData.contact : showData,
      }));
    }
  }, [showData]);

  const isAppointmentDataAvailable =
    !!getAppointmentTimeSlotData?.available_slots;
  const isCreateButtonDisabled =
    isCreatingAppointment || !isAppointmentDataAvailable;

  const handleDateChange = (date) => {
    setValue(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const data = {
      clinicId: clinicId,
      date: formattedDate,
    };
    dispatch(getAppointmentTimeSlot(data));
  };

  const handlePatientClick = (item) => {
    setSelectedPatient(item?._id);
    setSelectedPatientData(item);
    handleDateChange(new Date());
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  useEffect(() => {
    if (clinicId) {
      dispatch(
        getClinicPatient({
          clinicId,
          currentPage: 1,
          limit: 50,
          search: debouncedSearchInput,
        })
      );
    }
  }, [debouncedSearchInput, dispatch, clinicId]);

  const handleSendAppointment = async () => {
    setIsCreatingAppointment(true);
    const appointmentTime =
      moment(value).format("YYYY-MM-DD") +
      "T" +
      moment(selectedTime, ["h:mm A"]).format("HH:mm");

    setGetTimeAndDate(appointmentTime);

    let data = {};

    if (showData) {
      data = {
        patient_name: values.patient_name,
        contact: values.contact,
        balance: selectedPatientData.balance ? selectedPatientData.balance : 0,
        clinic_id: clinicId,
      };
    } else {
      data.appointment = [{ appointment_time: appointmentTime }];
    }

    try {
      const actionResult = await dispatch(
        sendAppointmentTimeSlot({ data, selectedPatient, showData })
      );
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
        setOpenCreateAppointment(false);
        setOpenNotifyPopup(true);
        localStorage.removeItem("openSchedule");
        localStorage.removeItem("callpatientDetails");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the appointment.");
    } finally {
      setIsCreatingAppointment(false);
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.create_appointment_control}>
          <div className={styles.close_icons}>
            {isDarkTheme === "dark" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setOpenCreateAppointment(false)}
              >
                <path
                  d="M3.09102 10.9077C3.20768 11.0244 3.32435 11.0827 3.49935 11.0827C3.67435 11.0827 3.79102 11.0244 3.90768 10.9077L6.99935 7.81602L10.091 10.9077C10.2077 11.0244 10.3827 11.0827 10.4994 11.0827C10.616 11.0827 10.791 11.0244 10.9077 10.9077C11.141 10.6744 11.141 10.3244 10.9077 10.091L7.81602 6.99935L10.9077 3.90768C11.141 3.67435 11.141 3.32435 10.9077 3.09102C10.6744 2.85768 10.3243 2.85768 10.091 3.09102L6.99935 6.18268L3.90768 3.09102C3.67435 2.85768 3.32435 2.85768 3.09102 3.09102C2.85768 3.32435 2.85768 3.67435 3.09102 3.90768L6.18268 6.99935L3.09102 10.091C2.85768 10.3244 2.85768 10.6744 3.09102 10.9077Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                onClick={() => setOpenCreateAppointment(false)}
              >
                <path
                  d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
          {!selectedPatient && (
            <>
              <div className={styles.select_patient}>Select Patient</div>
              <div className={styles.search_box}>
                <Image src={Images.blue_search} alt="search" />
                <input
                  type="text"
                  name=""
                  placeholder="Type name or phone number"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
              </div>
              {getClinicPatientData?.data?.map((item, key) => (
                <div
                  className={styles.patient_list}
                  key={key}
                  onClick={() => handlePatientClick(item)}
                >
                  <div className={styles.patient_name}>
                    {item?.patient_name || "--"}
                  </div>
                  <div className={styles.patient_number}>
                    {formatPhoneNumber(item?.contact || "--")}
                  </div>
                </div>
              ))}
            </>
          )}

          {selectedPatient && (
            <>
              <div className={styles.select_patient}>Create Appointment</div>
              <div className={styles.selected_patients}>
                {showData ? (
                  <div className={styles.appointment_input}>
                    <div className={styles.appointment_input_field}>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        name="patient_name"
                        value={values?.patient_name || ""}
                        onChange={onInputChange}
                      ></input>

                      {errors?.patient_name && (
                        <p className="error-message">{errors.patient_name}</p>
                      )}
                    </div>
                    <div className={styles.appointment_input_field}>
                      <input
                        type="text"
                        placeholder="Enter your number"
                        name="contact"
                        value={values?.contact || ""}
                        onChange={onInputChange}
                      ></input>
                      {errors?.contact && (
                        <p className="error-message">{errors.contact}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.selected_patient}>
                      {selectedPatientData?.patient_name}
                    </div>
                    <div className={styles.selected_patient_number}>
                      {formatPhoneNumber(
                        selectedPatientData?.contact || selectedPatientData
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className={styles.cost}>
                <p>Treatment Cost</p>
                <div className={styles.input_cost}>
                  <input
                    type="text"
                    value="$500.00"
                    name="cost"
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div
                className={
                  isDarkTheme === "dark" ? "darkHeader1" : "lightHeader1"
                }
              >
                <Calendar
                  onChange={handleDateChange}
                  value={value}
                  minDate={new Date()}
                />
              </div>
              <div className={styles.time_slots}>
                <div className={styles.time_slot_tab}>Time</div>
                <div className={styles.time_slots_boxes}>
                  {getAppointmentTimeSlotData?.available_slots?.map(
                    (item, key) => (
                      <div
                        className={
                          item.time === selectedTime
                            ? styles.selectedTime
                            : item.status === "available"
                            ? styles.availableTime
                            : styles.bookedTime
                        }
                        onClick={() =>
                          item.status === "available" &&
                          handleTimeClick(item.time)
                        }
                        key={key}
                      >
                        {item.time}
                      </div>
                    )
                  )}
                  {console.log(getAppointmentTimeSlotData)}
                </div>
              </div>
              {!isAppointmentDataAvailable && (
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: isDarkTheme === "dark" ? "275" : "300",
                    color: isDarkTheme === "dark" ? "white" : "black",
                  }}
                >
                  Time slots not found for this date.
                </div>
              )}
              <div className={styles.create_appointment_btn}>
                <button
                  disabled={isCreateButtonDisabled}
                  onClick={handleSendAppointment}
                >
                  Create Appointment
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAppointment;
