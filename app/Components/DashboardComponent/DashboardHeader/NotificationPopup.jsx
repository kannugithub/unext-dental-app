import React, { useEffect, useState } from "react";
import styles from "./notificationpopup.module.scss";
import Image from "next/image";
import Images from "../../Images/Images";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import {
  fetchNotification,
  clearNotification,
  clearNotificationbyid,
} from "@/app/store/slices/clinicAdminSlices";
import SpinnerLoader from "../../common/SpinnerLoader/SpinnerLoader";

import { useRouter } from "next/navigation";

const NotificationPopup = ({ setOpenbell }) => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [clinicId, setClinicId] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for controlling animation
  const dispatch = useDispatch();
  const router = useRouter();

  const NotificationData = useAppSelector(
    (state) => state?.clinic?.NotificationData?.result
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    if (clinicId) {
      fetchNotifications();
    }
  }, [clinicId]);

  const fetchNotifications = async () => {
    setRefreshing(true);
    setLoading(true);
    await dispatch(fetchNotification(clinicId));
    setLoading(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    if (clinicId) {
      fetchNotifications();
    }
  };

  const handleClearAll = async () => {
    if (clinicId) {
      await dispatch(clearNotification({ number: clinicId }));
    }
  };
  const handleNotificationClick = async (address) => {
    if (address) {
      const cleanedNumber = address.replace(/^\+/, "");
      await router.push(`/dashboard/messages?number=${cleanedNumber}`);
      dispatch(clearNotification({ number: cleanedNumber, clinicId }));
    }
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader1 : styles.lightHeader1
      }
    >
      <div className={styles.single_patient_details}>
        <div className={styles.close_icons}>
          <div
            className={styles.close_icons_notification}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={Images.white_refresh}
              alt="Refresh Icon"
              onClick={handleRefresh}
              className={refreshing ? styles.refreshing : ""}
            />
            <button onClick={handleClearAll}>Clear All</button>
          </div>
        </div>
        <div className={styles.appointment_list}>Notifications</div>

        {loading ? (
          <div className={styles.spinner_patient_loader}>
            <SpinnerLoader />
          </div>
        ) : (
          NotificationData?.map((item, key) => (
            <div
              className={styles.appointment_list_control}
              key={key}
              onClick={() => handleNotificationClick(item.address)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.appointment}>
                <Image
                  src={
                    isDarkTheme === "dark"
                      ? Images.notification_icon
                      : Images.message_black
                  }
                  alt="Notification Icon"
                />
                <span>{item.message}</span>
              </div>
              {item.time && (
                <div className={styles.appointment_time}>
                  {new Date(item.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
