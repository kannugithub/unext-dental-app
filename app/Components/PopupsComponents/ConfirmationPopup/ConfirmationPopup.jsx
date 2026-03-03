import React, { useEffect, useState } from "react";
import styles from "./confirmation.module.scss";
import { useDispatch } from "react-redux";
import {
  deleteSingleClinic,
  deleteSingleClinicStaff,
} from "@/app/store/slices/superAdminSlices";
import { toast } from "react-toastify";
import {
  deleteStaff,
  fetcgDeleteCard,
  fetchgetSavedPayments,
} from "@/app/store/slices/clinicAdminSlices";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import { Alert, Button } from "react-bootstrap";

const ConfirmationPopup = ({
  clinicId,
  staffAdminId,
  clinicStaffId,
  userId,
  setDeletePopup,
  deleteType,
  cardId,
  userID,
}) => {
  const dispatch = useDispatch();
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleDeleteClinic = () => {
    if (deleteType === "deleteOfficeStaff") {
      dispatch(deleteSingleClinicStaff(clinicStaffId))
        .then((action) => {
          if (action.payload.success) {
            toast.success(action.payload.messsage || action.payload.message);
            setDeletePopup(false);
          } else if (action.error) {
            toast.error(action.error.message);
            setDeletePopup(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error deleting clinic");
        });
    } else if (deleteType === "staffDelete") {
      dispatch(deleteStaff(staffAdminId))
        .then((action) => {
          if (action.payload.success) {
            toast.success(action.payload.message || "Successfully delete");
            setDeletePopup(false);
          } else if (action.error) {
            toast.error(action.error.message);
            setDeletePopup(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error while deleting staff");
        });
    } else if (deleteType === "deleteCard") {
      dispatch(fetcgDeleteCard({ cardId }))
        .then((action) => {
          dispatch(fetchgetSavedPayments(clinicId));
          if (action.payload.success) {
            toast.success(action.payload.message || "Successfully delete");
            setDeletePopup(false);
          } else if (action.error) {
            toast.error(action.error.message?.message);
            setDeletePopup(false);
          }
        })
        .catch((error) => {
          toast.error("Error while deleting card");
          setDeletePopup(false);
        });
    } else {
      dispatch(deleteSingleClinic(clinicId))
        .then((action) => {
          if (action.payload.success) {
            toast.success(action.payload.message);
            setDeletePopup(false);
          } else if (action.error) {
            toast.error(action.error.message);
            setDeletePopup(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error deleting clinic");
        });
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
            onClick={() => setDeletePopup(false)}
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
                Are you sure you want to delete this Staff ?
                </span>
              </div>
            </div>
            <div className={styles.top_separator}></div>
 
            <div className={styles.right_corner}>
              <Button onClick={handleDeleteClinic} className={styles.cancelButton}>
              Delete
              </Button>
              <Button
               onClick={() => setDeletePopup(false)}
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

export default ConfirmationPopup;
