import React, { useEffect, useRef, useState } from "react";
import styles from "./Emailtab.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import {
  Faxsetting,
  SendrequestPaymentLink,
} from "@/app/store/slices/clinicAdminSlices";

const EmailTab = ({ patient_number, email, amount, setCallAlert }) => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [values, setValues] = useState({});

  const [errors, setErrors] = useState({});
  const [clinicId, setClinicId] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      email: email,
    }));
  }, [email]);

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

  const sendlink = async () => {
    const validations = {
      email: ["email"],
    };
    const inputErrors = validateInput(values, validations);

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }
    const data = {
      email: values.email,
      patient_number: patient_number,
      amount: amount,
      clinicId: clinicId,
    };
    try {
      const actionResult = await dispatch(SendrequestPaymentLink(data));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        setCallAlert(false);
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
            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Email</div>
                <input
                  type="text"
                  placeholder="Enter Email Id"
                  name="email"
                  onChange={onInputChange}
                  value={values?.email || ""}
                />
                {errors.email && (
                  <div className={styles.error}>{errors.email}</div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div className={styles.add_new_dental_btn}>
                <button
                  onClick={() => {
                    setCallAlert(false);
                  }}
                >
                  Close
                </button>
              </div>
              <div className={styles.add_new_dental_btn1}>
                <button onClick={sendlink}>Send Link</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTab;
