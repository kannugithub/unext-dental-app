import React, { useEffect, useState } from "react";
import styles from "./confirmation.module.scss";
import { useDispatch } from "react-redux";
import { deActivateOfficePlan } from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";

const DeActivateOffice = ({ clinicId, setDeletePopup }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const dispatch = useDispatch();

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleDeActivateOffice = async () => {
    try {
      const actionResult = await dispatch(deActivateOfficePlan(clinicId));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
        setDeletePopup(false);
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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="cross"
            >
              <g data-name="Layer 51">
                <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"></path>
                <path d="M22.71 9.29a1 1 0 0 0-1.42 0L16 14.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L17.41 16l5.3-5.29a1 1 0 0 0 0-1.42Z"></path>
              </g>
            </svg>
          </div>
          <div className={styles.confirm_hTag}>
            Are you sure you want to de-activate this office ?
          </div>
          <div className={styles.confirm_btns}>
            <button onClick={() => setDeletePopup(false)}>No</button>
            <button onClick={handleDeActivateOffice}>Yes</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeActivateOffice;
