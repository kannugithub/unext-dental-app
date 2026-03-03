import React, { useEffect, useState } from "react";
import styles from "../OfficeStaff/OfficeStaff.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  fetchAllUserData,
  fetchDemoRequestData,
} from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import ConfirmationPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/ConfirmationPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import moment from "moment";
import formatPhoneNumber from "@/app/Components/common/ChangeNumberFormate/formatPhoneNumber";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";

const DemoRequest = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openweek, setOpenweek] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const dispatch = useDispatch();
  const getDemoRequestlist = useAppSelector(
    (state) => state.admin.getDemoRequestData
  );
  const deleteUserData = useAppSelector((state) => state.admin.deleteUserData);
  const totalPages = getDemoRequestlist?.pagination?.total_pages;
  const users = getDemoRequestlist?.result;

  // useEffect(() => {
  //   dispatch(fetchDemoRequestData({ currentPage, limit }));
  // }, [dispatch, currentPage, limit]);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const data = await dispatch(
          fetchDemoRequestData({ currentPage, limit })
        );
        const { response } = unwrapResult(data);
        if (response) {
          setDataLoading(false);
        }
      } catch (error) {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, limit]);

  const handleOpen = (id) => {
    setUserId(id);
    setDeletePopup(true);
  };
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

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

  return (
    <>
      {deletePopup && (
        <RightCustomModal
          isOpen={deletePopup}
          onClose={handleClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <ConfirmationPopup
            userId={userId}
            setDeletePopup={setDeletePopup}
            deleteType="userDelete"
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
              <div className={styles.office_list_tag}> Demo Request</div>
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
                  isDarkTheme === "dark" ? styles.card2 : "card1  mx-4"
                }
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col">S.No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Scheduled Time</th>
                        </tr>
                      </thead>
                      <tbody
                        id="clinicListTable"
                        className={styles.card_container_data}
                      >
                        {users && users?.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No data found
                            </td>
                          </tr>
                        ) : (
                          users?.map((item, index) => (
                            <tr key={index}>
                              <td scope="row">
                                {(currentPage - 1) * 10 + index + 1}
                              </td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>
                                {formatPhoneNumber("+1" + item.phonenumber) ||
                                  "--"}{" "}
                              </td>
                              <td>
                                {moment(item?.createdAt).format(
                                  "DD MMMM YY, h:mm:ss A"
                                )}
                              </td>
                              <td>
                                {/* <span className={styles.action_icons}>
                                  {item?.role === " Clinic Admin" ? (
                                    <Link
                                      href={{
                                        pathname:
                                          "/dashboard/user-officeinfo_list",
                                        query: { item: item?._id },
                                      }}
                                    >
                                      <Image src={Images.user_home} alt="" />
                                    </Link>
                                  ) : (
                                    <div style={{ width: "12px" }}></div>
                                  )}
  
                                  <Link
                                    href={{
                                      pathname: "/dashboard/edit-user",
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
                                </span> */}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {users?.length === 10 && (
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
        {openweek && (
          <>
            <div
              className={
                isDarkTheme === "dark"
                  ? styles.darkHeader2
                  : styles.lightHeader2
              }
            >
              <div className={styles.appointment_list_control}>Super Admin</div>
              <hr></hr>

              <div className={styles.appointment_list_control}>Admin</div>
              <hr></hr>
              <div className={styles.appointment_list_control}>
                Office owner
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DemoRequest;
