import React, { useState, useEffect } from "react";
import styles from "./toggleCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataforDisable } from "@/app/store/slices/superAdminSlices";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

const ToggleCard = ({
  setTogglePopups,
  setIsTogglePopup,
  selectedCouponId,
}) => {
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleDisablebutton = async () => {
    const data = {};
    try {
      const actionResult = await dispatch(
        fetchDataforDisable({ selectedCouponId, data })
      );
      console.log("actionResult?.payload", actionResult?.payload);
      const { sucess, message } = actionResult?.payload;
      if (sucess) {
        toast.success(message);
        setIsTogglePopup(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.confirm_container}>
        <div className={styles.cross_img}></div>
        <div className={styles.title_text}>
          <h1>Are you Want to Disable </h1>
        </div>
        <div className={styles.confirm_btns}>
          <button
            onClick={() => {
              setIsTogglePopup(false);
              setTogglePopups((prevState) => ({
                ...prevState,
                [selectedCouponId]: false,
              }));
            }}
          >
            cancel
          </button>
          <button onClick={handleDisablebutton}>Disable</button>
        </div>
      </div>
    </div>
  );
};

export default ToggleCard;
