import React, { useEffect, useState } from "react";
import styles from "./mobileNumber.module.scss";
import ChangeNumberPopup from "../OfficeDetails/ChangeNumberPopup";
import CustomModal from "@/app/Components/PopupsComponents/Modal";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";

const MobileNumber = () => {
  const [openCard, setOpenCard] = useState(false);
  const [values, setValues] = useState({});

  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleInputChnage = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const openPopup = () => {
    setOpenCard(true);
  };

  const closePopup = () => {
    setOpenCard(false);
  };

  useEffect(() => {
    if (singleClinicData) {
      setValues({
        clinic_phone: singleClinicData?.data?.clinic_phone,
      });
    }
  }, [singleClinicData]);

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={isDarkTheme === "dark" ? "card2 mx-4" : "card2  mx-4"}>
          <div className="card-body">
            <div className={styles.office_details_title}>Mobile Number</div>
            <div className={styles.office_details}>
              <div className={styles.dental_bussines}>
                <div className={styles.clinic_phone}>Office Mobile Number</div>
                <div className={styles.clinic_number}>
                  <input
                    name="clinic_phone"
                    type="text"
                    placeholder="+1 (201) 852-1254"
                    onChange={handleInputChnage}
                    value={values?.clinic_phone}
                    readOnly
                  />
                  <button className={styles.tooltip}>
                    Change Number
                    <span className={styles.tooltiptext}>Coming Soon</span>
                  </button>
                </div>
              </div>

              {/* <div className={styles.warning_mesg}>
                <div>Your porting number is rejected please try again</div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M15 1L8 8M8 8L1 15M8 8L1 1M8 8L15 15"
                      stroke="#FF3232"
                      stroke-width="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {openCard && (
        <RightCustomModal
          isOpen={openCard}
          onClose={closePopup}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <ChangeNumberPopup
            clinic_phone={values?.clinic_phone}
            closePopup={closePopup}
            // deleteType="staffDelete"
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default MobileNumber;
