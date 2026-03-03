import React, { useEffect, useRef, useState } from "react";
import styles from "./smstab.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import { Faxsetting, sendMessages } from "@/app/store/slices/clinicAdminSlices";
import { fetchSingleClinic } from "@/app/store/slices/superAdminSlices";

const SmsTab = ({ patient_number, setCallAlert, link }) => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [values, setValues] = useState({});

  const [errors, setErrors] = useState({});
  const [clinicId, setClinicId] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const clinic_phone = useAppSelector(
    (state) => state.admin.singleClinicData?.data?.clinic_phone
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      patient_number: patient_number,
    }));
  }, [patient_number]);

  useEffect(() => {
    try {
      const actionResult = dispatch(fetchSingleClinic(clinicId));
      actionResult.then((result) => {
        if (result?.payload?.success) {
          // setOpenDrop(false);
        }
      });
    } catch (error) {
      toast.error(error.message || "Error adding office");
    }
  }, [clinicId]);

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

  const SendSMS = async () => {
    const data = {
      message: link,
      from: clinic_phone,
      to: patient_number,
    };
    try {
      const actionResult = await dispatch(sendMessages(data));
      const { success, message } = actionResult.payload;
      if (success) {
        toast.success(message);
        setCallAlert(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error);
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
                <div className={styles.office_name_label}>Mobile Number</div>
                <input
                  type="text"
                  placeholder="+1 (xxx) xxx - xxxx"
                  name="patient_number"
                  onChange={onInputChange}
                  value={values?.patient_number || ""}
                />
                {errors.patient_number && (
                  <div className={styles.error}>{errors.patient_number}</div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div className={styles.add_new_dental_btn}>
                <button onClick={() => setCallAlert(false)}>Close</button>
              </div>
              <div className={styles.add_new_dental_btn1}>
                <button onClick={SendSMS}>Send Link</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmsTab;
