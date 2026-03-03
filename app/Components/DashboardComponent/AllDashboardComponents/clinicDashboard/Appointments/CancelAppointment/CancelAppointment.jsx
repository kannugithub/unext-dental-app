import React, { useEffect, useRef, useState } from "react";
import styles from "../../../../DashboardHeader/subContainer.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "@/app/Components/PopupsComponents/Modal";

import {
  getAppointmentList,
  getClinicPatient,
} from "@/app/store/slices/clinicAdminSlices";

import Calendar from "react-calendar";
import moment from "moment";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import CreateAppointment from "../CreateAppointment/CreateAppointment";
import AppointmentNotify from "../CreateAppointment/AppointmentNotify";

const CancelAppointment = (currentTab) => {
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
  const [openSinglePatient, setOpenSinglePatient] = useState(false);
  const [singlePatientId, setSinglePatientId] = useState(null);
  const [file, setFile] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState(null);
  const [deletePatientPopup, setDeletePatientPopup] = useState(false);
  const [openfilterpopup, setOpenfilterpopup] = useState(false);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const dispatch = useDispatch();
  const cancelled = "cancelled";
  const handleDateChange = (date) => {
    setValue(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const data = {
      clinicId: clinicId,
      currentPage: 1,
      limit: 10,
      date: formattedDate,
    };
    dispatch(getAppointmentList(data));
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
      dispatch(getClinicPatient({ clinicId, currentPage, limit, cancelled }));
    }
  }, [dispatch, clinicId, currentPage, limit]);

  const handleClose = () => {
    setOpenCreateAppointment(false);
  };
  const handleCloseNotifyPopup = () => {
    setOpenNotifyPopup(false);
  };

  const fileInputRef = useRef();

  const patientListData = useAppSelector(
    (state) => state?.clinic?.getClinicPatientData
  );

  useEffect(() => {
    const fetchPatients = async () => {
      setDataLoading(true);
      if (clinicId) {
        try {
          let actionResult;
          if (currentTab === "appointments/cancelled-appointment") {
            actionResult = await dispatch(
              getClinicPatient({
                clinicId,
                currentPage,
                limit,
                search: debouncedSearchInput,
                sort: "sort",
              })
            );
          }
          const { success } = unwrapResult(actionResult);
          if (success) {
            setDataLoading(false);
          }
        } catch (error) {
          // Handle the error if needed
          setDataLoading(false);
        }
      }
    };

    fetchPatients();
  }, [dispatch, debouncedSearchInput, clinicId, currentPage, limit]);

  console.log(currentTab);

  const totalPages = patientListData?.pagination?.total_pages;

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

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
              <span>Appointments</span>
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
                  {/* <div className={styles.close_icons}>
                    {isDarkTheme === "dark" ? (
                      <Image
                        className={styles.triangle_icon}
                        src={Images.triangle_icon}
                      ></Image>
                    ) : (
                      ""
                    )}
                  </div> */}

                  <div className={styles.search_calender}>
                    <Calendar onChange={handleDateChange} value={value} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* {loading ? (
            <div className={styles.spinner_patient_loader}>
              <SpinnerLoader />
            </div>
          ) : ( */}
          <div className={styles.card_container}>
            <div
              className={isDarkTheme === "dark" ? "card1 mx-4" : "card1  mx-4"}
            >
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className={styles.card_container_heading}>
                      <tr>
                        <th scope="col">S No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Number</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody
                      id="clinicListTable"
                      className={styles.card_container_data}
                    >
                      {patientListData?.data?.length > 0 ? (
                        patientListData?.data?.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item?.patient_name}</td>
                            <td> {formatPhoneNumber(item?.contact || "--")}</td>
                            <td>
                              {new Date(item?.createdAt || "--")
                                .toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                                .replace(/\//g, "/")}
                              &nbsp;
                              {new Date(item?.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                }
                              )}
                            </td>
                            <td>
                              {item?.lastAppointment?.appointment_status ||
                                "--"}
                            </td>
                            <td>
                              <div className={styles.action_text}>
                                <div className={styles.tooltip}>
                                  <Image src={Images.request_fee} alt="" />
                                  <span className={styles.tooltiptext}>
                                    Reschedule
                                  </span>
                                </div>
                                <div className={styles.tooltip}>
                                  <Image src={Images.Select_blueicon} alt="" />
                                  <span className={styles.tooltiptext}>
                                    Request fees
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* // )} */}
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

export default CancelAppointment;
