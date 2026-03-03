import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import styles from "../AlertPopup/alert.module.scss";
import { fetchDataforDisable } from "@/app/store/slices/superAdminSlices";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";

const CouponToggle = ({ type, setIsChecked, isChecked, selectedCouponId }) => {
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleDeleteClinic = async () => {
    try {
      const data = {
        disable: !isChecked?.value,
        id: selectedCouponId,
      };
      const action = await dispatch(fetchDataforDisable(data));

      if (action.payload.sucess) {
        toast.success(action.payload.message || message);
        setIsChecked(false);
      } else {
        throw new Error(action.payload.message || "Error in the action");
      }
    } catch (error) {
      toast.error(error.message || "Error disabling");
      setIsChecked(false);
    }
  };

  const getContentByType = () => {
    if (type === "toggleOpen") {
      return (
        <div className={styles.text_para}>
          <Alert.Heading className={styles.text_heading}>
            Are you sure?
          </Alert.Heading>
          <p className={styles.text_paragraph}>
            {!isChecked?.value
              ? "Are you sure you want to disable this Coupon?"
              : "Are you sure you want to enable this Coupon?"}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isChecked) return null;

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
            onClose={() => setIsChecked(false)}
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
                onClick={() => setIsChecked(false)}
                className={styles.cancelButton}
              >
                NO
              </Button>
              <Button
                onClick={handleDeleteClinic}
                className={styles.deleteButton}
              >
                YES
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default CouponToggle;
