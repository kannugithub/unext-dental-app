import React, { useEffect, useState } from "react";
import styles from "./deletecoupon.module.scss";
import { useDispatch } from "react-redux";
import { deleteCouponFromWeb } from "@/app/store/slices/superAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const DeleteCoupon = ({ setCouponDeleted, selectedCouponId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const dispatch = useDispatch();

  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  const handleDeleteCoupon = async () => {
    try {
      const actionResult = await dispatch(
        deleteCouponFromWeb(selectedCouponId)
      );
      const { sucess, message } = unwrapResult(actionResult);
      if (sucess) {
        toast.success(message);
        setCouponDeleted(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.card_body}>
          <div className={styles.primary_message}>
            Are you sure, you want delete this coupon ?
          </div>
          <div className={styles.card_primary_buttons}>
            <button
              className={styles.card_yes_btn}
              onClick={handleDeleteCoupon}
            >
              Yes
            </button>
            <button
              className={styles.card_no_btn}
              onClick={() => setCouponDeleted(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCoupon;
