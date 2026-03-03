import React, { useEffect, useState } from "react";
import styles from "../../../DashboardHeader/subContainer.module.scss";
import style from "./devices.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { fetchGetDevice } from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import SignoutDevice from "./SignoutDevice";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import DeviceLogoutPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/DeviceLogoutPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import SpinnerLoader from "@/app/Components/common/SpinnerLoader/SpinnerLoader";
import moment from "moment";

const Devices = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deviceLogoutData, setDeviceLogoutData] = useState(null);
  const [confirmLogut, setConfirmLogout] = useState(false);
  const dispatch = useDispatch();
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const getDeviceList = useAppSelector((state) => state.clinic.getDeviceList);
  const logoutDeviceData = useAppSelector(
    (state) => state.clinic.logoutDeviceData
  );
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const userId = userInfoData?.user?._id;

  useEffect(() => {
    setLoading(true);
    if (userInfoData) {
      dispatch(fetchGetDevice({ userId, currentPage, limit })).then(() => {
        setLoading(false);
      });
    }
  }, [userInfoData, currentPage, limit, logoutDeviceData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const totalPages = getDeviceList?.pagination?.total_pages;
  const clinics = getDeviceList?.data;

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

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleLogoutDevice = (item) => {
    setDeviceLogoutData(item);
    setConfirmLogout(true);
  };
  const handleClose = () => {
    setConfirmLogout(false);
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
              <span>Devices</span>
            </div>
          </div>
          {loading ? (
            <div className={styles.spinner_patient_loader}>
              <SpinnerLoader />
            </div>
          ) : (
            <div className={styles.card_container}>
              <div
                className={
                  isDarkTheme === "dark" ? "card1 mx-4" : "card1  mx-4"
                }
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className={styles.card_container_heading}>
                        <tr>
                          <th scope="col">S No.</th>
                          <th scope="col">Device Name</th>
                          <th scope="col">Device</th>
                          <th scope="col">IP Address</th>
                          <th scope="col">Last Active</th>
                          <th scope="col">Action Buttons</th>
                        </tr>
                      </thead>
                      <tbody
                        id="clinicListTable"
                        className={styles.card_container_data}
                      >
                        {getDeviceList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                              No data found
                            </td>
                          </tr>
                        ) : (
                          <>
                            {getDeviceList?.data?.map((item, index) => (
                              <tr key={index}>
                                <td scope="row">
                                  {(currentPage - 1) * 10 + index + 1}
                                </td>
                                <td>{item?.device_modal || "--"}</td>
                                <td>{item?.device_id || "--"}</td>
                                <td>{item?.ip_address || "--"}</td>
                                <td>
                                  {moment(item?.online)
                                    .local()
                                    .startOf("seconds")
                                    .fromNow()}
                                </td>
                                <td>
                                  <span
                                    className={style.device_action}
                                    onClick={() => handleLogoutDevice(item)}
                                  >
                                    <Image src={Images.switchOffIcon} alt="" />
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className={style.bottom_div}>
                    {getDeviceList?.data?.length > 0 && <SignoutDevice />}
                    {/* {getDeviceList?.data?.length > 0 && (
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
                              stroke-linecap="round"
                              stroke-linejoin="round"
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
                  )} */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {confirmLogut && (
        <RightCustomModal
          isOpen={confirmLogut}
          onClose={handleClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <DeviceLogoutPopup
            setConfirmLogout={setConfirmLogout}
            deviceLogoutData={deviceLogoutData}
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default Devices;
