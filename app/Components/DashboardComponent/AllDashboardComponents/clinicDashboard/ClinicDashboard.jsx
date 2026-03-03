import React, { useEffect, useState } from "react";
import styles from "./clinicDashboard.module.scss";
import DashboardCard from "@/app/Components/common/dashboardCard/DashboardCard";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import BarChart from "./BarChart";
import Modal from "@/app/Components/PopupsComponents/Modal";
import ClinicWelcomePopup from "@/app/Components/PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/WelcomePopup/ClinicWelcomePopup";
import ClinicFirstSetup from "@/app/Components/PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/ClinicSetupFirstStep/ClinicFirstSetup";
import SecondStepNewNumber from "@/app/Components/PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/ClinicSetupSecondStep/SecondStepNewNumber";
import ThirdStepFaxNumber from "@/app/Components/PopupsComponents/ClinicAdminPopups/ClinicSetupPopup/ClinicSetupThirdStep/ThirdStepFaxNumber";
import LineChart from "./LineChart";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleClinic } from "@/app/store/slices/superAdminSlices";

const ClinicDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const [currentStep, setCurrentStep] = useState("welcome");
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  // useEffect(() => {
  //   if (userInfoData !== undefined && userInfoData !== null) {
  //     if (!userInfoData?.user?.clinics[0]?.profile_completion) {
  //       setIsModalOpen(true);
  //     } else if (userInfoData?.user?.clinics[0]?.profile_completion) {
  //       setIsModalOpen(false);
  //     }
  //     if (userInfoData?.user?.clinics?.[0]?.setup === "not-active") {
  //       setCurrentStep("welcome");
  //     } else {
  //       setCurrentStep(userInfoData?.user?.clinics?.[0]?.setup);
  //     }
  //   }
  // }, [userInfoData]);

  const cardList = [
    {
      title: "Total Gross Revenue",
      card_number: "350, 895",
      percentIncre: "3.48%",
      card_review: "Since Last Month",
      icons: "/assets/images/thumbs_ip.png",
    },
    {
      title: "New Patients",
      card_number: "2,356",
      percentIncre: "3.48%",
      card_review: "Since Last Month",
      icons: "/assets/images/New_Patients.png",
    },
    {
      title: "Net Sales",
      card_number: "985",
      percentIncre: "3.48%",
      card_review: "Since Last Month",
      icons: "/assets/images/netSales.png",
    },
    {
      title: "Performance Growth",
      card_number: "49,65",
      percentIncre: "3.48%",
      card_review: "Since Last Month",
      icons: "/assets/images/performanceImg.png",
    },
  ];

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleNext = (tab) => {
    setCurrentStep(tab);
  };

  return (
    <>
      {/* {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleClose} width="90w">
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
            />
          )}
        </Modal>
      )} */}
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div
          className={styles.dashboard_container}
          style={
            isDarkTheme == "dark"
              ? userInfoData?.user?.role === "Clinic Admin"
                ? { background: "rgba(20, 20, 20, 1)" }
                : { background: "rgba(20, 20, 20, 1)" }
              : userInfoData?.user?.role === "Clinic Admin"
              ? { background: "rgba(248, 249, 254, 1)" }
              : { background: "rgba(248, 249, 254, 1)" }
          }
        >
          <div className="pt-3">
            {/* <div className={styles.notice_board}>
            <div>
              <Image src={Images.danger} alt="" />
              Your Office account not create successful please create again{" "}
            </div>
            <Image src={Images.crossIcon} alt="" />
          </div> */}
          </div>
          <div className={styles.dashboard_name}>
            <div className={styles.dashboard_text}>
              Welcome, {userInfoData?.user?.name}
            </div>
            <div className={styles.dash_btn}>
              {/* <button className={styles.dash_btn_new} onClick={handleOpen}>
                New
              </button> */}
              {/* <button className={styles.dash_btn_new}>
                <Image src={Images.filter_icon} alt="" />
                &nbsp;&nbsp;Filters
              </button> */}
            </div>
          </div>
          <div className={styles.dash_card_list}>
            {cardList.map((item, key) => (
              <DashboardCard item={item} key={key} />
            ))}
          </div>
          <div className={styles.left_graph}>
            <div className={styles.graph_one}>
              <div className={isDarkTheme === "dark" ? "card2" : "card1"}>
                <LineChart />
              </div>
            </div>
            <div className={styles.graph_two}>
              <div className={isDarkTheme === "dark" ? "card2" : "card1"}>
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicDashboard;
