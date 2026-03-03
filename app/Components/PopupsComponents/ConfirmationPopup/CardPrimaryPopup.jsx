import React, { useEffect, useState } from "react";
import styles from "./cardPrimary.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetSavedPayments,
  updatePrimaryCard,
} from "@/app/store/slices/clinicAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const CardPrimaryPopup = ({
  setIsPrimaryCard,
  setToggleStates,
  clickedItemId,
  setClickedItemToggleState,
}) => {
  const [clinicId, setClinicId] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const dispatch = useDispatch();

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

  const handleClose = (isPrimary, success) => {
    setIsPrimaryCard(false);
    setToggleStates((prevState) => ({
      ...prevState,
      [clickedItemId]: false,
    }));
    if (success) {
      setClickedItemToggleState(false);
    }
  };

  const handleSetCardPrimary = async () => {
    const data = {
      clinicId: clinicId,
      paymentMethodId: clickedItemId,
    };
    try {
      const actionResult = await dispatch(updatePrimaryCard(data));
      console.log("actionResult", actionResult);
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        setIsPrimaryCard(false);
        toast.success(message);
        dispatch(fetchgetSavedPayments(clinicId));
        handleClose(true, success);
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
      <div className={styles.card_body}>
        <div className={styles.primary_message}>
          Are you sure, you want to set this card as a primary.
        </div>
        <div className={styles.card_primary_buttons}>
          <button
            className={styles.card_yes_btn}
            onClick={handleSetCardPrimary}
          >
            Yes
          </button>
          <button
            className={styles.card_no_btn}
            onClick={() => handleClose(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPrimaryPopup;
