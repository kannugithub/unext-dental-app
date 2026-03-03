import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.scss";
import dropdownIcon from "../../../assets/icons/yellowDropDown.svg";
import locationIcon from "../../../assets/icons/locationICON.svg";
import SwitchICon from "../../../assets/icons/switchIcon.svg";
import clinicImg from "../../../assets/images/Rectangle39814.png";

import Image from "next/image";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import { fetchSingleClinic } from "@/app/store/slices/superAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import CustomModal from "../../PopupsComponents/Modal";
import NotificationPopup from "../../DashboardComponent/DashboardHeader/NotificationPopup";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import SubscriptionPopup from "../../DashboardComponent/AllDashboardComponents/clinicDashboard/myDentalOffice/SubsriptonOfficePopup/SubscriptionPopup";
import { Link } from "react-scroll";
import Images from "../../Images/Images";
import { setConnectedClinicId } from "@/app/store/slices/clinicAdminSlices";
import RightCustomModal from "../../PopupsComponents/RightModal";

const Dropdown = React.forwardRef(
  ({ changeTab, setOpenDrop2, setUpdatePopup, updatePopup }, ref) => {
    const dispatch = useDispatch();

    const [clinicId, setClinicId] = useState(null);
    const [clinic, setClinic] = useState(null);
    const [openbell, setOpenbell] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    const userInfoData = useAppSelector((state) => state.authWeb.userInfo);

    let clinicid;
    try {
      clinicid = localStorage?.getItem("clinicId");
    } catch (err) {
      clinicid = "default value";
    }

    const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsDarkTheme(reduxTheme ? "dark" : "light");
      }
    }, [reduxTheme]);

    const handleUpdatePop = () => {
      setUpdatePopup(true);
      setActiveButton("addNewOffice");
      // setOpenDrop2(false);
    };

    const handleUpdateClose = () => setUpdatePopup(false);

    const onClinicChange = (id) => {
      setClinic(id);
      dispatch(setConnectedClinicId(id));
      localStorage.setItem("previousClinicId", clinicid);
      localStorage.setItem("clinicId", id);
      toast.success("Office Switch Successfully");
      setOpenDrop2(false);
      // window.location.reload();
    };

    useEffect(() => {
      if (clinicid) {
        setClinic(clinicid);
      }
    }, [clinicid]);

    useEffect(() => {
      if (clinic !== null) {
        try {
          const actionResult = dispatch(fetchSingleClinic(clinic));
          actionResult.then((result) => {
            if (result?.payload?.success) {
              // setOpenDrop(false);
            }
          });
        } catch (error) {
          toast.error(error.message || "Error adding office");
        }
      }
    }, [clinic]);

    console.log("userInfoData", userInfoData);

    return (
      <>
        <div
          ref={ref}
          className={
            isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
          }
        >
          <div className={styles.dropdown_wrapper}>
            {/* <div className={styles.switchTitile}>Switch Office</div> */}
            <div className={styles.dropdown_mainWrapper}>
              <div className={styles.clinics_wrapper}>
                {userInfoData?.user?.clinics.slice(0, 3).map((item, key) => (
                  <div className={styles.clinics_box} key={key}>
                    <div
                      className={styles.clinics_box_image}
                      onClick={() => onClinicChange(item._id)}
                    >
                      {item?.image && item.image.length > 0 ? (
                        <div>
                          <Image
                            src={item.image[0]}
                            width={33}
                            height={33}
                            alt="Clinic Image"
                          />
                        </div>
                      ) : (
                        <>
                          {item?.clinic_name
                            ?.split(" ")
                            .slice(0, 2) // Take only the first two words
                            .map((word) => word[0].toUpperCase())
                            .join("")}
                        </>
                      )}
                    </div>

                    <div style={{ width: "180px" }}>
                      <div
                        className={styles.clinic_details}
                        onClick={() => onClinicChange(item._id)}
                      >
                        <h1>{item?.clinic_name || "--"}</h1>
                      </div>
                      {item?.clinic_address ? (
                        <div
                          className={styles.clinic_location}
                          onClick={() => onClinicChange(item._id)}
                        >
                          <Image src={Images.locationIcon2}></Image>
                          <span>{item?.clinic_address}</span>
                        </div>
                      ) : (
                        <> </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.addbtn}>
              <button
                onClick={handleUpdatePop}
                className={
                  activeButton === "addNewOffice"
                    ? styles.secondbtn
                    : styles.firstbtn
                }
              >
                Add new Office
              </button>
              <button
                onClick={() => {
                  changeTab("my-dental-office");
                  setActiveButton("viewAllOffice");
                  setOpenDrop2(false);
                }}
                className={
                  activeButton === "viewAllOffice"
                    ? styles.secondbtn
                    : styles.firstbtn
                }
              >
                View All Office
              </button>
            </div>
          </div>
        </div>
        {/* {updatePopup && (
          <RightCustomModal
            isOpen={updatePopup}
            onClose={handleUpdateClose}
            width="50w"
            shouldCloseOnOutsideClick={true}
          >
            <SubscriptionPopup
              clinicId={clinicId}
              setUpdatePopup={setUpdatePopup}
            />
          </RightCustomModal>
        )} */}
      </>
    );
  }
);

export default Dropdown;
