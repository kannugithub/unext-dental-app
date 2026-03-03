import React, { useEffect, useState } from "react";
import styles from "../support.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Submitticket } from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

const ReportIssues = () => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [values, setValues] = useState({});
  const [logErrors, setLogErrors] = useState({});
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const type = "features";
  console.log(userInfoData, "userInfoData");

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.trim() });
    setLogErrors({ ...logErrors, [name]: false });
  };

  const validateForm = () => {
    let errors = {};
    if (!values.issue_name) {
      errors.issue_name = "Issue Name is required.";
    } else if (values.issue_name.length < 3) {
      errors.issue_name = "Issue Name must be at least 3 characters long.";
    }

    if (!values.description) {
      errors.description = "Description is required.";
    } else if (values.description.length < 10) {
      errors.description = "Description must be at least 10 characters long.";
    }

    setLogErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        type: type,
        subject: values.issue_name,
        description: values.description,
        employee: userInfoData?.user?._id,
      };
      try {
        const actionResult = await dispatch(Submitticket(data));
        const { success, message } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
          setValues("");
        }
      } catch (error) {
        toast.error(error.message || "Error sending ticket");
      }
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.mobile_number_head}>Request Feature</div>
        <div className={isDarkTheme === "dark" ? styles.card2 : styles.card2}>
          <form>
            <div className="card-body">
              <div className={styles.sentfax_container}>
                <div className={styles.sentMobile_left}>
                  <div className={styles.mobile_number_txt}>
                    What you would like to do on uNext?
                  </div>
                  <div className={styles.input_with}>
                    <div className={styles.input_with_btn}>
                      <input
                        type="text"
                        name="issue_name"
                        placeholder="Enter Issue"
                        value={values.issue_name || ""}
                        onChange={handleInputChange}
                        maxLength={50}
                        required
                      />
                    </div>
                  </div>
                  {logErrors.issue_name && (
                    <div className={styles.error}>{logErrors.issue_name}</div>
                  )}

                  <div className={styles.img_upload_box}>
                    <div className={styles.img_boxes}>
                      <textarea
                        name="description"
                        placeholder="Describe requested features with details, functionalities, outcomes, and examples for better understanding. Your input helps prioritize development"
                        value={values.description || ""}
                        onChange={handleInputChange}
                        maxLength={500}
                        required
                        rows={10}
                        style={{ width: "100%" }}
                      />
                    </div>
                    {logErrors.description && (
                      <div className={styles.error}>
                        {logErrors.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.sent_fax_btn}>
                <button onClick={handleSubmit}>Request Feature</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportIssues;
