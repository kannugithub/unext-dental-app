import React, { useEffect, useState } from "react";
import styles from "./viewSinglePatientDetails.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import AddNote from "../AddNote/AddNote";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import NotificationPopup from "@/app/Components/DashboardComponent/DashboardHeader/NotificationPopup";
import LogoutPopup from "@/app/Components/DashboardComponent/LogoutPopup";
import {
  fetchPatientNotes,
  fetchSinglePatient,
  sendRequestPayment,
} from "@/app/store/slices/superAdminSlices";
import moment from "moment";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";

const ViewSinglePatientDetails = ({
  singlePatientId,
  handleClose,
  setOpenSinglePatient,
}) => {
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [isAddnote, setIsAddnote] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const dispatch = useDispatch();
  const singlePatientDataList = useAppSelector(
    (state) => state.admin.singlePatientData
  );
  const patientListData = useAppSelector(
    (state) => state?.admin?.patientListData
  );
  const getPatientNoteData = useAppSelector(
    (state) => state.admin.getPatientNotes
  );
  const getRequestPaymentData = useAppSelector(
    (state) => state.admin.getRequestPaymentData
  );

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    dispatch(fetchPatientNotes(singlePatientId));
  }, [singlePatientId]);

  const closeNote = () => {
    setIsAddnote(false);
  };
  const openNote = () => {
    setIsAddnote(true);
  };

  console.log("dataLoading-=-=-=-=", dataLoading);

  useEffect(() => {
    const fetchPatient = async () => {
      setDataLoading(true);
      try {
        const actionResult = await dispatch(
          fetchSinglePatient(singlePatientId)
        );
        const { success } = unwrapResult(actionResult);
        if (success) {
          setDataLoading(false);
        }
      } catch (error) {
        toast.error(error?.message);
        setDataLoading(false);
      }
    };

    fetchPatient();
  }, [getRequestPaymentData]);

  const handleRequestPayment = async () => {
    if (dataLoading) {
      return;
    }
    setDataLoading(true);
    try {
      const actionResult = await dispatch(sendRequestPayment());
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        setDataLoading(false);
        toast.success(message);
      }
    } catch (error) {
      setDataLoading(false);
      toast.error(error.message || "Error adding clinic");
    }
  };

  console.log("singlePatientDataList", singlePatientDataList);

  let lastItem =
    getPatientNoteData?.data?.[getPatientNoteData?.data?.length - 1];

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        {dataLoading ? (
          <div className={styles.spinner_boxes}>
            <SpinnerLoader />
          </div>
        ) : (
          <div className={styles.single_patient_details}>
            <div className={styles.close_icons}>
              {isDarkTheme === "dark" ? (
                <Image
                  src={Images.whiteclose_icon}
                  onClick={() => setOpenSinglePatient(false)}
                ></Image>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setOpenSinglePatient(false)}
                >
                  <path
                    d="M4.41602 15.5837C4.58268 15.7503 4.74935 15.8337 4.99935 15.8337C5.24935 15.8337 5.41602 15.7503 5.58268 15.5837L9.99935 11.167L14.416 15.5837C14.5827 15.7503 14.8327 15.8337 14.9994 15.8337C15.166 15.8337 15.416 15.7503 15.5827 15.5837C15.916 15.2503 15.916 14.7503 15.5827 14.417L11.166 10.0003L15.5827 5.58366C15.916 5.25033 15.916 4.75033 15.5827 4.41699C15.2494 4.08366 14.7493 4.08366 14.416 4.41699L9.99935 8.83366L5.58268 4.41699C5.24935 4.08366 4.74935 4.08366 4.41602 4.41699C4.08268 4.75033 4.08268 5.25033 4.41602 5.58366L8.83268 10.0003L4.41602 14.417C4.08268 14.7503 4.08268 15.2503 4.41602 15.5837Z"
                    fill="#1E3441"
                  />
                </svg>
              )}
            </div>
            <div className={styles.patient_information}>
              Patient Information
            </div>
            <div className={styles.patient_info_control}>
              <div className={styles.patient_left_box}>
                <div className={styles.patient_left_first}>
                  <div className={styles.patient_name}>Patient ID</div>
                  <div style={{ fontSize: "16px", fontWeight: "300" }}>
                    {singlePatientDataList?.data?.patientId}
                  </div>
                </div>
                <div className={styles.patient_left_first}>
                  <div className={styles.patient_name}>Phone Number</div>
                  <div style={{ fontSize: "16px", fontWeight: "300" }}>
                    {formatPhoneNumber(
                      singlePatientDataList?.data?.contact || "--"
                    )}
                  </div>
                </div>
                <div className={styles.patient_left_first}>
                  <div className={styles.patient_name}>DOB</div>
                  <div style={{ fontSize: "16px", fontWeight: "300" }}>
                    {new Date(singlePatientDataList?.data?.dob)
                      .toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "/")}
                  </div>
                </div>
                <div className={styles.patient_left_first}>
                  <div className={styles.patient_name}>Balance</div>
                  <div
                    style={{ fontSize: "16px", fontWeight: "300" }}
                    className={styles.patient_left_button}
                  >
                    {singlePatientDataList?.data?.balance < 0 && (
                      <button
                        onClick={handleRequestPayment}
                        disabled={dataLoading}
                      >
                        Request Payment
                      </button>
                    )}
                    {/* ${singlePatientDataList?.data?.balance} */}
                    {singlePatientDataList?.data?.balance === null ||
                    singlePatientDataList?.data?.balance === "" ||
                    singlePatientDataList?.data?.balance === "null"
                      ? "$0"
                      : singlePatientDataList?.data?.balance.includes("$")
                      ? singlePatientDataList?.data?.balance
                      : `$${singlePatientDataList?.data?.balance}`}
                  </div>
                </div>

                <div className={styles.patient_left_first}>
                  <div className={styles.patient_name}>Next Visit</div>
                  <div style={{ fontSize: "16px", fontWeight: "300" }}>
                    {singlePatientDataList?.data?.last_visit || "--"}
                  </div>
                </div>
              </div>
              <div className={styles.patient_right_box}>
                <div className={styles.patient_right_first}>
                  <div className={styles.patient_name}>Patient Name</div>
                  <div style={{ fontSize: "16px", fontWeight: "300" }}>
                    {singlePatientDataList?.data?.patient_name}
                  </div>
                </div>
                <div className={styles.patient_right_first}>
                  <div className={styles.patient_name}>Email ID</div>
                  <div style={{ fontSize: "16px", fontWeight: "300" }}>
                    {singlePatientDataList?.data?.email}
                  </div>
                </div>
                <div className={styles.patient_right_first}>
                  <div className={styles.patient_name}>Gender</div>
                  <div style={{ fontSize: "16px", fontWeight: "300" }}>
                    {singlePatientDataList?.data?.gender}
                  </div>
                </div>
                <div className={styles.patient_right_first}>
                  <div className={styles.patient_name}>Last Visit</div>
                  <div style={{ fontSize: "16px", fontWeight: "300" }}>
                    {singlePatientDataList?.data?.last_visit || "--"}
                  </div>
                </div>
                <div className={styles.patient_right_first1}>
                  <div className={styles.patient_name}>
                    <p style={{ fontSize: "15px", fontWeight: "400" }}>
                      {lastItem?.employee_id?.name || "Unknown"} &nbsp;
                      <span style={{ fontSize: "12px", fontWeight: "300" }}>
                        {moment(lastItem?.createdAt).fromNow()}
                      </span>
                    </p>
                    <span style={{ fontSize: "12px", fontWeight: "300" }}>
                      {lastItem?.notes}
                    </span>
                  </div>
                  <div
                    className={styles.patient_button}
                    onClick={() => openNote()}
                  >
                    <Image src={Images.plus_icon}></Image> ADD
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.appointment_list}>Insurance Document</div>
            {singlePatientDataList?.data?.insurance_docs?.length === 0 ? (
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
                className={styles.no_docs}
              >
                No insurance docs
              </div>
            ) : (
              <div className={styles.docs_file_list}>
                {singlePatientDataList?.data?.insurance_docs?.map(
                  (item, key) => (
                    <div className={styles.insurance_docs} key={key}>
                      <Image src={Images.dpdf_icon} alt="" />
                      <a href={item} target="_blank" rel="noopener noreferrer">
                        {item}
                      </a>
                    </div>
                  )
                )}
              </div>
            )}
            <div className={styles.appointment_list1}>Appointment List</div>
            {singlePatientDataList?.data?.appointment?.map((item, key) => {
              const appointmentDate = new Date(item?.appointment_time);
              const displayDate = moment(appointmentDate).format("MM/DD/YYYY");
              const displayTime = moment(appointmentDate).format("hh:mm A");

              let statusColor;
              switch (item?.appointment_status) {
                case "visit":
                  statusColor = "green";
                  break;
                case "missed":
                  statusColor = "red";
                  break;
                case "cancelled":
                    statusColor = "red";
                    break;
                case "not-visit":
                  statusColor = "#F1B325";
                  break;
                default:
                  statusColor = "black";
              }

              return (
                <div className={styles.appointment_list_control} key={key}>
                  <span className={styles.appointment_list_text}>
                    {displayDate}&nbsp; {displayTime}
                  </span>
                  <div
                    style={{
                      color: statusColor,
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "300px",
                    }}
                  >
                    {item?.appointment_status}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {isAddnote ? (
        <RightCustomModal
          isOpen={isAddnote}
          onClose={closeNote}
          width="30w"
          shouldCloseOnOutsideClick={true}
          className="modal-dialog-righted"
        >
          <AddNote
            closeNote={closeNote}
            setIsAddnote={setIsAddnote}
            singlePatientId={singlePatientId}
          />
        </RightCustomModal>
      ) : (
        ""
      )}
    </>
  );
};

export default ViewSinglePatientDetails;
