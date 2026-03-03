import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./deletePatient.module.scss";
import { deletePatientFromList } from "@/app/store/slices/superAdminSlices";
import { toast } from "react-toastify";
import { Alert, Button } from "react-bootstrap";

const DeletePatient = ({ deletePatientId, setDeletePatientPopup }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(false);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleDeletePatient = async () => {
    if (deleteResponse) {
      return;
    }
    setDeleteResponse(true);
    try {
      const actionResult = await dispatch(
        deletePatientFromList(deletePatientId)
      );
      const { success, msg } = actionResult?.payload;
      if (success) {
        toast.success(msg);
        setDeletePatientPopup(false);
        setDeleteResponse(false);
      }
    } catch (error) {
      setDeleteResponse(false);
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
      <div className={styles.popupContainer}>
        <div className={`${styles.alert} ${styles.slideIn}`}>
          <Alert
            variant="danger"
            onClick={() => setDeletePatientPopup(false)}
            dismissible={false}
            className={styles.alert}
          >
            <div className={styles.img_text_bar}>
            <svg
              width="95"
              height="95"
              viewBox="0 0 95 95"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.0551 0.734375C21.5425 0.734375 0.735352 21.5415 0.735352 47.0541C0.735352 72.5668 21.5425 93.3739 47.0551 93.3739C72.5677 93.3739 93.3749 72.5668 93.3749 47.0541C93.3749 21.5415 72.5677 0.734375 47.0551 0.734375ZM47.0551 87.492C24.7775 87.492 6.61723 69.3317 6.61723 47.0541C6.61723 24.7765 24.7775 6.61625 47.0551 6.61625C69.3327 6.61625 87.493 24.7765 87.493 47.0541C87.493 69.3317 69.3327 87.492 47.0551 87.492Z"
                fill="#409EEE"
              />
              <path
                d="M49.9961 40.0703H44.1143V69.4797H49.9961V40.0703Z"
                fill="#409EEE"
              />
              <path
                d="M49.9961 26.0996H44.1143V31.9815H49.9961V26.0996Z"
                fill="#409EEE"
              />
            </svg>
              
              <div className={styles.alert_text}>
                <p>Are you sure?</p>
                <span>
                Are you sure you want to delete this patient ?
                </span>
              </div>
            </div>
            <div className={styles.top_separator}></div>

            <div className={styles.right_corner}>
            <Button onClick={handleDeletePatient} className={styles.cancelButton} disabled={deleteResponse}>
              Delete
              </Button>
              <Button
               onClick={() => setDeletePatientPopup(false)}
                className={styles.deleteButton}
              >
                Cancel
              </Button>
             
            </div>
          </Alert>
        </div>
      </div>
    </div>
     
    </>
  );
};

export default DeletePatient;
