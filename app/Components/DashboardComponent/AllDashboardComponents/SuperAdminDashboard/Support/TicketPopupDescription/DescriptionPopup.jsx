import React, { useState, useEffect } from "react";
import styles from "../TicketPopupDescription/descriptionPopup.module.scss";
import { useSelector } from "react-redux";

const DescriptionPopup = ({ setDeletePopup, selectedCouponId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  return (
    <div>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.confirm_container}>
          <div className={styles.title_text}>
            <h1>Ticket Number</h1>
            {selectedCouponId?.ticketId ? (
              <span>{selectedCouponId.ticketId}</span>
            ) : selectedCouponId?.reportId ? (
              <span>{selectedCouponId.reportId}</span>
            ) : selectedCouponId?.issueId ? (
              <span>{selectedCouponId.issueId}</span>
            ) : (
              <span>No valid ID found</span>
            )}
          </div>
          <div className={styles.top_border}></div>

          <div className={styles.confirm_btns}>
            <h1>Description</h1>
            <p>{selectedCouponId?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPopup;
