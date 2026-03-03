import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../AlertPopup/alert.module.scss";
import Alert from "react-bootstrap/Alert";
import {
  deActivateOfficeFromSuperAdmin,
  deleteCouponFromWeb,
  fetchDeleteSupportdata,
  deleteUserStaff,
} from "@/app/store/slices/superAdminSlices";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import {
  fetcgDeleteCard,
  fetchgetSavedPayments,
} from "@/app/store/slices/clinicAdminSlices";
const PoupAlert = ({
  setCouponAlert,
  couponAlert,
  deleteType,
  selectedCouponId,
  type,
  clinicId,
  userId,

  selectedData,
}) => {
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleDeleteClinic = () => {
    if (deleteType === "cancelCouponDelete") {
      dispatch(deleteCouponFromWeb(selectedCouponId))
        .then((action) => {
          if (action.payload.success) {
            toast.success(action.payload.messsage || action.payload.message);
            setCouponAlert(false);
          } else if (action.error) {
            toast.error(action.error.message);
            setCouponAlert(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error deleting clinic");
          setCouponAlert(false);
        });
    } else if (deleteType === "Deleteticketdata") {
      const couponId = selectedCouponId._id; // Extract the _id from the object
      dispatch(fetchDeleteSupportdata(couponId))
        .then((action) => {
          if (action.payload.success) {
            toast.success(action.payload.messsage || action.payload.message);
            setCouponAlert(false);
          } else if (action.error) {
            toast.error(action.error.message);
            setCouponAlert(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error deleting clinic");
          setCouponAlert(false);
        });
    } else if (
      deleteType === "officeDeactivateFromSuperAdmin" ||
      deleteType === "officeDeActivate"
    ) {
      dispatch(deActivateOfficeFromSuperAdmin(selectedCouponId))
        .then((action) => {
          if (action.payload.success) {
            toast.success(action.payload.messsage || action.payload.message);
            setCouponAlert(false);
          } else if (action.error) {
            toast.error(action.error.message);
            setCouponAlert(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error deleting clinic");
          setCouponAlert(false);
        });
    } else if (deleteType === "deleteCardFromSuperAdmin") {
      dispatch(fetcgDeleteCard({ cardId: selectedCouponId }))
        .then((action) => {
          if (action.payload.success) {
            toast.success(action.payload.message);
            setCouponAlert(false);
          } else if (action.error) {
            toast.error(action.error.message?.message);
            setCouponAlert(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error deleting clinic");
          setCouponAlert(false);
        });
    } else if (deleteType === "userDelete") {
      dispatch(deleteUserStaff(userId))
        .then((action) => {
          if (action.payload.success) {
            toast.success(action.payload.message || "Successfully delete");
            setCouponAlert(false);
          } else if (action.error) {
            toast.error(action.error.message);
            setCouponAlert(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error while deleting User");
          setCouponAlert(false);
        });
    } else if (deleteType === "cardDeleteType") {
      dispatch(fetcgDeleteCard({ cardId: selectedCouponId, clinicId }))
        .then((action) => {
          if (action.payload?.success) {
            dispatch(fetchgetSavedPayments(clinicId));
            toast.success(action.payload.message);
            setCouponAlert(false);
          } else if (action.error) {
            const errorMessage =
              action.payload?.message || action.error.message;
            toast.error(errorMessage);
            setCouponAlert(false);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Error deleting clinic");
          setCouponAlert(false);
        });
    }
  };
  // dynamic content change

  const getContentByType = () => {
    switch (type) {
      case "ticket":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              Ticket with ID <strong>{selectedCouponId?.ticketId}</strong> will
              be deleted
            </p>
          </div>
        );
      case "report":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              Report with ID <strong>{selectedCouponId?.issueId}</strong> will
              be deleted
            </p>
          </div>
        );
      case "RequestFeature":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              Feature request with ID{" "}
              <strong>{selectedCouponId?.reportId}</strong> will be deleted
            </p>
          </div>
        );
      case "Coupon":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              Coupon with ID <strong>{selectedData?.couponId}</strong> will be
              deleted
            </p>
          </div>
        );
      case "OfficeFromSuperAdmin":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              you want to de-activate this office ?
            </p>
          </div>
        );
      case "deleteCardFromSuperAdmin":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              you want to delete this card ?
            </p>
          </div>
        );
      case "userDelete":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              Do you wnat to delete this staff ?
            </p>
          </div>
        );
      case "cardDeleteType":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              you want to delete this card ?
            </p>
          </div>
        );
      case "officeDeActivate":
        return (
          <div className={styles.text_para}>
            <Alert.Heading className={styles.text_heading}>
              Are you sure?
            </Alert.Heading>
            <p className={styles.text_paragraph}>
              you want to de-activate this office ?
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (couponAlert) {
    return (
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.popupContainer}>
          <div className={`${styles.alert} ${styles.slideIn}`}>
            <Alert
              variant="danger"
              onClose={() => setCouponAlert(false)}
              dismissible={false}
              className={styles.alert}
            >
              <div className={styles.img_text_bar}>
                <svg
                  width="80"
                  height="80"
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
                {getContentByType()}
              </div>
              <div className={styles.top_separator}></div>

              <div className={styles.right_corner}>
                <Button
                  onClick={() => setCouponAlert(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteClinic}
                  className={styles.deleteButton}
                >
                  Delete
                </Button>
              </div>
            </Alert>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default PoupAlert;
