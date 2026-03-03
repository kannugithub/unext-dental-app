import React, { useEffect, useState } from "react";
import styles from "./deviceLogout.module.scss";
import { logoutDevice } from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const DeviceLogoutPopup = ({ setConfirmLogout, deviceLogoutData, type }) => {
  const socket = useAppSelector((state) => state.socket.socket);
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  socket.on("connect_error", (error) => {
    console.log(error);
  });

  try {
    socket.connect();
  } catch (error) {
    console.error("Connection error:", error);
  }

  const handleConfirmLogout = async () => {
    const data = {
      device_id: deviceLogoutData?.device_id,
      employee_id: deviceLogoutData?.employee_id,
    };
    try {
      const actionResult = await dispatch(logoutDevice(data));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
        setConfirmLogout(false);
        if (socket?.connected) {
          if (type === "allDevice") {
            socket.emit("allDeviceLogout", deviceLogoutData?.employee_id);
          } else {
            socket.emit("deviceLogout", deviceLogoutData?.device_id);
            socket.emit("loadDeviceData", deviceLogoutData?.employee_id);
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.confirm_container}>
          <div className={styles.cross_img}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.082 31.5C38.3737 16.5 46.082 10.375 62.9571 10.375H63.4987C82.1237 10.375 89.5821 17.8333 89.5821 36.4583V63.625C89.5821 82.25 82.1237 89.7084 63.4987 89.7084H62.9571C46.207 89.7084 38.4987 83.6667 37.1237 68.9167"
                stroke="#409EEE"
                stroke-width="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M62.4987 50H15.082"
                stroke="#409EEE"
                stroke-width="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.3744 36.041L10.416 49.9994L24.3744 63.9577"
                stroke="#409EEE"
                stroke-width="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.confirm_hTag}>Are you sure?</div>
          <div className={styles.confirm_text}>
            Are you sure you want to logout{" "}
            {type === "allDevice" ? "from all the devices?" : "this device?"}
          </div>
          <div className={styles.confirm_btns}>
            <button onClick={() => setConfirmLogout(false)}>Cancel</button>
            <button onClick={handleConfirmLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceLogoutPopup;
