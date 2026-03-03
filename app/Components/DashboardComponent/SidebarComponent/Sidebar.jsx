import React, { useEffect, useState } from "react";
import { SidebarData } from "./Data/SidebarData";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import Images, { imageMap } from "../../Images/Images";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/app/store/slices/authSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import CustomModal from "../../PopupsComponents/Modal";
import CustomModals from "../../PopupsComponents/CustomModal";
import ClinicWelcomePopup from "@/app/Components/PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/WelcomePopup/ClinicWelcomePopup";
import ClinicFirstSetup from "@/app/Components/PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/ClinicSetupFirstStep/ClinicFirstSetup";
import SecondStepNewNumber from "@/app/Components/PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/ClinicSetupSecondStep/SecondStepNewNumber";
import ThirdStepFaxNumber from "@/app/Components/PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/ClinicSetupThirdStep/ThirdStepFaxNumber";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import DownArrow from "@/app/assets/svgComponent/DownArrow";
import LeftArrow from "@/app/assets/svgComponent/LeftArrow";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { itIT } from "rsuite/esm/locales";
import VerifyMobileNumber from "../../PopupsComponents/OuterPopups/VerifyMobileNumber/VerifyMobileNumber";
import MultiFinal from "../../PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/FinalAnimatedStep/MultiFinal";
import FinalStep from "../../PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/FinalAnimatedStep/FinalStep";
import { initializeClinicId } from "@/app/store/slices/clinicAdminSlices";

const Sidebar = ({
  changeTab,
  currentTab,
  setExpandedMenu,
  expandedMenu,
  setActiveNestedItem,
  activeNestedItem,
  isOpenProgress,
  setIsOpenProgress,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const [currentStep, setCurrentStep] = useState("welcome");
  // const [clinicId, setClinicId] = useState(null);
  const [openVerifyNumber, setOpenVerifyNumber] = useState(false);
  const [isBillingExpanded, setIsBillingExpanded] = useState(false);
  const userInfo = useAppSelector((state) => state.authWeb.userInfo);
  const getDentalPracticeDetails = useAppSelector(
    (state) => state.authWeb.getDentalPracticeDetails
  );
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const clinicId = useSelector((state) => state.clinic.clinicId);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setIsDarkTheme(reduxTheme ? "dark" : "light");
  //   }
  // }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = reduxTheme ? "dark" : "light";
      setIsDarkTheme(theme);
      document.documentElement.style.setProperty(
        "--sidebar-border-color",
        theme === "light" ? "#FFFFFF" : "#212121"
      );
    }
  }, [reduxTheme]);

  const getUpdateDentalClinic = useAppSelector(
    (state) => state.authWeb.getUpdateDentalClinic
  );
  const getFaxNumberDataList = useAppSelector(
    (state) => state.authWeb.getFaxNumberData
  );
  const getSelectedClinicPhoneNumber = useAppSelector(
    (state) => state.authWeb.getSelectedClinicPhoneNumber
  );
  const sendSelectedFaxNumber = useAppSelector(
    (state) => state.authWeb.sendSelectedFaxNumber
  );
  const cancelSubscriptionPlanData = useAppSelector(
    (state) => state.authWeb.cancelSubscriptionPlanData
  );
  const AddNewOfficedata = useAppSelector(
    (state) => state.clinic?.AddNewOfficedata
  );
  const verifyRegisterUserData = useAppSelector(
    (state) => state.authWeb.verifyRegisterUserData
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const id = localStorage.getItem("clinicId");
  //     setClinicId(id);
  //   }
  // }, [clinicId]);

  useEffect(() => {
    dispatch(initializeClinicId());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [
    clinicId,
    getFaxNumberDataList,
    getDentalPracticeDetails,
    getUpdateDentalClinic,
    getSelectedClinicPhoneNumber,
    sendSelectedFaxNumber,
    cancelSubscriptionPlanData,
    AddNewOfficedata,
    verifyRegisterUserData,
  ]);

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem("userId", userInfo?.user?._id);
    }
  }, [userInfo]);

  const handleClose = () => {
    setIsModalOpen(false);
    setOpenVerifyNumber(false);
  };

  const handleNext = (tab) => {
    setCurrentStep(tab);
  };

  useEffect(() => {
    if (clinicId) {
      const clinic = userInfoData?.user?.clinics.find(
        (clinic) => clinic?._id === clinicId
      );
      if (userInfoData?.user?.isNumberVerify === false) {
        setOpenVerifyNumber(true);
        return;
      }
      if (clinic?.profile_completion === false) {
        setIsModalOpen(true);
        setCurrentStep(
          clinic?.setup === "not-active" ? "welcome" : clinic?.setup
        );
      } else {
        setIsModalOpen(false);
      }
    }
  }, [userInfoData, clinicId, verifyRegisterUserData]);

  const accordionData = {
    Billing: ["Subscription", "Bills-&-Payment", "Payment-Methods"],
    Setting: [
      "Office-Setting",
      "Extensions",
      "Ring-Group",
      "Voicemail-setting",
      "Marketing",
    ],
    Call: ["Call-Logs", "Missed-Call", "Call-Forward"],
    Support: ["Ticket", "Report", "RequestFeature"],
    Supports: ["Submit-Ticket", "Report-Issue", "Request-Feature"],
    Patients: [
      "All-Patients",
      "New-Patients",
      "Re-Calls",
      "Due-Balance",
      "Overdue",
    ],
    Users: ["All-users", "Office-Admins", "Super-Admin", "Supports", "Staff"],
    Office: ["All-office", "Add-new-office"],
    eFax: ["Inbox", "Sent", "Archive", "Settings"],
    Appointments: [
      "New-Appointments",
      "New-Patients",
      "Re-Calls",
      "Potential-Patients",
      "Cancelled-Appointment",
    ],
    Voicemail: ["All-Voicemails", "Deleted-Voicemails"],
    "Add-Ons-And-Features": [
      "Market-Place",
      "Active-Add-Ons",
      "Disabled-Add-Ons",
    ],
  };

  const handleClick = (item, data) => {
    if (
      item === "Billing" ||
      item === "Patients" ||
      item === "Setting" ||
      item === "Call" ||
      item === "Support" ||
      item === "Supports" ||
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

  return (
    <>
      {openVerifyNumber && (
        <CustomModals
          isOpen={openVerifyNumber}
          onClose={handleClose}
          shouldCloseOnOutsideClick={false}
        >
          <VerifyMobileNumber
            setOpenVerifyNumber={setOpenVerifyNumber}
            number="null"
          />
        </CustomModals>
      )}

      {isOpenProgress && (
        <CustomModals
          isOpen={isOpenProgress}
          onClose={handleClose}
          shouldCloseOnOutsideClick={false}
        >
          <FinalStep
            setIsOpenProgress={setIsOpenProgress}
            changeTab={changeTab}
          />
        </CustomModals>
      )}

      {isModalOpen && (
        <CustomModals
          isOpen={isModalOpen}
          onClose={handleClose}
          shouldCloseOnOutsideClick={false}
        >
          {currentStep === "welcome" && (
            <ClinicWelcomePopup
              onNext={handleNext}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === "not-active" && (
            <ClinicFirstSetup
              onNext={handleNext}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === "create-account" && (
            <SecondStepNewNumber
              onNext={handleNext}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === "setup-number" && (
            <ThirdStepFaxNumber
              onNext={handleClose}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setIsOpenProgress={setIsOpenProgress}
            />
          )}
        </CustomModals>
      )}
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        {SidebarData?.filter((item) => {
          if (
            userInfo?.user?.role === "Clinic Admin" &&
            (item.title === "Office" ||
              item.title === "Demo Requests" ||
              item.title === "Office Staff" ||
              item.title === "Users" ||
              item.title === "Transactions" ||
              item.title === "Profile" ||
              item.title === "Office setting" ||
              item.title === "My Dental Office" ||
              item.title === "Coupon" ||
              item.title === "Support" ||
              item.title === "Office")
          ) {
            return false;
          } else if (
            userInfo?.user?.role === "Admin" &&
            (item.title === "Staff" ||
              item.title === "Patients" ||
              item.title === "Extensions" ||
              item.title === "eFax" ||
              item.title === "Devices" ||
              item.title === "Call Forward" ||
              item.title === "Messages" ||
              item.title === "Voicemail" ||
              item.title === "Office setting" ||
              item.title === "Billing" ||
              item.title === "Call" ||
              item.title === "Setting" ||
              item.title === "Ring Group" ||
              item.title === "marketing" ||
              item.title === "Appointments" ||
              item.title === "Supports" ||
              item.title === "Add-Ons-And-Features" ||
              item.title === "My Dental Office")
          ) {
            return false;
          }
          return true;
        }).map((item, key) => {
          return (
            <div className={styles.sidebar_menu_data} key={key}>
              <div
                className={`${styles.sidebar_menu_comp} ${
                  (currentTab === item.slug && styles.activeSideMenu) ||
                  (expandedMenu === item.title && styles.activeSideMenu)
                }`}
                onClick={() => {
                  if (item.title in accordionData) {
                    setExpandedMenu(
                      item.title === expandedMenu ? null : item.title
                    );
                    changeTab(item?.nestedItems[0]?.slug);
                  } else {
                    changeTab(item.slug);
                    setExpandedMenu(null);
                  }
                }}
              >
                <Image
                  src={imageMap[item.icon]}
                  alt=""
                  width={18}
                  height={18}
                />
                <div className={styles.dash_title}>{item.title}</div>
                {(item.title === "Support" ||
                  item.title === "Supports" ||
                  item.title === "Patients" ||
                  item.title === "Billing" ||
                  item.title === "Setting" ||
                  item.title === "Call" ||
                  item.title === "Office" ||
                  item.title === "eFax" ||
                  item.title === "Appointments" ||
                  item.title === "Voicemail" ||
                  item.title === "Add-Ons-And-Features" ||
                  item.title === "Users") && (
                  <div
                    className={styles.expandCollapseArrow}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(item.title, item);
                    }}
                  >
                    {expandedMenu === item.title ? (
                      <LeftArrow className={styles.rotate} />
                    ) : (
                      <DownArrow />
                    )}
                  </div>
                )}
              </div>
              {expandedMenu === item.title &&
                accordionData[item.title]?.map((subItem, index) => (
                  <>
                    {/* {console.log(subItem.toLowerCase(), activeNestedItem)} */}
                    <div
                      key={index}
                      className={`${styles.sidebar_sub_menu_data} ${
                        activeNestedItem == subItem.toLowerCase()
                          ? styles.activeNestedItem
                          : ""
                      }`}
                      onClick={() => handleClick(subItem)}
                    >
                      <div
                        style={{ paddingLeft: "25px" }}
                        className={styles.sub_item}
                      >
                        {subItem.replace(/-/g, " ")}
                      </div>
                    </div>
                  </>
                ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
