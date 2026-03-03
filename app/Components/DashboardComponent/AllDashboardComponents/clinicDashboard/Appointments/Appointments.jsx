import React, { useEffect, useState } from "react";
import styles from "../../../DashboardHeader/subContainer.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import CreateAppointment from "./CreateAppointment/CreateAppointment";
import {
  getAppointmentList,
  getClinicPatient,
} from "@/app/store/slices/clinicAdminSlices";
import AppointmentNotify from "./CreateAppointment/AppointmentNotify";
import Calendar from "react-calendar";
import moment from "moment";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import CalenderAppointment from "./CalenderAppointment/CalenderAppointment";

const Appointments = () => {
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openCreateAppointment, setOpenCreateAppointment] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);
  const [limit, setLimit] = useState(10);
  const [clinicId, setClinicId] = useState(null);
  const [openNotifyPopup, setOpenNotifyPopup] = useState(false);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [getTimeAndDate, setGetTimeAndDate] = useState(null);
  const [value, setValue] = useState(new Date());
  const [view, setView] = useState("list");

  const getAppointmentListData = useAppSelector(
    (state) => state?.clinic?.getAppointmentListData
  );
  const getAppointmentTimeSlotResponse = useAppSelector(
    (state) => state?.clinic?.getAppointmentTimeSlotResponse
  );
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("openSchedule");
      const patientDetails = localStorage.getItem("callpatientDetails");

      if (value === "true" && patientDetails) {
        try {
          setOpenCreateAppointment(true);
          setSelectedPatientData(patientDetails);
          localStorage.removeItem("openSchedule");
        } catch (error) {
          console.error(
            "Failed to parse patientDetails from localStorage:",
            error
          );
        }
      }
    }
  }, []);

  const handleDateChange = (date) => {
    console.log("Date selected:", date);
    setValue(date);

    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      console.log("Formatted Date:", formattedDate);
      const data = {
        clinicId: clinicId,
        currentPage: 1,
        limit: 10,
        date: formattedDate,
      };

      console.log("Dispatching data:", data);
      dispatch(getAppointmentList(data));
    } else {
      console.log("Invalid date selected");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (clinicId) {
      dispatch(getClinicPatient({ clinicId, currentPage, limit }));
    }
  }, [dispatch, clinicId, currentPage, limit]);

  useEffect(() => {
    setLoading(true);
    if (clinicId) {
      dispatch(getAppointmentList({ clinicId, currentPage, limit })).then(
        () => {
          setLoading(false);
        }
      );
    }
  }, [dispatch, clinicId, currentPage, limit, getAppointmentTimeSlotResponse]);

  const handleClose = () => {
    setOpenCreateAppointment(false);
    localStorage.removeItem("callpatientDetails");
  };

  const handleCloseNotifyPopup = () => {
    setOpenNotifyPopup(false);
  };
  const totalPages = getAppointmentListData?.pagination?.total_pages;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  console.log({ getAppointmentListData });

  console.log({ totalPages });

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log("Current view:", view); // Debugging log

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.dashboard_sub_conatiner}>
          <div className={styles.dashSub_blue}>
            <div className={styles.compo_name}>
              <span>New Appointments</span>
              <div className={styles.compo_name2}>
                <span
                  className={view === "list" ? styles.activeTab : ""}
                  onClick={() => setView("list")}
                >
                  List View
                </span>
                <span>|</span>
                <span
                  className={view === "calendar" ? styles.activeTab : ""}
                  onClick={() => setView("calendar")}
                >
                  Calendar View
                </span>
              </div>
            </div>

            <div className={styles.subCompBtns}>
              <div
                className={styles.crate_btn}
                onClick={() => setOpenCreateAppointment(true)}
              >
                <Image src={Images.plus_icon} alt="" /> Create Appointment
              </div>
              <div
                className={styles.crate_btn}
                onClick={() => setOpenCalender(!openCalender)}
              >
                <Image src={Images.Select_blueicon} alt="" /> Select Date
              </div>
              {openCalender && (
                <div className={styles.calender_for_search}>
                  <div className={styles.search_calender}>
                    <Calendar onChange={handleDateChange} value={value} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <div className={styles.spinner_patient_loader}>
              <SpinnerLoader />
            </div>
          ) : view === "list" ? (
            <div className={styles.card_container}>
              <div
                className={isDarkTheme === "dark" ? "card1 mx-4" : "card1 mx-4"}
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col">S No.</th>
                          <th scope="col">Name</th>
                          <th scope="col">Number</th>
                          <th scope="col">Scheduled Time Slot</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody
                        id="clinicListTable"
                        className={styles.card_container_data}
                      >
                        {getAppointmentListData?.data?.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td style={{ textTransform: "capitalize" }}>
                              {item?.patients?.patient_name || "--"}
                            </td>
                            <td>
                              {formatPhoneNumber(
                                item?.patients?.contact || "--"
                              )}
                            </td>
                            <td>
                              {new Date(
                                item?.latestAppointment?.appointment_time ||
                                  "--"
                              )
                                .toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                                .replace(/\//g, "/")}
                              &nbsp;
                              {new Date(
                                item?.latestAppointment?.appointment_time ||
                                  "--"
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                              })}
                            </td>
                            <td>
                              {item?.latestAppointment?.appointment_status ===
                                "cancelled" && (
                                <span style={{ color: "#CE4E4E" }}>
                                  {item?.latestAppointment?.appointment_status}
                                </span>
                              )}
                              {item?.latestAppointment?.appointment_status ===
                                "missed" && (
                                <span style={{ color: "#CE4E4E" }}>
                                  {item?.latestAppointment?.appointment_status}
                                </span>
                              )}
                              {item?.latestAppointment?.appointment_status ===
                                "not-visit" && (
                                <span style={{ color: "#F1B325" }}>
                                  {item?.latestAppointment?.appointment_status}
                                </span>
                              )}
                              {item?.latestAppointment?.appointment_status ===
                                "visit" && (
                                <span style={{ color: "#39CE8C" }}>
                                  {item?.latestAppointment?.appointment_status}
                                </span>
                              )}
                              {item?.latestAppointment?.appointment_status ===
                                "completed" && (
                                <span style={{ color: "#39CE8C" }}>
                                  {item?.latestAppointment?.appointment_status}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {getAppointmentListData?.data?.length > 0 && (
                    <div className={styles.pagination}>
                      <button onClick={prevPage} disabled={currentPage === 1}>
                        {isDarkTheme === "dark" ? (
                          <Image src={Images.paginationLeft}></Image>
                        ) : (
                          <Image src={Images.LightpaginationLeft}></Image>
                        )}
                        Prev
                      </button>
                      <span>
                        {pageNumbers.map((pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={
                              currentPage === pageNumber ? styles.active : ""
                            }
                          >
                            {pageNumber}
                          </button>
                        ))}

                        {console.log({ pageNumbers })}
                      </span>

                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        {isDarkTheme === "dark" ? (
                          <Image src={Images.paginationright}></Image>
                        ) : (
                          <Image src={Images.Lightpaginationright}></Image>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <CalenderAppointment />
          )}
        </div>
      </div>
      {openCreateAppointment && (
        <RightCustomModal
          isOpen={openCreateAppointment}
          onClose={handleClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <CreateAppointment
            setOpenCreateAppointment={setOpenCreateAppointment}
            setOpenNotifyPopup={setOpenNotifyPopup}
            selectedPatientData={selectedPatientData}
            setSelectedPatientData={setSelectedPatientData}
            setGetTimeAndDate={setGetTimeAndDate}
          />
        </RightCustomModal>
      )}
      {openNotifyPopup && (
        <RightCustomModal
          isOpen={openNotifyPopup}
          onClose={handleCloseNotifyPopup}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <AppointmentNotify
            setOpenNotifyPopup={setOpenNotifyPopup}
            clinicId={clinicId}
            selectedPatientData={selectedPatientData}
            getTimeAndDate={getTimeAndDate}
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default Appointments;
