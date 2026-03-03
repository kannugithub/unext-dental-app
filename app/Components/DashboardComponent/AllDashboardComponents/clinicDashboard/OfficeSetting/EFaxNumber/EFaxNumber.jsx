import React, { useEffect, useState } from "react";
import styles from "../MobileNumber/mobileNumber.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const EFaxNumber = () => {
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

  useEffect(() => {
    if (singleClinicData) {
      setValues({
        fax_phone: singleClinicData?.data?.fax_phone,
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
        <div className={isDarkTheme === "dark" ? "card2 mx-4" : "card2 mx-4"}>
          <div className="card-body">
            <div className={styles.office_details_title}>E-Fax Number</div>
            <div className={styles.office_details}>
              <div className={styles.dental_bussines}>
                <div className={styles.clinic_phone}>e-Fax Number</div>
                <div className={styles.clinic_number}>
                  <input
                    name="fax_phone"
                    type="text"
                    placeholder="8521 8521 7412"
                    onChange={handleInputChnage}
                    value={values?.fax_phone}
                    readOnly
                  />
                  <button className={styles.tooltip}>
                    change Number{" "}
                    <span className={styles.tooltiptext}>Coming Soon</span>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EFaxNumber;
