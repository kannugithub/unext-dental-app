"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Sidebar from "./SidebarComponent/Sidebar";
import styles from "./mainDashboard.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import DashboardSubContainer from "./DashboardHeader/DashboardSubContainer";
import Staff from "./AllDashboardComponents/Staff";
import ClinicStaff from "./AllDashboardComponents/clinicDashboard/ClinicStaff";
import ClinicExtension from "./AllDashboardComponents/clinicDashboard/ClinicExtension/ClinicExtension";

import Devices from "./AllDashboardComponents/clinicDashboard/Devices/Devices";
import CallForward from "./AllDashboardComponents/clinicDashboard/CallForward/CallForward";
import Voicemail from "./AllDashboardComponents/clinicDashboard/Voicemail/Voicemail";
import RingGroup from "./AllDashboardComponents/clinicDashboard/RingGroup/RingGroup";
import Billing from "./AllDashboardComponents/clinicDashboard/Billing/Billing";
import OfficeSetting from "./AllDashboardComponents/clinicDashboard/OfficeSetting/OfficeSetting";
import OfficeStaff from "./AllDashboardComponents/SuperAdminDashboard/OfficeStaff/OfficeStaff";
import AdminOffice from "./AllDashboardComponents/SuperAdminDashboard/AdminOffice/AdminOffice";
import Patients from "./AllDashboardComponents/SuperAdminDashboard/Patients/Patients";
import UsersList from "./AllDashboardComponents/SuperAdminDashboard/Users/UsersList";
import Transaction from "./AllDashboardComponents/SuperAdminDashboard/Transactions/Transaction";
import AddOffice from "./AllDashboardComponents/SuperAdminDashboard/AdminOffice/AddOffice/AddOffice";
import AddPatient from "./AllDashboardComponents/SuperAdminDashboard/Patients/AddPatient/AddPatient";
import AddStaff from "./AllDashboardComponents/SuperAdminDashboard/OfficeStaff/AddStaff/AddStaff";
import AddUser from "./AllDashboardComponents/SuperAdminDashboard/Users/AddUser/AddUser";
import AdminDashboard from "./AllDashboardComponents/SuperAdminDashboard/AdminDashboard/AdminDashboard";
import Profile from "./AllDashboardComponents/SuperAdminDashboard/Profile/Profile";
import Link from "next/link";
import SingleClinicDetails from "./AllDashboardComponents/SuperAdminDashboard/AdminOffice/viewClinicDetails/SingleClinicDetails";
import EditOffice from "./AllDashboardComponents/SuperAdminDashboard/AdminOffice/EditOffice/EditOffice";
import SinglePatientDetails from "./AllDashboardComponents/SuperAdminDashboard/Patients/SinglePatientDetails/SinglePatientDetails";
import SingleOfficeStaff from "./AllDashboardComponents/SuperAdminDashboard/OfficeStaff/SingleOfficeStaff/SingleOfficeStaff";
import EditStaff from "./AllDashboardComponents/SuperAdminDashboard/OfficeStaff/EditStaff/EditStaff";
import { useAppSelector } from "@/app/store/lib/hooks";
import EditUser from "./AllDashboardComponents/SuperAdminDashboard/Users/EditUser/EditUser";
import SingleUserDetails from "./AllDashboardComponents/SuperAdminDashboard/Users/SingleUserDetails/SingleUserDetails";
import AdminAddStaff from "./AllDashboardComponents/clinicDashboard/staffs/adminAddStaff/AdminAddStaff";
import AdminEditStaff from "./AllDashboardComponents/clinicDashboard/staffs/adminEditStaff/AdminEditStaff";
import ViewAdminStaffDetails from "./AllDashboardComponents/clinicDashboard/staffs/viewAdminStaffDetails/ViewAdminStaffDetails";
import Messages from "./AllDashboardComponents/clinicDashboard/Messages";
import { useDispatch } from "react-redux";
import { webLogout } from "@/app/store/slices/authSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MyDentalOffice from "./AllDashboardComponents/clinicDashboard/myDentalOffice/MyDentalOffice";
import ViewDentalOfficeDetails from "./AllDashboardComponents/clinicDashboard/myDentalOffice/ViewDentalOfficeDetails";
import CouponList from "./AllDashboardComponents/CommonComponent/CouponCrud/CouponList/CouponList";
import Ticket from "./AllDashboardComponents/SuperAdminDashboard/Support/Ticket/Ticket";
import Report from "./AllDashboardComponents/SuperAdminDashboard/Support/Report/Report";
import RequestFeature from "./AllDashboardComponents/SuperAdminDashboard/Support/Request_Feature/RequestFeature";
import AddCoupon from "./AllDashboardComponents/CommonComponent/CouponCrud/AddCoupon/AddCoupon";
import EditCoupon from "./AllDashboardComponents/CommonComponent/CouponCrud/EditCoupon/EditCoupon";
import DashboardClinicContainer from "./DashboardHeader/DashboardClinicContainer";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import Appointments from "./AllDashboardComponents/clinicDashboard/Appointments/Appointments";
import CustomModal from "../PopupsComponents/Modal";
import LogoutPopup from "./LogoutPopup";
import DemoRequest from "./AllDashboardComponents/SuperAdminDashboard/Request_demo/DemoRequest";
import MonthlyPlan from "./AllDashboardComponents/clinicDashboard/Billing/MonthlyPlan/MonthlyPlan";
import TransactionHistory from "./AllDashboardComponents/clinicDashboard/Billing/TransactionHistory/TransactionHistory";
import PaymentMethods from "./AllDashboardComponents/clinicDashboard/Billing/PaymentMethods/PaymentMethods";
import UserInfoOfficeList from "./AllDashboardComponents/SuperAdminDashboard/Users/UserInfoOfficeList/UserInfoOfficeList";
import CallLogs from "./AllDashboardComponents/clinicDashboard/CallLogs/CallLogs";
import MissedCalls from "./AllDashboardComponents/clinicDashboard/MissedCalls/MissedCalls";
import UserSetting from "./AllDashboardComponents/clinicDashboard/UserSetting/UserSetting";

import Security from "./AllDashboardComponents/clinicDashboard/Security/Security";
import RightCustomModal from "../PopupsComponents/RightModal";
import VoiceMailSetting from "./AllDashboardComponents/clinicDashboard/Voicemail/voicemailsetting/VoiceMailSetting";
import { Support } from "@mui/icons-material";
import SubmitTicket from "./AllDashboardComponents/clinicDashboard/support/Ticketsubmit/SubmitTicket";

import RequestFeatures from "./AllDashboardComponents/clinicDashboard/support/requestFeature/RequestFeatures";
import ReportIssues from "./AllDashboardComponents/clinicDashboard/support/requestissues/ReportIssues";

import FaxSetting from "./AllDashboardComponents/clinicDashboard/eFax/faxSetting/FaxSetting";

import InboxFax from "./AllDashboardComponents/clinicDashboard/eFax/inboxfax/InboxFax";

import SendFax from "./AllDashboardComponents/clinicDashboard/eFax/sentfax/SendFax";
import ArchiveFax from "./AllDashboardComponents/clinicDashboard/eFax/Archivefax/ArchiveFax";

import Marketing from "./AllDashboardComponents/clinicDashboard/OfficeSetting/marketing/Marketing";
import NewPatients from "./AllDashboardComponents/clinicDashboard/Appointments/NewPatientAppointment/NewPatientsAppointment";
import CancelAppointment from "./AllDashboardComponents/clinicDashboard/Appointments/CancelAppointment/CancelAppointment";
import NewPatientsAppointment from "./AllDashboardComponents/clinicDashboard/Appointments/NewPatientAppointment/NewPatientsAppointment";
import DeleteVoicemail from "./AllDashboardComponents/clinicDashboard/Voicemail/voicemailsetting/DeleteVoicemail/DeleteVoicemail";

const MainDashboard = ({ params }) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeNestedItem, setActiveNestedItem] = useState(null);
  const [isOpenProgress, setIsOpenProgress] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [reciverNum, setReciverNum] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [reciverName, setReciverName] = useState(null);
  const [showDraft, setShowDraft] = useState(false);
  const [clinicId, setClinicId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openCreateAppointment, setOpenCreateAppointment] = useState(false);
  const [extensionSelected, setExtensionSelected] = useState(false);
  const [openOffiecList, setOpenOfficeList] = useState();

  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const sidebarRef = useRef();
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  let token1;
  try {
    token1 = localStorage?.getItem("token");
  } catch (err) {
    token1 = "default value";
  }

  useEffect(() => {
    if (typeof window !== "undefined" && !token1) {
      router.push("/login");
    }
  }, [token1, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = (item, data) => {
    if (
      item === "Billing" ||
      item === "Patients" ||
      item === "Setting" ||
      item === "Supports" ||
      item === "Call" ||
      item === "Support" ||
      item === "Users" ||
      item === "Office" ||
      item === "eFax" ||
      item === "Voicemail" ||
      item === "Add-Ons-And-Features" ||
      item === "Appointments"
    ) {
      setExpandedMenu((prevState) => (prevState === item ? null : item));
      setActiveNestedItem();
    } else {
      if (expandedMenu && item) {
        changeTab(`${expandedMenu.toLowerCase()}/${item.toLowerCase()}`);
        setActiveNestedItem(item.toLowerCase());
        return;
      }
    }

    if (data?.nestedItems) {
      const nestedItem = data.nestedItems.find((datas) => datas);

      if (nestedItem) {
        changeTab(`${item.toLowerCase()}/${nestedItem.slug}`);
        setActiveNestedItem(nestedItem.title.toLowerCase());
      } else {
        changeTab(item.toLowerCase());
      }
    }
  };

  useEffect(() => {
    if (params) {
      if (params?.secondSlug) {
        setCurrentTab(`${params?.slug}/${params?.secondSlug}`);
        if (
          params?.slug === "billing" ||
          params?.slug === "patients" ||
          params?.slug === "setting" ||
          params?.slug === "call" ||
          params?.slug === "support" ||
          params?.slug === "supports" ||
          params?.slug === "users"
        ) {
          setExpandedMenu(
            params?.slug.charAt(0).toUpperCase() + params?.slug.slice(1)
          );
          const decodedSlug = decodeURIComponent(params?.secondSlug);
          setActiveNestedItem(decodedSlug);
        }
      } else {
        setCurrentTab(params?.slug);
        if (
          params?.slug === "billing" ||
          params?.slug === "supports" ||
          params?.slug === "patients" ||
          params?.slug === "setting" ||
          params?.slug === "call" ||
          params?.slug === "support" ||
          params?.slug === "users"
        ) {
          setExpandedMenu(
            params?.slug.charAt(0).toUpperCase() + params?.slug.slice(1)
          );
        }
      }
    }
  }, [params]);

  // const changeTab = (tab) => {
  //   setCurrentTab(tab);
  //   router.push(`/dashboard/${tab}`);
  // };

  const opendeletepopup = (e) => {
    setDeletePopup(true);
  };
  const closedeletepopup = (e) => {
    setDeletePopup(false);
  };

  const changeTab = (tab, id = null) => {
    setCurrentTab(tab);
    setIsSidebarOpen(false);
    if (window.history.pushState) {
      const newUrl = new URL(window.location);
      newUrl.search = "";
      newUrl.pathname = `/dashboard/${tab}/`;
      window.history.pushState({ path: newUrl.href }, "", newUrl.href);
    } else {
      // router.push(`/dashboard/${tab}/`);
      router.push(`/dashboard/${tab}/`, undefined, { shallow: true });
    }
  };

  // const changeTab = (tab) => {
  //   setIsSidebarOpen(false);

  //   if (tab === "billing") {
  //     // Set the active tab to "Billing" and "Subscription"
  //     setCurrentTab("Billing");
  //     setActiveSubMenu("Subscription"); // Assuming you have a state for active sub menu
  //     router.push(tab); // Navigate to the /billing route
  //   } else {
  //     setCurrentTab(tab); // Set the active tab to the selected tab
  //     setActiveSubMenu(null); // Clear the active sub menu when navigating to other tabs
  //     if (window.history.pushState) {
  //       const newUrl = new URL(window.location);
  //       newUrl.search = ""; // Clear the search parameters
  //       newUrl.pathname = `/dashboard/${tab}/`;
  //       window.history.pushState({ path: newUrl.href }, "", newUrl.href);
  //     } else {
  //       router.push(`/dashboard/${tab}/`);
  //     }
  //   }
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsSidebarOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     const actionResult = await dispatch(webLogout());
  //     const { message } = unwrapResult(actionResult);
  //     if (message === "Logged out") {
  //       toast.success(message);
  //       localStorage.clear();
  //       // window.location.reload();
  //       router.push("/login");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const handleLogout = async () => {
    try {
      const currentTheme = localStorage.getItem("theme");
      const actionResult = await dispatch(webLogout());
      const { message } = unwrapResult(actionResult);
      if (message === "Logged out") {
        toast.success(message);
        localStorage.clear();
        if (currentTheme) {
          localStorage.setItem("theme", currentTheme);
        }
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  function handleOpenMessage(num, reciver_name, clinic_id, index, data) {
    console.log("dffsdfdf", data);
    setSelectedPatient(data);
    setReciverNum(num);
    setOpenPopup(true);
    setReciverName(reciver_name);
    setClinicId(clinic_id);
    setExpandedMenu(null);
    changeTab("messages");
    setShowDraft(false);
  }

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.dashboard_container}>
          <div className={styles.left_sidebar}>
            <div className={styles.img_logo}>
              <Link href="/">
                {isDarkTheme === "dark" ? (
                  <Image src={Images.unextlogodarktheme} alt="" />
                ) : (
                  <Image src={Images.unext_logo} alt="" />
                )}
              </Link>
            </div>
            <div className={styles.sidebar_wrapper}>
              <Sidebar
                changeTab={changeTab}
                currentTab={currentTab}
                setExpandedMenu={setExpandedMenu}
                expandedMenu={expandedMenu}
                activeNestedItem={activeNestedItem}
                setActiveNestedItem={setActiveNestedItem}
                isOpenProgress={isOpenProgress}
                setIsOpenProgress={setIsOpenProgress}
              />
              <div>
                <div className={styles.logout_btn}>
                  {isDarkTheme === "dark" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.67578 5.66969C6.90828 2.96969 8.29578 1.86719 11.3333 1.86719H11.4308C14.7833 1.86719 16.1258 3.20969 16.1258 6.56219V11.4522C16.1258 14.8047 14.7833 16.1472 11.4308 16.1472H11.3333C8.31828 16.1472 6.93078 15.0597 6.68328 12.4047"
                        stroke="#409EEE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.2498 9H2.71484"
                        stroke="#409EEE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.3875 6.48633L1.875 8.99883L4.3875 11.5113"
                        stroke="#409EEE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <Image src={Images.logoutIcon} alt="logout Icon" />
                  )}

                  <div
                    className={styles.logout_button}
                    // onClick={handleLogout}
                    onClick={opendeletepopup}
                  >
                    Logout
                  </div>
                </div>
                <div className={styles.logout_version}>
                  <p>@ {currentYear} uNext</p>
                  <span>Version 2.4</span>
                </div>
              </div>
            </div>
          </div>
          {isSidebarOpen ? (
            <div className={styles.resp_sidebar} ref={sidebarRef}>
              <div className={styles.img_logo}>
                {isDarkTheme === "dark" ? (
                  <Image src={Images.unextlogodarktheme} alt="" />
                ) : (
                  <Image src={Images.unext_logo} alt="" />
                )}
              </div>
              <div className={styles.sidebar_wrapper}>
                <Sidebar
                  changeTab={changeTab}
                  currentTab={currentTab}
                  setExpandedMenu={setExpandedMenu}
                  expandedMenu={expandedMenu}
                  activeNestedItem={activeNestedItem}
                  setActiveNestedItem={setActiveNestedItem}
                  isOpenProgress={isOpenProgress}
                  setIsOpenProgress={setIsOpenProgress}
                />
                <div className={styles.logout_btn}>
                  {isDarkTheme === "dark" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.67578 5.66969C6.90828 2.96969 8.29578 1.86719 11.3333 1.86719H11.4308C14.7833 1.86719 16.1258 3.20969 16.1258 6.56219V11.4522C16.1258 14.8047 14.7833 16.1472 11.4308 16.1472H11.3333C8.31828 16.1472 6.93078 15.0597 6.68328 12.4047"
                        stroke="#409EEE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.2498 9H2.71484"
                        stroke="#409EEE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.3875 6.48633L1.875 8.99883L4.3875 11.5113"
                        stroke="#409EEE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <Image src={Images.logoutIcon} alt="logout Icon" />
                  )}
                  <div className={styles.logout_button} onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={styles.right_dashboard}>
            <DashboardHeader
              toggleSidebar={toggleSidebar}
              changeTab={changeTab}
              handleLogout={handleLogout}
              setExpandedMenu={setExpandedMenu}
              expandedMenu={expandedMenu}
              isOpenProgress={isOpenProgress}
            />
            {userInfoData?.user?.role === "Admin"
              ? currentTab === "clinic-dashboard" && <DashboardSubContainer />
              : currentTab === "clinic-dashboard" && (
                  <DashboardClinicContainer />
                )}
            {currentTab === "clinic-staff" && (
              <ClinicStaff changeTab={changeTab} />
            )}
            {currentTab === "my-dental-office" && <MyDentalOffice />}
            {currentTab === "add-staff" && (
              <AdminAddStaff changeTab={changeTab} />
            )}
            {currentTab === "edit-clinic-staff" && <AdminEditStaff />}
            {currentTab === "clinic-staff-details" && <ViewAdminStaffDetails />}
            {currentTab &&
              String(currentTab).startsWith("add-ons-and-features") && (
                <>
                  {currentTab === "add-ons-and-features/market-place" && (
                    <ClinicExtension />
                  )}
                  {currentTab === "add-ons-and-features/active-add-ons" && (
                    <ClinicExtension />
                  )}
                  {currentTab === "add-ons-and-features/disabled-add-ons" && (
                    <ClinicExtension />
                  )}
                </>
              )}
            {currentTab && String(currentTab).startsWith("setting") && (
              <>
                {currentTab === "setting/office-setting" && <OfficeSetting />}
                {currentTab === "setting/extensions" && (
                  <ClinicExtension
                    changeTab={changeTab}
                    setActiveNestedItem={setActiveNestedItem}
                    setExtensionSelected={setExtensionSelected}
                  />
                )}
                {currentTab === "setting/ring-group" && <RingGroup />}
                {currentTab === "setting/voicemail-setting" && (
                  <VoiceMailSetting />
                )}
                {currentTab === "setting/marketing" && <Marketing />}
              </>
            )}
            {currentTab && String(currentTab).startsWith("supports") && (
              <>
                {currentTab === "supports/submit-ticket" && <SubmitTicket />}
                {currentTab === "supports/report-issue" && <ReportIssues />}
                {currentTab === "supports/request-feature" && (
                  <RequestFeatures />
                )}
              </>
            )}
            {currentTab && String(currentTab).startsWith("efax") && (
              <>
                {currentTab === "efax/inbox" && <InboxFax />}
                {currentTab === "efax/sent" && <SendFax />}
                {currentTab === "efax/archive" && <ArchiveFax />}
                {currentTab === "efax/settings" && <FaxSetting />}
              </>
            )}
            {currentTab && String(currentTab).startsWith("call") && (
              <>
                {currentTab === "call/call-logs" && (
                  <CallLogs
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    reciverNum={reciverNum}
                    setReciverNum={setReciverNum}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    reciverName={reciverName}
                    setReciverName={setReciverName}
                    showDraft={showDraft}
                    setShowDraft={setShowDraft}
                    setClinicId={setClinicId}
                    clinicId={clinicId}
                    currentTab={currentTab}
                    changeTab={changeTab}
                    setExpandedMenu={setExpandedMenu}
                    selectedPatient={selectedPatient}
                    setSelectedPatient={setSelectedPatient}
                    handleOpenMessage={handleOpenMessage}
                  />
                )}
                {currentTab === "call/missed-call" && (
                  <MissedCalls
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    reciverNum={reciverNum}
                    setReciverNum={setReciverNum}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    reciverName={reciverName}
                    setReciverName={setReciverName}
                    showDraft={showDraft}
                    setShowDraft={setShowDraft}
                    setClinicId={setClinicId}
                    clinicId={clinicId}
                    currentTab={currentTab}
                    changeTab={changeTab}
                    setExpandedMenu={setExpandedMenu}
                    selectedPatient={selectedPatient}
                    setSelectedPatient={setSelectedPatient}
                    handleOpenMessage={handleOpenMessage}
                  />
                )}
                {currentTab === "call/call-forward" && <CallForward />}
              </>
            )}
            {currentTab === "devices" && <Devices />}
            {currentTab && String(currentTab).startsWith("voicemail") && (
              <>
                {currentTab === "voicemail/all-voicemails" && <Voicemail />}
                {currentTab === "voicemail/deleted-voicemails" && (
                  <DeleteVoicemail />
                )}
              </>
            )}
            {currentTab && String(currentTab).startsWith("billing") && (
              <>
                {currentTab === "billing/subscription" && (
                  <Billing
                    setExtensionSelected={setExtensionSelected}
                    extensionSelected={extensionSelected}
                  />
                )}
                {currentTab === "billing/bills-&-payment" && (
                  <TransactionHistory />
                )}
                {currentTab === "billing/payment-methods" && <PaymentMethods />}
              </>
            )}
            {currentTab && String(currentTab).startsWith("patients") && (
              <>
                {currentTab === "patients/all-patients" && (
                  <Patients currentTab={currentTab} changeTab={changeTab} />
                )}
                {currentTab === "patients/new-patients" && (
                  <Patients currentTab={currentTab} changeTab={changeTab} />
                )}
                {currentTab === "patients/re-calls" && (
                  <Patients currentTab={currentTab} changeTab={changeTab} />
                )}
                {currentTab === "patients/due-balance" && (
                  <Patients currentTab={currentTab} changeTab={changeTab} />
                )}
                {currentTab === "patients/overdue" && (
                  <Patients currentTab={currentTab} changeTab={changeTab} />
                )}
              </>
            )}
            {currentTab === "office-setting" && <OfficeSetting />}
            {currentTab && String(currentTab).startsWith("office") && (
              <>
                {currentTab === "office/all-office" && (
                  <AdminOffice
                    currentTab={currentTab}
                    changeTab={changeTab}
                    setActiveNestedItem={setActiveNestedItem}
                  />
                )}
                {currentTab === "office/add-new-office" && (
                  <AdminOffice
                    currentTab={currentTab}
                    type="openNewOfficeFromSubMenu"
                    changeTab={changeTab}
                    setActiveNestedItem={setActiveNestedItem}
                  />
                )}
              </>
            )}
            {currentTab === "add-clinic" && <AddOffice />}
            {currentTab === "edit-clinic" && <EditOffice />}
            {currentTab === "view-clinic-details" && <SingleClinicDetails />}
            {currentTab === "patients" && <Patients changeTab={changeTab} />}
            {currentTab === "add-patient" && (
              <AddPatient changeTab={changeTab} />
            )}
            {currentTab === "edit-patient" && (
              <AddPatient changeTab={changeTab} />
            )}
            {currentTab === "view-patient" && <SinglePatientDetails />}
            {currentTab === "office-staff" && <OfficeStaff />}
            {currentTab === "add-office-staff" && <AddStaff />}
            {currentTab === "office-staff-details" && <SingleOfficeStaff />}
            {/* {currentTab === "edit-staff-details" && <EditStaff />} */}
            {currentTab === "edit-staff" && <AdminAddStaff />}
            {currentTab && String(currentTab).startsWith("users") && (
              <>
                {currentTab === "users/all-users" && (
                  <UsersList
                    currentTab={currentTab}
                    params={params}
                    changeTab={changeTab}
                    openOffiecList={openOffiecList}
                    setOpenOfficeList={setOpenOfficeList}
                  />
                )}
                {currentTab === "users/office-admins" && (
                  <UsersList
                    currentTab={currentTab}
                    params={params}
                    changeTab={changeTab}
                  />
                )}
                {currentTab === "users/super-admin" && (
                  <UsersList
                    currentTab={currentTab}
                    params={params}
                    changeTab={changeTab}
                  />
                )}
                {currentTab === "users/supports" && (
                  <UsersList
                    currentTab={currentTab}
                    params={params}
                    changeTab={changeTab}
                  />
                )}
                {currentTab === "users/staff" && (
                  <UsersList
                    currentTab={currentTab}
                    params={params}
                    changeTab={changeTab}
                  />
                )}
              </>
            )}
            {currentTab === "add-user" && <AddUser changeTab={changeTab} />}
            {currentTab === "user-officeinfo_list" && (
              <UserInfoOfficeList
                changeTab={changeTab}
                openOffiecList={openOffiecList}
                setOpenOfficeList={setOpenOfficeList}
              />
            )}
            {currentTab === "user-details" && <SingleUserDetails />}
            {currentTab === "edit-user" && (
              <EditUser changeTab={changeTab} />
            )}{" "}
            {currentTab === "transactions" && <Transaction />}
            {currentTab === "demo-requests" && <DemoRequest />}
            {currentTab === "profile" && <Profile />}
            {currentTab === "messages" && (
              <Messages
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                reciverNum={reciverNum}
                setReciverNum={setReciverNum}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                reciverName={reciverName}
                setReciverName={setReciverName}
                showDraft={showDraft}
                setShowDraft={setShowDraft}
                setClinicId={setClinicId}
                clinicId={clinicId}
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
              />
            )}
            {currentTab === "appointments" && <Appointments />}
            {currentTab === "coupon" && <CouponList changeTab={changeTab} />}
            {currentTab && String(currentTab).startsWith("appointments") && (
              <>
                {currentTab === "appointments/new-appointments" && (
                  <Appointments />
                )}
                {currentTab === "appointments/new-patients" && (
                  <NewPatientsAppointment currentTab={currentTab} />
                )}
                {currentTab === "appointments/re-calls" && <Appointments />}
                {currentTab === "appointments/potential-patients" && (
                  <Appointments />
                )}
                {currentTab === "appointments/cancelled-appointment" && (
                  <CancelAppointment />
                )}
              </>
            )}
            {currentTab && String(currentTab).startsWith("support") && (
              <>
                {currentTab === "support/ticket" && <Ticket />}
                {currentTab === "support/report" && <Report />}
                {currentTab === "support/requestfeature" && <RequestFeature />}
              </>
            )}
            {currentTab === "add-coupon" && <AddCoupon changeTab={changeTab} />}
            {currentTab === "edit-coupon" && (
              <EditCoupon changeTab={changeTab} />
            )}
            {currentTab === "missed-call" && <MissedCalls />}
            {currentTab === "user-setting" && (
              <UserSetting changeTab={changeTab} />
            )}
            {currentTab === "security" && <Security />}
            {currentTab === "view-dental-office-details" && (
              <ViewDentalOfficeDetails />
            )}
          </div>
        </div>
      </div>

      {deletePopup && (
        <RightCustomModal
          isOpen={deletePopup}
          onClose={closedeletepopup}
          width="30w"
          shouldCloseOnOutsideClick={true}
          className="modal-dialog-righted"
        >
          <LogoutPopup
            handleLogout={handleLogout}
            setDeletePopup={setDeletePopup}
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default MainDashboard;
