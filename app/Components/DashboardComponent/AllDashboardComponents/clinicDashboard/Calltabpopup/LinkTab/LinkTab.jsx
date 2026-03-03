import React, { useEffect, useState } from "react";
import styles from "./Linktab.module.scss";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { Faxsetting } from "@/app/store/slices/clinicAdminSlices";
import { useSelector } from "react-redux";

const LinkTab = ({ setCallAlert, link }) => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [values, setValues] = useState({ link });
  const [errors, setErrors] = useState({});
  const [clinicId, setClinicId] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleSubmitNewStaff = async () => {
    const inputErrors = validateInput(values, { link: ["link"] });

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    try {
      const actionResult = await dispatch(
        Faxsetting({ data: values, clinicId })
      );
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        setValues({ link: "" });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(values.link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.addOffice_container}>
        <div className={styles.add_new_dental_box}>
          <div className={styles.add_form_box}>
            <div className={styles.office_box}>
              <textarea
                placeholder="Enter Link"
                name="link"
                onChange={onInputChange}
                value={values.link || ""}
                rows="5"
              />
              {errors.link && <div className={styles.error}>{errors.link}</div>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className={styles.add_new_dental_btn}>
              <button onClick={() => setCallAlert(false)}>Close</button>
            </div>
            <div className={styles.add_new_dental_btn1}>
              <button onClick={handleCopyLink}>Copy Link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkTab;
