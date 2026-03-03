import React, { useState } from "react";
import styles from "./signout.module.scss";
import { useDispatch } from "react-redux";
import { logoutDevice } from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";
import { useAppSelector } from "@/app/store/lib/hooks";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import DeviceLogoutPopup from "@/app/Components/PopupsComponents/ConfirmationPopup/DeviceLogoutPopup";

const SignoutDevice = () => {
  const dispatch = useDispatch();
  const [confirmLogut, setConfirmLogout] = useState(false);
  const [deviceLogoutData, setDeviceLogoutData] = useState(null);
  const getDeviceList = useAppSelector((state) => state.clinic.getDeviceList);
  const deviceIds = getDeviceList?.data.map((device) => device.device_id);
  const employeeIds = getDeviceList?.data.map((device) => device.employee_id);

  const socket = useAppSelector((state) => state.socket.socket);

  try {
    socket.connect();
  } catch (error) {
    console.error("Connection error:", error);
  }

  const handleConfirmLogout = async () => {
    const data = {
      device_id: deviceIds,
      employee_id: employeeIds,
    };
    setDeviceLogoutData(data);
    setConfirmLogout(true);
    // try {
    //   const actionResult = await dispatch(logoutDevice(data));
    //   const { success, message } = actionResult.payload;
    //   if (success) {
    //     toast.success(message);
    //     if (socket) {
    //       socket.emit("allDeviceLogout", employeeIds[0]?.employee_id);
    //     }
    //   }
    // } catch (error) {
    //   toast.error(error?.response?.data?.message);
    // }
  };
  const handleClose = () => {
    setConfirmLogout(false);
  };

  return (
    <>
      <div className={styles.signout} onClick={handleConfirmLogout}>
        Sign out from all other devices
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
            type="allDevice"
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default SignoutDevice;
