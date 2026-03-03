import React from "react";
import styles from "./setupLater.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import { setConnectedClinicId } from "@/app/store/slices/clinicAdminSlices";

const SetupLater = () => {
  const isDarkTheme = useAppSelector((state) => state.darkTheme.isDarkTheme);
  const dispatch = useDispatch();
  const setupBackLater = () => {
    const previousClinicId = localStorage.getItem("previousClinicId");
    if (previousClinicId) {
      localStorage.setItem("clinicId", previousClinicId);
      dispatch(setConnectedClinicId(previousClinicId));
      // window.location.reload();
    }
  };

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.setup_control} onClick={setupBackLater}>
          Setup it later back to Clinic
        </div>
      </div>
    </>
  );
};

export default SetupLater;
