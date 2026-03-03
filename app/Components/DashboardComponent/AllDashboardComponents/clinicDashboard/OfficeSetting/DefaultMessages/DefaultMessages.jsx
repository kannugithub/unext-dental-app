import React from "react";
import styles from "./defaultmessages.module.scss";
const DefaultMessages = () => {
  return (
    <>
      <div className={styles.OfficeHours_wrapper}>
        <div className="card mx-4">
          <div className="card-body">
            <div className={styles.office_details_title}>
              Default Messages
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="17"
                  viewBox="0 0 11 17"
                  fill="none"
                >
                  <path
                    d="M0.625 0.985156L1.67617 0L10.375 8.125L1.67617 16.25L0.625 15.2699L8.26758 8.125L0.625 0.985156Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultMessages;
