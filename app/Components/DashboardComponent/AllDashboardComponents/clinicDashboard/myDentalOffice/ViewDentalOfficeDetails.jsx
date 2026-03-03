import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "../staffs/viewAdminStaffDetails/StaffDetails.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { fetchGetClinicListByUser } from "@/app/store/slices/clinicAdminSlices";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const ViewDentalOfficeDetails = () => {
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const clinicList = useAppSelector(
    (state) => state.clinic.getClinicListData?.clinic_data
  );
  const [clinicData, setClinicData] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search);
  const clinicStaffId = params.get("item");

  useEffect(() => {
    if (userInfoData?.user?._id !== undefined) {
      dispatch(fetchGetClinicListByUser(userInfoData?.user?._id));
    }
  }, [userInfoData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (clinicList && clinicStaffId) {
      const selectedClinic = clinicList.find(
        (clinic) => clinic._id === clinicStaffId
      );
      setClinicData(selectedClinic);
    }
  }, [clinicList, clinicStaffId]);

  if (!clinicData) {
    return <div>Loading...</div>; // Handle loading state
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
            {/* <div className={styles.compo_name}>View Dental Office Details</div> */}
            <div className={styles.subCompBtns}>
              <button>Export</button>
            </div>
          </div>
          <div className={styles.card_container}>
            <div className={isDarkTheme === "dark" ? "card2" : "card mx-4"}>
              <div className="card-body">
                <div className={styles.info_control}>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>Office Name</div>
                    <div className={styles.patient_name}>
                      {clinicData?.clinic_name || "--"}
                    </div>
                  </div>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>
                      Physical Extensions
                    </div>
                    <div className={styles.patient_name}>
                      {clinicData?.Physical || "--"}
                    </div>
                  </div>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>
                      Remote Extensions
                    </div>
                    <div className={styles.patient_name}>
                      {clinicData?.Remote || "--"}
                    </div>
                  </div>
                  <div className={styles.patient_boxes}>
                    <div className={styles.patient_title}>Subscription</div>
                    <div className={styles.patient_name}>
                      {clinicData?.subscription || "--"}
                    </div>
                  </div>
                </div>
                <div className={styles.single_patient_btn}>
                  <Link href="/dashboard/my-dental-office">
                    <button>Back to list</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDentalOfficeDetails;
