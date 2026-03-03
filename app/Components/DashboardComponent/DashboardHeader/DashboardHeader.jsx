import React, { useEffect, useRef, useState } from "react";
import styles from "./dashBoardHeader.module.scss";
import Image from "next/image";
import Images from "../../Images/Images";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import {
  changeClinic,
  fetchClinicsStaffList,
  fetchSingleClinic,
  getClinicsDetails,
} from "@/app/store/slices/superAdminSlices";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import Dropdown from "../../common/dropdown/Dropdown";
import dropdownIcon from "../../../assets/icons/yellowDropDown.svg";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import ThemeToggle from "@/app/ThemeToggle";
import NotificationPopup from "./NotificationPopup";
import CustomModal from "../../PopupsComponents/Modal";
import Position from "rsuite/esm/Overlay/Position";
import { Link } from "react-scroll";
import { images } from "@/next.config";
import RightCustomModal from "../../PopupsComponents/RightModal";
import DoubleArrow from "@/app/assets/svgComponent/DoubleArrow";
import { setConnectedClinicId } from "@/app/store/slices/clinicAdminSlices";
import SubscriptionPopup from "../AllDashboardComponents/clinicDashboard/myDentalOffice/SubsriptonOfficePopup/SubscriptionPopup";

const DashboardHeader = ({
  toggleSidebar,
  changeTab,
  handleLogout,
  expandedMenu,
  setExpandedMenu,
  currentStep,
  isOpenProgress,
}) => {
  const [values, setValues] = useState();
  const [openDrop, setOpenDrop] = useState(false);
  const [openDrop2, setOpenDrop2] = useState(false);
  const [openbell, setOpenbell] = useState(false);
  const [openprofile, setOpenprofile] = useState(false);
  const [openlogout, setOpenlogout] = useState(false);

  const [updatePopup, setUpdatePopup] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const openDropRef = useRef();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const popupRefs = useRef(null);
  const buttonRef = useRef(null);
  const DropdownpopupRef = useRef(null);
  const DropdownpbuttonRef = useRef(null);
  const [incompleteProfile, setIncompleteProfile] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const data = useAppSelector((state) => state.admin.getClinicsDetailsData);
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );

  let clinicid;
  try {
    clinicid = localStorage?.getItem("clinicId");
  } catch (err) {
    clinicid = "default value";
  }

  const defaultClinicName = userInfoData?.user?.clinics?.[0]?.clinic_name;
  const dropdownRef = useRef(null);

  const handleUpdateClose = () => setUpdatePopup(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (updatePopup) {
        return false;
      } else {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setOpenDrop2(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updatePopup]);

  useEffect(() => {
    let clinicId = localStorage.getItem("clinicId");
    if (!clinicId) {
      const defaultClinicId = userInfoData?.user?.clinics?.[0]?._id;
      if (defaultClinicId) {
        dispatch(setConnectedClinicId(defaultClinicId));
      }
    }
    if (clinicId) {
      setValues((prevValues) => ({
        ...prevValues,
        clinics: clinicId,
      }));
    }
    const clinic = userInfoData?.user?.clinics.find(
      (clinic) => clinic?._id === clinicId
    );
    setIncompleteProfile(clinic);
  }, [userInfoData, clinicid]);

  useEffect(() => {
    if (clinicid) {
      dispatch(fetchSingleClinic(clinicid));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        DropdownpopupRef.current &&
        !DropdownpopupRef.current.contains(event.target) &&
        DropdownpbuttonRef.current &&
        !DropdownpbuttonRef.current.contains(event.target)
      ) {
        setOpenlogout(false);
      }
    };

    if (openlogout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openlogout]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRefs.current &&
        !popupRefs.current.contains(event.target) &&
        popupRefs.current &&
        !popupRefs.current.contains(event.target)
      ) {
        setOpenprofile(false);
      }
    };
    if (openprofile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openprofile]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handlebellClose = () => {
    setOpenbell(false);
  };

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const openClinics = () => {
    setOpenDrop2(true);
  };

  const closeClinics = () => {
    setOpenDrop2(false);
  };

  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  }

  let userName = userInfoData?.user?.name;
  let color = stringToColor(userName);

  const userSettingClick = () => {
    changeTab("user-setting");
    setExpandedMenu(null);
  };
  const securityClick = () => {
    changeTab("security");
    setExpandedMenu(null);
  };

  const devicesClick = () => {
    changeTab("devices");
    setExpandedMenu(null);
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div
          ref={openDropRef}
          className={styles.dashboard_header}
          style={
            isDarkTheme === "dark"
              ? userInfoData?.user?.role === "Clinic Admin"
                ? { background: "rgba(25, 25, 27, 1)" }
                : { background: " rgba(25, 25, 27, 1)" }
              : userInfoData?.user?.role === "Clinic Admin"
              ? { background: "#fff" }
              : { background: "#fff" }
          }
        >
          <div className={styles.resp_menu}>
            <div className={styles.menu_icons} onClick={toggleSidebar}>
              {isDarkTheme === "dark" ? (
                <Image src={Images.sidebar_menu} alt="" />
              ) : (
                <svg
                  fill="none"
                  height="32"
                  viewBox="0 0 24 24"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                  />
                </svg>
              )}{" "}
            </div>
            <div
              className={`${styles.header_inp} ${
                incompleteProfile?.profile_completion === false ||
                isOpenProgress === true
                  ? styles.header_empty_inp
                  : ""
              }`}
            >
              {userInfoData?.user?.role === "Clinic Admin" ? (
                <>
                  {isDarkTheme === "dark" ? (
                    <Image
                      src={Images.MobileHeader}
                      alt=""
                      width="20"
                      height="20"
                    />
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 26 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.3036 27.2426H24.1429V1.36213C24.1429 0.609838 23.5193 0 22.75 0H3.25C2.48074 0 1.85714 0.609838 1.85714 1.36213V27.2426H0.696429C0.311826 27.2426 0 27.5476 0 27.9237V29.0588H26V27.9237C26 27.5476 25.6882 27.2426 25.3036 27.2426ZM7.42857 4.31342C7.42857 3.9373 7.7404 3.63235 8.125 3.63235H10.4464C10.831 3.63235 11.1429 3.9373 11.1429 4.31342V6.58364C11.1429 6.95976 10.831 7.26471 10.4464 7.26471H8.125C7.7404 7.26471 7.42857 6.95976 7.42857 6.58364V4.31342ZM7.42857 9.76195C7.42857 9.38583 7.7404 9.08088 8.125 9.08088H10.4464C10.831 9.08088 11.1429 9.38583 11.1429 9.76195V12.0322C11.1429 12.4083 10.831 12.7132 10.4464 12.7132H8.125C7.7404 12.7132 7.42857 12.4083 7.42857 12.0322V9.76195ZM10.4464 18.1618H8.125C7.7404 18.1618 7.42857 17.8568 7.42857 17.4807V15.2105C7.42857 14.8344 7.7404 14.5294 8.125 14.5294H10.4464C10.831 14.5294 11.1429 14.8344 11.1429 15.2105V17.4807C11.1429 17.8568 10.831 18.1618 10.4464 18.1618ZM14.8571 27.2426H11.1429V22.4752C11.1429 22.0991 11.4547 21.7941 11.8393 21.7941H14.1607C14.5453 21.7941 14.8571 22.0991 14.8571 22.4752V27.2426ZM18.5714 17.4807C18.5714 17.8568 18.2596 18.1618 17.875 18.1618H15.5536C15.169 18.1618 14.8571 17.8568 14.8571 17.4807V15.2105C14.8571 14.8344 15.169 14.5294 15.5536 14.5294H17.875C18.2596 14.5294 18.5714 14.8344 18.5714 15.2105V17.4807ZM18.5714 12.0322C18.5714 12.4083 18.2596 12.7132 17.875 12.7132H15.5536C15.169 12.7132 14.8571 12.4083 14.8571 12.0322V9.76195C14.8571 9.38583 15.169 9.08088 15.5536 9.08088H17.875C18.2596 9.08088 18.5714 9.38583 18.5714 9.76195V12.0322ZM18.5714 6.58364C18.5714 6.95976 18.2596 7.26471 17.875 7.26471H15.5536C15.169 7.26471 14.8571 6.95976 14.8571 6.58364V4.31342C14.8571 3.9373 15.169 3.63235 15.5536 3.63235H17.875C18.2596 3.63235 18.5714 3.9373 18.5714 4.31342V6.58364Z"
                        fill="black"
                      />
                    </svg>
                  )}
                  {!openDrop2 ? (
                    <div
                      className={styles.user_dental}
                      onClick={openClinics}
                      style={{ textTransform: "capitalize" }}
                    >
                      {singleClinicData?.data?.clinic_name === undefined
                        ? defaultClinicName
                        : singleClinicData?.data?.clinic_name}

                      <div className={styles.doubelarrow}>
                        <DoubleArrow />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles.user_dental}
                      ref={buttonRef}
                      onClick={closeClinics}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      <p>
                        {singleClinicData?.data?.clinic_name === undefined
                          ? defaultClinicName
                          : singleClinicData?.data?.clinic_name}
                      </p>
                      <div className={styles.doubelarrow}>
                        <DoubleArrow />
                      </div>
                    </div>
                  )}
                  <div ref={dropdownRef}>
                    {openDrop2 ? (
                      <Dropdown
                        ref={dropdownRef}
                        // setOpenDrop={setOpenDrop}
                        updatePopup={updatePopup}
                        setUpdatePopup={setUpdatePopup}
                        // ref={openDropRef}
                        changeTab={changeTab}
                        setOpenDrop2={setOpenDrop2}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {updatePopup && (
                    <RightCustomModal
                      isOpen={updatePopup}
                      onClose={handleUpdateClose}
                      width="50w"
                      shouldCloseOnOutsideClick={true}
                    >
                      <SubscriptionPopup
                        clinicId={clinicid}
                        setUpdatePopup={setUpdatePopup}
                      />
                    </RightCustomModal>
                  )}
                </>
              ) : (
                <div className={styles.user_dental}></div>
              )}
            </div>
            {/* )} */}
          </div>

          <div className={styles.bell_user}>
            <ThemeToggle isOpenProgress={isOpenProgress} />
            <div>
              {isDarkTheme === "dark" ? (
                <Image
                  style={{ cursor: "pointer" }}
                  src={Images.bellIcon}
                  alt="bell icon"
                  onClick={() => setOpenbell(!openbell)}
                />
              ) : (
                <Image
                  style={{ cursor: "pointer" }}
                  src={Images.bellIcon_black}
                  alt="bell icon"
                  onClick={() => setOpenbell(!openbell)}
                />
              )}
            </div>

            <div className={styles.admin_user}>
              <div
                style={{
                  borderRadius: "100px",
                  width: "40px",
                  height: "40px",
                  backgroundColor: userInfoData?.user?.profile_pic
                    ? "transparent"
                    : color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {userInfoData?.user?.profile_pic ? (
                  <Image
                    style={{ borderRadius: "100px" }}
                    src={userInfoData?.user?.profile_pic}
                    width={40}
                    height={40}
                    alt="user icon"
                  />
                ) : (
                  <div style={{ color: "white", fontSize: "20px" }}>
                    {userInfoData?.user?.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                <div
                  className={styles.user_name}
                  ref={DropdownpbuttonRef}
                  onClick={() => {
                    if (userInfoData?.user?.role === "Clinic Admin") {
                      setOpenlogout(!openlogout);
                    } else {
                      setOpenprofile(!openprofile);
                    }
                  }}
                >
                  <span>{userInfoData?.user?.name}</span>
                  {isDarkTheme === "dark" ? (
                    openlogout || openprofile ? (
                      <Image src={Images.downpopupdark} alt="" />
                    ) : (
                      <Image src={Images.dropdownWhite} />
                    )
                  ) : openlogout || openprofile ? (
                    <Image src={Images.downpopuplight} alt="" />
                  ) : (
                    <Image src={Images.dropdown_black} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {openbell && (
          <RightCustomModal
            isOpen={openbell}
            onClose={handlebellClose}
            width="30w"
            shouldCloseOnOutsideClick={true}
          >
            <NotificationPopup setOpenbell={setOpenbell} />
          </RightCustomModal>
        )}

        {openprofile && (
          <>
            <div
              ref={popupRefs}
              className={
                isDarkTheme === "dark" ? styles.darkHeader2 : styles.darkHeader2
              }
            >
              <div className={styles.user_profile}>
                <div className="col-md-2">
                  <div
                    style={{
                      borderRadius: "100px",
                      width: "36px",
                      height: "36px",
                      backgroundColor: userInfoData?.user?.profile_pic
                        ? "transparent"
                        : color,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {userInfoData?.user?.profile_pic ? (
                      <Image
                        style={{ borderRadius: "100px" }}
                        src={userInfoData?.user?.profile_pic}
                        width={36}
                        height={36}
                        alt="user icon"
                      />
                    ) : (
                      <div style={{ color: "white", fontSize: "20px" }}>
                        {userInfoData?.user?.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-10">
                  <h5>{userInfoData?.user?.name}</h5>
                  <span className={styles.appointment_list_control1}>
                    {userInfoData?.user?.email}
                  </span>
                </div>
              </div>
              <div className="col-md-12">
                <div
                  className={styles.appointment_list_control}
                  onClick={userSettingClick}
                >
                  <span>
                    {" "}
                    {isDarkTheme === "dark" ? (
                      <Image src={Images.usersetting_dark}></Image>
                    ) : (
                      <Image src={Images.usersetting_light}></Image>
                    )}
                    &nbsp;&nbsp;Profile Setting
                  </span>
                </div>
                <div
                  className={styles.appointment_list_control}
                  onClick={() => handleLogout()}
                >
                  <span>
                    {isDarkTheme === "dark" ? (
                      <Image src={Images.logout_dark}></Image>
                    ) : (
                      <Image src={Images.logout_light}></Image>
                    )}
                    &nbsp;&nbsp; Log out
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {openlogout && (
          <div
            ref={DropdownpopupRef}
            className={
              isDarkTheme === "dark" ? styles.darkHeader2 : styles.darkHeader2
            }
          >
            <div className={styles.user_profile}>
              <div className="col-md-2">
                <div
                  style={{
                    borderRadius: "100px",
                    width: "36px",
                    height: "36px",
                    backgroundColor: userInfoData?.user?.profile_pic
                      ? "transparent"
                      : color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {userInfoData?.user?.profile_pic ? (
                    <Image
                      style={{ borderRadius: "100px" }}
                      src={userInfoData?.user?.profile_pic}
                      width={36}
                      height={36}
                      alt="user icon"
                    />
                  ) : (
                    <div style={{ color: "white", fontSize: "20px" }}>
                      {userInfoData?.user?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-10">
                <h5>{userInfoData?.user?.name}</h5>
                <span className={styles.appointment_list_control1}>
                  {userInfoData?.user?.email}
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div
                className={styles.appointment_list_control}
                onClick={devicesClick}
              >
                <span>
                  {isDarkTheme === "dark" ? (
                    <Image src={Images.Device_dark}></Image>
                  ) : (
                    <Image src={Images.Device_light}></Image>
                  )}
                  &nbsp;&nbsp; Devices
                </span>
              </div>

              <div
                className={styles.appointment_list_control}
                onClick={userSettingClick}
              >
                <span>
                  {" "}
                  {isDarkTheme === "dark" ? (
                    <Image src={Images.usersetting_dark}></Image>
                  ) : (
                    <Image src={Images.usersetting_light}></Image>
                  )}
                  &nbsp;&nbsp;Profile Setting
                </span>
              </div>

              <div
                className={styles.appointment_list_control}
                onClick={securityClick}
              >
                <span>
                  {isDarkTheme === "dark" ? (
                    <Image src={Images.security_dark}></Image>
                  ) : (
                    <Image src={Images.security_light}></Image>
                  )}
                  &nbsp;&nbsp; Security
                </span>
              </div>
              <div
                className={styles.appointment_list_control}
                onClick={() => handleLogout()}
              >
                <span>
                  {isDarkTheme === "dark" ? (
                    <Image src={Images.logout_dark}></Image>
                  ) : (
                    <Image src={Images.logout_light}></Image>
                  )}
                  &nbsp;&nbsp; Log out
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHeader;
