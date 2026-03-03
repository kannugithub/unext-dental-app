import React, { useEffect, useState } from "react";
import styles from "./addnewmsgpopup.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import {
  fetchGetmessages,
  getAppointmentTimeSlot,
  getClinicPatient,
  searchMessages,
  sendAppointmentTimeSlot,
} from "@/app/store/slices/clinicAdminSlices";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import Plus from "@/app/assets/svgComponent/Plus";
import CustomModal from "@/app/Components/PopupsComponents/CustomModal";
import AddNewMessagePop2 from "./AddNewMessagePop2";

const AddnewMesagepopup = ({
  selectedPatient,
  setSelectedPatient,
  //   setOpenNotifyPopup,
  //   selectedPatientData,
  //   setSelectedPatientData,
  //   setGetTimeAndDate,

  handlePatientClick,
}) => {
  const [value, setValue] = useState(new Date());
  // const [selectedPatient, setSelectedPatient] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [openCreateAppointment, setOpenCreateAppointment] = useState(false);

  const getClinicPatientData = useAppSelector(
    (state) => state?.clinic?.getClinicPatientData
  );
  const getAppointmentTimeSlotData = useAppSelector(
    (state) => state?.clinic?.getAppointmentTimeSlotData
  );
  const dispatch = useDispatch();
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
    }
  }, []);

  console.log(getClinicPatientData?.data);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const handleClose = () => {
    setOpenCreateAppointment(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
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

  const handleTimeClick = (time) => {
    // setSelectedTime(time);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Debounce the search input
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

    const data = {
      appointment: [{ appointment_time: appointmentTime }],
    };
    try {
      const actionResult = await dispatch(
        sendAppointmentTimeSlot({ data, selectedPatient })
      );
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
        setOpenCreateAppointment(false);
        setOpenNotifyPopup(true);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the appointment.");
    } finally {
      setIsCreatingAppointment(false);
    }
  };

  console.log({ getClinicPatientData });

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
                onClick={() => handleClose()}
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
                onClick={() => handleClose()}
              >
                <path
                  d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
          {/* {!selectedPatient && ( */}
          <>
            <div className={styles.select_patient}>Select Patient</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className={styles.search_box} style={{ flexBasis: "90%" }}>
                <Image src={Images.blue_search} alt="search" />
                <input
                  type="text"
                  name=""
                  placeholder="Type name or phone number"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
              </div>
              <div
                style={{ flexBasis: "10%" }}
                onClick={() => setOpenCreateAppointment(true)}
              >
                <Image
                  src={Images.Plus}
                  alt="search"
                  style={{
                    marginTop: "10px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            {getClinicPatientData &&
              getClinicPatientData?.data?.map((item, key) => (
                <div
                  className={styles.patient_list}
                  key={key}
                  onClick={() =>
                    handlePatientClick(
                      item?.contact,
                      item?.patient_name,
                      item?.clinic_id,
                      key,
                      item
                    )
                  }
                >
                  <div className={styles.patient_name}>
                    {item?.patient_name || "--"}
                  </div>
                  <div className={styles.patient_number}>
                    {/* {item?.contact || "--"} */}
                    {formatPhoneNumber(item?.contact)}
                  </div>
                </div>
              ))}
          </>
          {/* )} */}
        </div>
      </div>
      <CustomModal
        isOpen={openCreateAppointment}
        onClose={handleClose}
        width="30w"
        shouldCloseOnOutsideClick={true}
      >
        <AddNewMessagePop2
          openCreateAppointment={openCreateAppointment}
          setOpenCreateAppointment={setOpenCreateAppointment}
        />
      </CustomModal>
    </>
  );
};

export default AddnewMesagepopup;
