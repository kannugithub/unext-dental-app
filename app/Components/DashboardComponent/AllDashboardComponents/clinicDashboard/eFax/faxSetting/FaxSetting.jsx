import React, { useEffect, useRef, useState } from "react";
import styles from "./faxSetting.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import { Faxsetting } from "@/app/store/slices/clinicAdminSlices";

const FaxSetting = () => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [values, setValues] = useState({});
  const [onOff, setOnOff] = useState(false);
  const [errors, setErrors] = useState({});
  const [clinicId, setClinicId] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  const handleToggle = () => {
    setOnOff(!onOff);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleSubmitNewStaff = async () => {
    const validations = {
      email: ["email"],
    };
    const inputErrors = validateInput(values, validations);

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }
    const data = {
      forward_email: values.email,
      isEmailForward: onOff,
    };
    try {
      const actionResult = await dispatch(Faxsetting({ data, clinicId }));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        setValues("");
      }
    } catch (error) {
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
        <div className={styles.addOffice_container}>
          <div className={styles.add_new_dental_box}>
            <div className={styles.office_details_title}>
              <span>Fax Settings</span>
              <div className={styles.office_details_text}>
                <span>Forward All Faxes</span>

                <div className={styles.toggle_wrapper} onClick={handleToggle}>
                  <input type="checkbox" checked={onOff} readOnly />
                  <label></label>
                </div>
              </div>
            </div>

            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>
                  Enter Your Email ID
                </div>
                <input
                  type="text"
                  placeholder="Enter Email Id"
                  name="email"
                  onChange={onInputChange}
                  value={values?.email || ""}
                  disabled={!onOff}
                />
                {errors.email && (
                  <div className={styles.error}>{errors.email}</div>
                )}
              </div>
            </div>

            <div className={styles.add_new_dental_btn}>
              <button onClick={handleSubmitNewStaff}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaxSetting;
