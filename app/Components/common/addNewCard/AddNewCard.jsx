import React from "react";
import styles from "./addnewcard.module.scss";

const AddNewCard = () => {
  return (
    <div className={styles.AddNewCard_wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
      >
        <path
          d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
          fill="black"
        />
      </svg>
      <div className={styles.main_wrapper}>
        <div className={styles.headline}>
          <h1>Add New Card</h1>
        </div>
        <div className={styles.card_wrapper}></div>
      </div>
    </div>
  );
};

export default AddNewCard;
