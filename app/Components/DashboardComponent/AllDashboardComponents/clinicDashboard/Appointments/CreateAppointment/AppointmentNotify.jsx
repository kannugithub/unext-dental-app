import React, { useEffect, useState } from "react";
import styles from "./appointmentNotify.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useDispatch, useSelector } from "react-redux";
import { sendMessages } from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import moment from "moment";
import { toast } from "react-toastify";

const AppointmentNotify = ({
  setOpenNotifyPopup,
  clinicId,
  selectedPatientData,
  getTimeAndDate,
}) => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.authWeb.userInfo);
  const clinic = userInfo?.user?.clinics.find(
    (clinic) => clinic?._id === clinicId
  );
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleNotifyAppointment = async () => {
    const data = {
      message: `Your Appointment For Patient ${selectedPatientData?.patient_name} Has Been Schedule on ${getTimeAndDate}`,
      from: clinic?.clinic_phone,
      to: selectedPatientData?.contact,
    };
    try {
      const actionResult = await dispatch(sendMessages(data));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
        setOpenNotifyPopup(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the appointment.");
    } finally {
      setOpenNotifyPopup(false);
    }
  };

  const handleCloseAppointment = () => {
    setOpenNotifyPopup(false);
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.appointment_notify_popup}>
          <div className={styles.close_icons}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              onClick={() => setOpenNotifyPopup(false)}
            >
              <path
                d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
                fill="black"
              />
            </svg>
          </div>
          <div className={styles.thanku_images}>
            <Image src={Images.thankuyou_icon} alt="" />
          </div>
          <div className={styles.appointment_created}>Appointment Created</div>
          <div className={styles.appointment_summery}>
            Your appointment for patient {selectedPatientData?.patient_name} has
            been scheduled on {moment(getTimeAndDate).format("MMMM DD, YYYY")}..
          </div>
          <div className={styles.appointment_notify_button}>
            <button onClick={handleCloseAppointment} className={styles.cancel}>
              close
            </button>
            <button onClick={handleNotifyAppointment}>close and notify</button>
          </div>

          <div className={styles.btm_button}>
            <button onClick={handleNotifyAppointment}>
              Send Patient Information Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentNotify;
