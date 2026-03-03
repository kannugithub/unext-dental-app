import React, { useEffect, useRef, useState } from "react";
import styles from "./patients.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/store/lib/hooks";
import {
  fetchPatientList,
  fetchSingleClinic,
} from "@/app/store/slices/superAdminSlices";
import moment from "moment";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import ViewSinglePatientDetails from "./ViewSinglePatientDetails/ViewSinglePatientDetails";
import {
  SendrequestPaymentLink,
  getClinicPatient,
  importPatientCsv,
  sendMessages,
} from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";
import { unparse } from "papaparse";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import DeletePatient from "./DeletePatient/DeletePatient";
import { useSelector } from "react-redux";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import { ArrowBack } from "@mui/icons-material";
import { unwrapResult } from "@reduxjs/toolkit";

const Patients = ({ changeTab, currentTab }) => {
  const [openSinglePatient, setOpenSinglePatient] = useState(false);
  const [singlePatientId, setSinglePatientId] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useAppDispatch();
  // const patientListData = useAppSelector(
  //   (state) => state?.admin?.patientListData
  // );
  const cancelled = "";
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState(null);
  const [deletePatientPopup, setDeletePatientPopup] = useState(false);
  const [openfilterpopup, setOpenfilterpopup] = useState(false);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const fileInputRef = useRef();
  const patientListData = useAppSelector(
    (state) => state?.clinic?.getClinicPatientData
  );

  const getDeletePatientData = useAppSelector(
    (state) => state?.admin?.getDeletePatientData
  );

  const employee_id = useAppSelector(
    (state) => state.authWeb.userInfo?.user?._id
  );

  const clinicNumber = useAppSelector(
    (state) => state.admin.singleClinicData?.data?.clinic_phone
  );

  console.log(clinicNumber, "clinicNumber");

  const clinic_name = useAppSelector(
    (state) => state.admin.singleClinicData?.data?.clinic_name
  );

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

  useEffect(() => {
    if (clinicId) {
      dispatch(fetchSingleClinic(clinicId));
    }
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      setDataLoading(true);
      if (clinicId) {
        try {
          let actionResult;
          if (debouncedSearchInput) {
            actionResult = await dispatch(
              getClinicPatient({
                clinicId,
                limit,
                currentPage,
                search: debouncedSearchInput,
                cancelled,
              })
            );
          } else {
            if (currentTab === "patients/new-patients") {
              actionResult = await dispatch(
                getClinicPatient({
                  clinicId,
                  currentPage,
                  limit,
                  search: debouncedSearchInput,
                  newpatient: "newpatient",
                  cancelled,
                })
              );
            } else if (
              currentTab === "patients/due-balance" ||
              currentTab === "patients/overdue"
            ) {
              actionResult = await dispatch(
                getClinicPatient({
                  clinicId,
                  currentPage,
                  limit,
                  negativeBalance: true,
                  search: debouncedSearchInput,
                  cancelled,
                })
              );
            } else if (currentTab === "patients/re-calls") {
              actionResult = await dispatch(
                getClinicPatient({
                  clinicId,
                  currentPage,
                  limit,
                  search: debouncedSearchInput,
                  recalls: true,
                })
              );
            } else {
              actionResult = await dispatch(
                getClinicPatient({
                  clinicId,
                  currentPage,
                  limit,
                  search: debouncedSearchInput,
                  cancelled,
                })
              );
            }
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
  }, [
    clinicId,
    debouncedSearchInput,
    currentTab,
    currentPage,
    limit,
    cancelled,
    getDeletePatientData,
    dispatch,
  ]);

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

  // search patient functionality
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  const handleOpenSinglePatient = (id) => {
    setSinglePatientId(id);
    setOpenSinglePatient(true);
  };

  const handleImportButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
    await handleImportPatientCsv(event.target.files[0]);
  };

  const handleClose = () => {
    setOpenSinglePatient(false);
    setDeletePatientPopup(false);
  };

  const handleImportPatientCsv = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const actionResult = await dispatch(importPatientCsv(formData));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
      }
    } catch (error) {
      toast.error("An error occurred while importing the file.");
    }
  };

  const handleExportButtonClick = async () => {
    try {
      const actionResult = await dispatch(getClinicPatient({ clinicId }));
      const { data } = actionResult.payload;
      const csv = unparse(data);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      console.log("URL:", url);
      const link = document.createElement("a");
      link.href = url;
      link.download = "patient_list.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("An error occurred while exporting the data.");
      console.error("Export error:", error);
    }
  };

  const handleOpen = (id) => {
    setDeletePatientId(id);
    setDeletePatientPopup(true);
  };

  const handlePatientTab = (item) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("patient-id", item?._id);
    }
    changeTab("edit-patient", item?._id);
  };

  const handleRequestbalance = async (_id, email, contact, balance) => {
    const data = {
      patient_number: contact,
      patientId: _id,
      email: email,
      amount: balance,
      pay: balance,
      employee_id: employee_id,
    };

    try {
      const actionResult = await dispatch(SendrequestPaymentLink(data));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSendTextSms = async (contact, patient_name) => {
    const MessageText = `Dear ${patient_name},This is a friendly reminder to complete your payment for the recent services. Please make the payment at your earliest convenience.Thank you! Best regards,${clinic_name}`;

    console.log(MessageText, "MessageText");

    const data = {
      to: contact,
      from: clinicNumber,
      message: MessageText,
    };

    try {
      const actionResult = await dispatch(sendMessages(data));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

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
              <div className={styles.compo_name_text}>
                <span>
                  {(currentTab === "patients/new-patients" && "New Patients") ||
                    (currentTab === "patients/due-balance" && "Due Balance") ||
                    (currentTab === "patients/re-calls" && "Re Calls") ||
                    (currentTab === "patients/overdue" && "Overdue") ||
                    (currentTab === "patients/all-patients" && "Patient List")}
                </span>
              </div>
              <div className={styles.header_inp_box}>
                <Image src={Images.blue_search} alt="search icon" />

                <input
                  type="text"
                  name=""
                  placeholder="Type Patient Name, Phone Number, Email, ID"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className={styles.subCompBtns}>
              <button onClick={handleExportButtonClick}>
                <Image src={Images.export_icon} alt="" />
                &nbsp; EXPORT
              </button>
              <div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                <button onClick={handleImportButtonClick}>
                  <Image src={Images.import_icon} alt="" />
                  &nbsp; IMPORT
                </button>
              </div>
              {/* <Link href="/dashboard/add-patient"> */}
              <button onClick={() => changeTab("add-patient")}>
                <Image src={Images.plus_icon} alt="" />
                &nbsp; ADD PATIENT
              </button>
              {/* </Link> */}

              {/* <button onClick={() => setOpenfilterpopup(!openfilterpopup)}>
                <Image src={Images.filter_icon} alt="" />
                &nbsp; Filter
              </button> */}
            </div>
          </div>
          {dataLoading ? (
            <div className={styles.spinner_patient_loader}>
              <SpinnerLoader />
            </div>
          ) : (
            <div className={styles.card_container}>
              <div
                className={
                  isDarkTheme === "dark" ? styles.card2 : styles.card_light
                }
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col">Patient Id</th>
                          <th scope="col">Patient Name</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Email ID</th>
                          <th scope="col">Date of Birth</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Balance</th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        id="clinicListTable"
                        className={styles.card_container_data}
                      >
                        {patientListData?.data?.length > 0 ? (
                          patientListData?.data?.map((item, index) => (
                            <tr key={item._id}>
                              <td>{item?.patientId || "--"}</td>
                              <td>{item?.patient_name}</td>
                              <td>
                                {" "}
                                {formatPhoneNumber(item?.contact || "--")}
                              </td>
                              <td>{item?.email || "--"}</td>
                              <td>
                                {new Date(item?.dob || "--")
                                  .toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  })
                                  .replace(/\//g, "/")}{" "}
                              </td>
                              <td>{item?.gender || "--"} </td>
                              <td
                                style={
                                  currentTab === "patients/due-balance" ||
                                  currentTab === "overdue"
                                    ? { color: "#FF3232" }
                                    : {}
                                }
                              >
                                {item?.balance === null ||
                                item?.balance === "" ||
                                item?.balance === "null"
                                  ? "$0"
                                  : item?.balance.includes("$")
                                  ? item?.balance
                                  : `$${item?.balance}`}
                              </td>

                              <td style={{ textAlign: "center" }}>
                                <div className={styles.action_icons}>
                                  <div className={styles.tooltip}>
                                    {currentTab === "patients/due-balance" ? (
                                      <Image
                                        src={Images.Request_balance}
                                        alt="payment"
                                        onClick={() =>
                                          handleRequestbalance(
                                            item?._id,
                                            item?.email,
                                            item?.contact,
                                            item?.balance
                                          )
                                        }
                                      />
                                    ) : (
                                      ""
                                    )}

                                    <span className={styles.tooltiptext}>
                                      Request Balance
                                    </span>
                                  </div>

                                  <div className={styles.tooltip}>
                                    {currentTab === "patients/due-balance" ? (
                                      <Image
                                        src={Images.payment_icon}
                                        alt="payment"
                                        onClick={() =>
                                          handleSendTextSms(
                                            item?.contact,
                                            item.patient_name
                                          )
                                        }
                                      />
                                    ) : (
                                      ""
                                    )}

                                    <span className={styles.tooltiptext}>
                                      Payment Reminder
                                    </span>
                                  </div>
                                  {isDarkTheme === "dark" ? (
                                    <svg
                                      width="16"
                                      height="15"
                                      viewBox="0 0 16 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      onClick={() =>
                                        handleOpenSinglePatient(item?._id)
                                      }
                                    >
                                      <path
                                        d="M7.99998 3.99957C7.70558 4.00417 7.41335 4.05094 7.13221 4.13845C7.26225 4.36715 7.33149 4.62537 7.33332 4.88845C7.33332 5.09273 7.29308 5.29501 7.21491 5.48374C7.13673 5.67247 7.02215 5.84395 6.87771 5.9884C6.73326 6.13284 6.56178 6.24743 6.37305 6.3256C6.18432 6.40377 5.98204 6.44401 5.77776 6.44401C5.51468 6.44218 5.25646 6.37294 5.02776 6.2429C4.84733 6.86867 4.86836 7.53536 5.08787 8.14852C5.30739 8.76168 5.71426 9.29023 6.25086 9.6593C6.78746 10.0284 7.42659 10.2193 8.0777 10.2049C8.72881 10.1906 9.3589 9.97172 9.87873 9.57937C10.3986 9.18703 10.7818 8.64107 10.9741 8.01884C11.1664 7.39661 11.158 6.72964 10.9502 6.11242C10.7424 5.4952 10.3456 4.95901 9.81612 4.5798C9.28663 4.2006 8.65125 3.9976 7.99998 3.99957ZM15.9033 6.70512C14.3969 3.76595 11.4147 1.77734 7.99998 1.77734C4.58526 1.77734 1.60221 3.76734 0.0966515 6.7054C0.0331076 6.8311 0 6.96997 0 7.11082C0 7.25166 0.0331076 7.39054 0.0966515 7.51623C1.60304 10.4554 4.58526 12.444 7.99998 12.444C11.4147 12.444 14.3978 10.454 15.9033 7.51595C15.9669 7.39026 16 7.25138 16 7.11054C16 6.96969 15.9669 6.83082 15.9033 6.70512ZM7.99998 11.1107C5.25971 11.1107 2.74748 9.5829 1.39082 7.11068C2.74748 4.63845 5.25943 3.11068 7.99998 3.11068C10.7405 3.11068 13.2525 4.63845 14.6092 7.11068C13.2528 9.5829 10.7405 11.1107 7.99998 11.1107Z"
                                        fill="#F1B325"
                                      />
                                    </svg>
                                  ) : (
                                    <Image
                                      src={Images.eyeIcon}
                                      onClick={() =>
                                        handleOpenSinglePatient(item?._id)
                                      }
                                      alt=""
                                    />
                                  )}

                                  {/* <Link
                                    href={{
                                      pathname: " ",
                                      query: { item: item?._id },
                                    }}
                                  > */}
                                  {currentTab === "patients/re-calls" ||
                                  currentTab === "patients/due-balance" ||
                                  currentTab === "patients/overdue" ? null : (
                                    <Image
                                      src={Images.editIcon}
                                      alt="Edit Icon"
                                      onClick={() => handlePatientTab(item)}
                                    />
                                  )}

                                  <Image
                                    className={styles.action_icons3}
                                    src={Images.deleteIcon}
                                    alt=""
                                    onClick={() => handleOpen(item?._id)}
                                  />
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

                  {patientListData?.data?.length > 0 && (
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
          )}
        </div>
        {openfilterpopup && (
          <>
            <div className={styles.darkHeader2}>
              <div className={styles.appointment_list_control}>
                All Patients
              </div>
              <div className={styles.appointment_list_control}>
                New Patients
              </div>
              <div className={styles.appointment_list_control}>Re-Calls</div>
              <div className={styles.appointment_list_control}>Due Balance</div>
              <div className={styles.appointment_list_control}>Overdue</div>
            </div>
          </>
        )}
      </div>

      {deletePatientPopup && (
        <DeletePatient
          deletePatientId={deletePatientId}
          setDeletePatientPopup={setDeletePatientPopup}
        />
      )}
      {openSinglePatient && (
        <RightCustomModal
          isOpen={openSinglePatient}
          onClose={handleClose}
          width="50w"
          shouldCloseOnOutsideClick={true}
        >
          <ViewSinglePatientDetails
            setOpenSinglePatient={setOpenSinglePatient}
            singlePatientId={singlePatientId}
            handleClose={handleClose}
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default Patients;
