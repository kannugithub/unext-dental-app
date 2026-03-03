import React, { useEffect, useRef, useState } from "react";
import styles from "./OfficeStaff.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { fetchClinicsStaffList } from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import ConfirmationPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/ConfirmationPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";

const OfficeStaff = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [clinicStaffId, setClinicStaffId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const clinicStaffListData = useAppSelector(
    (state) => state.admin.clinicStaffList
  );
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(localStorage.getItem("theme"));
    }
  }, []);

  // // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  // const isDarkTheme = localStorage.getItem("theme");

  const getDeleteSingleClinicStaff = useAppSelector(
    (state) => state.admin.getDeleteSingleClinicStaff
  );
  const totalPages = clinicStaffListData?.pagination?.total_pages;

  console.log(clinicStaffListData, "clinicStaffListData");
  const dispatch = useDispatch();
  const fetched = useRef(false);

  const handleOpen = (id) => {
    setClinicStaffId(id);
    setDeletePopup(true);
  };
  const handleClose = () => setDeletePopup(false);

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

  useEffect(() => {
    // if (!fetched.current) {
    dispatch(fetchClinicsStaffList({ currentPage, limit }));
    // fetched.current = true;
    // }
  }, [dispatch, currentPage, limit, getDeleteSingleClinicStaff]);
  console.log(clinicStaffListData, "pahe");

  return (
    <>
      {deletePopup && (
        <RightCustomModal
          isOpen={deletePopup}
          onClose={handleClose}
          shouldCloseOnOutsideClick={true}
        >
          <ConfirmationPopup
            clinicStaffId={clinicStaffId}
            setDeletePopup={setDeletePopup}
            deleteType="deleteOfficeStaff"
          />
        </RightCustomModal>
      )}
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.dashboard_sub_conatiner}>
          <div className={styles.dashSub_blue}>
            <div className={styles.compo_name}>
              <span> Office Staff</span>
              <div className={styles.header_inp_box}>
                {isDarkTheme === "dark" ? (
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.457 10.4288C14.043 9.62721 14.3867 8.67612 14.3867 7.6537C14.3867 4.79705 11.7266 2.48047 8.44531 2.48047C5.16016 2.48047 2.5 4.79705 2.5 7.6537C2.5 10.5104 5.16016 12.8269 8.44141 12.8269C9.63281 12.8269 10.7422 12.5212 11.6719 11.9981L11.9414 11.8351L16.1836 15.524L17.5 14.3589L13.2617 10.67L13.457 10.4288ZM11.7734 4.76308C12.6602 5.53414 13.1484 6.55995 13.1484 7.65031C13.1484 8.74066 12.6602 9.76648 11.7734 10.5375C10.8867 11.3086 9.70703 11.7332 8.45312 11.7332C7.19922 11.7332 6.01953 11.3086 5.13281 10.5375C4.24609 9.76648 3.75781 8.74066 3.75781 7.65031C3.75781 6.55995 4.24609 5.53414 5.13281 4.76308C6.01953 3.99202 7.19922 3.56743 8.45312 3.56743C9.70703 3.56743 10.8867 3.99202 11.7734 4.76308Z"
                      fill="#409EEE"
                    />
                  </svg>
                ) : (
                  <Image src={Images.searchIcon} alt="search icon" />
                )}
                <input
                  type="text"
                  name=""
                  placeholder="Type Patient Name, Phone Number, Email, ID"
                />
              </div>
            </div>
            <div className={styles.subCompBtns}>
              <button>
                <Image src={Images.export_icon} alt="" />
                &nbsp; EXPORT
              </button>

              <Link href="/dashboard/add-office-staff">
                <button>
                  {" "}
                  <Image src={Images.plus_icon} alt="" />
                  &nbsp; ADD A OFFICE
                </button>
              </Link>
              <select name="" id="">
                <option value="">Active</option>
              </select>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={isDarkTheme === "dark" ? styles.card2 : "card  mx-4"}
            >
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className={styles.card_container_heading}>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Dental Office Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody
                      id="clinicListTable"
                      className={styles.card_container_data}
                    >
                      {clinicStaffListData?.data?.length > 0 ? (
                        clinicStaffListData.data.map((item, index) => (
                          <tr key={index}>
                            <td scope="row">
                              {(currentPage - 1) * 10 + index + 1}
                            </td>
                            <td>{item?.name}</td>
                            <td>{item?.email || "--"}</td>
                            <td>{item?.p_number || "--"}</td>
                            <td>
                              {item?.clinics?.length > 0
                                ? item?.clinics
                                    .map((clinic) => clinic.clinic_name)
                                    .join(", ")
                                : "--"}
                            </td>
                            <td>
                              <span className={styles.action_icons}>
                                <Link
                                  href={{
                                    pathname: "/dashboard/office-staff-details",
                                    query: { item: item?._id },
                                  }}
                                >
                                  {isDarkTheme === "dark" ? (
                                    <svg
                                      width="16"
                                      height="15"
                                      viewBox="0 0 16 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7.99998 3.99957C7.70558 4.00417 7.41335 4.05094 7.13221 4.13845C7.26225 4.36715 7.33149 4.62537 7.33332 4.88845C7.33332 5.09273 7.29308 5.29501 7.21491 5.48374C7.13673 5.67247 7.02215 5.84395 6.87771 5.9884C6.73326 6.13284 6.56178 6.24743 6.37305 6.3256C6.18432 6.40377 5.98204 6.44401 5.77776 6.44401C5.51468 6.44218 5.25646 6.37294 5.02776 6.2429C4.84733 6.86867 4.86836 7.53536 5.08787 8.14852C5.30739 8.76168 5.71426 9.29023 6.25086 9.6593C6.78746 10.0284 7.42659 10.2193 8.0777 10.2049C8.72881 10.1906 9.3589 9.97172 9.87873 9.57937C10.3986 9.18703 10.7818 8.64107 10.9741 8.01884C11.1664 7.39661 11.158 6.72964 10.9502 6.11242C10.7424 5.4952 10.3456 4.95901 9.81612 4.5798C9.28663 4.2006 8.65125 3.9976 7.99998 3.99957ZM15.9033 6.70512C14.3969 3.76595 11.4147 1.77734 7.99998 1.77734C4.58526 1.77734 1.60221 3.76734 0.0966515 6.7054C0.0331076 6.8311 0 6.96997 0 7.11082C0 7.25166 0.0331076 7.39054 0.0966515 7.51623C1.60304 10.4554 4.58526 12.444 7.99998 12.444C11.4147 12.444 14.3978 10.454 15.9033 7.51595C15.9669 7.39026 16 7.25138 16 7.11054C16 6.96969 15.9669 6.83082 15.9033 6.70512ZM7.99998 11.1107C5.25971 11.1107 2.74748 9.5829 1.39082 7.11068C2.74748 4.63845 5.25943 3.11068 7.99998 3.11068C10.7405 3.11068 13.2525 4.63845 14.6092 7.11068C13.2528 9.5829 10.7405 11.1107 7.99998 11.1107Z"
                                        fill="#F1B325"
                                      />
                                    </svg>
                                  ) : (
                                    <Image src={Images.eyeIcon} alt="" />
                                  )}
                                </Link>
                                <Link
                                  href={{
                                    pathname: "/dashboard/edit-staff-details",
                                    query: { item: item?._id },
                                  }}
                                >
                                  <Image src={Images.editIcon} alt="" />
                                </Link>
                                <Image
                                  className={styles.action_icons3}
                                  src={Images.deleteIcon}
                                  alt=""
                                  onClick={() => handleOpen(item?._id)}
                                />
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center" }}>
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {clinicStaffListData?.data?.length > 0 && (
                  <div className={styles.pagination}>
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
                    <button onClick={prevPage} disabled={currentPage === 1}>
                      {isDarkTheme === "dark" ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5 5L7.5 10L12.5 15"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <Image src={Images.paginationLefticon}></Image>
                      )}
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      {isDarkTheme === "dark" ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 15L12.5 10L7.5 5"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <Image src={Images.paginationRighticon}></Image>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficeStaff;
