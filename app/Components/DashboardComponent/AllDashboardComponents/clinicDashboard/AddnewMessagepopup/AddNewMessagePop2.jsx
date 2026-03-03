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
  fetechGetSMS,
  getAppointmentTimeSlot,
  getClinicPatient,
  searchMessages,
  sendAppointmentTimeSlot,
  sendMessages,
} from "@/app/store/slices/clinicAdminSlices";
import SendImage from "@/app/assets/svgComponent/SendImage";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import Plus from "@/app/assets/svgComponent/Plus";

const AddNewMessagePop2 = ({
  selectedPatient,
  setSelectedPatient,
  handlePatientClick,
  setOpenCreateAppointment,
}) => {
  const [value, setValue] = useState(new Date());
  const [clinicId, setClinicId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const [values, setValues] = useState({ message: "", number: "" });

  const getClinicPatientData = useAppSelector(
    (state) => state?.clinic?.getClinicPatientData
  );
  const getAppointmentTimeSlotData = useAppSelector(
    (state) => state?.clinic?.getAppointmentTimeSlotData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
    }
  }, []);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setValues((prevValues) => ({ ...prevValues, number: event.target.value }));
  };

  const handleMessageChange = (event) => {
    setValues((prevValues) => ({ ...prevValues, message: event.target.value }));
  };

  const handleClose = () => {
    console.log("smdnjsand");
    setOpenCreateAppointment(false);
    setValues({ message: "", number: "" });
  };

  const handleSendTextSms = async (e) => {
    e.preventDefault();

    const payload = {
      // from: `+${values.number}`,
      from: `+13233002250`,
      to: `+1${values.number}`,
      // to: values.number,
      message: values.message,
      media: [],
      createdAt: new Date().toISOString(),
    };

    try {
      const actionResult = await dispatch(sendMessages(payload));
      if (actionResult?.payload?.success) {
        setValues({ message: "", number: "" });
        dispatch(fetechGetSMS(payload));
        toast.success("Message sent successfully");
      } else {
        toast.error(actionResult?.payload?.message || "Invalid phone number");
      }
    } catch (error) {
      toast.error(error.message || "Error while sending sms to this number");
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
          <>
            <div className={styles.select_patient}>New Message</div>
            <form onSubmit={handleSendTextSms}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  className={styles.search_box}
                  style={{ flexBasis: "100%" }}
                >
                  <span>To:</span>
                  <input
                    type="number"
                    name="number"
                    value={values.number}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.message}>
                <div className={styles.inner} style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <input
                      type="text"
                      name="message"
                      value={values.message}
                      onChange={handleMessageChange}
                      placeholder="Write a message..."
                      required
                    />
                    <button type="submit">
                      <Image
                        src={Images.send_msg}
                        alt="message"
                        // onClick={handleSendTextSms}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        </div>
      </div>
    </>
  );
};

export default AddNewMessagePop2;
