import React, { useEffect, useRef, useState } from "react";
import styles from "./marketing.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import {
  Faxsetting,
  Marketingsetting,
} from "@/app/store/slices/clinicAdminSlices";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";

const Marketing = () => {
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
    const data = {
      link: [
        values.Instagram_link,
        values.facebook_link,
        values.unext_link,
        values.google_link,
      ],
      clinicId: clinicId,
    };
    try {
      const actionResult = await dispatch(Marketingsetting(data));
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
              Review request links
            </div>
            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Facebook Link</div>
                <div className={styles.office_name_content}>
                  <input
                    type="text"
                    placeholder="Enter Facebook Link"
                    name="facebook_link"
                    onChange={onInputChange}
                    value={values?.facebook_link || ""}
                  />
                  <Image src={Images.facebook_black} alt="facebook icon" />
                </div>

                <div className={styles.office_name_label}>Google Link</div>
                <div className={styles.office_name_content}>
                  <input
                    type="text"
                    placeholder="Enter Google Link"
                    name="google_link"
                    onChange={onInputChange}
                    value={values?.google_link || ""}
                    maxLength={10}
                  />
                  <Image
                    className={styles.signup_icons}
                    src={Images.google_black}
                    alt="user icon"
                  />
                </div>
              </div>

              <div className={styles.office_box}>
                <div className={styles.office_name_label}>uNext Link</div>
                <div className={styles.office_name_content}>
                  <input
                    type="text"
                    placeholder="Enter uNext Link"
                    name="unext_link"
                    onChange={onInputChange}
                    value={values?.unext_link || ""}
                  />
                  <Image
                    className={styles.signup_icons}
                    src={Images.x_black}
                    alt="user icon"
                  />
                </div>

                <div className={styles.office_name_label}>Instagram Link</div>
                <div className={styles.office_name_content}>
                  <input
                    type="text"
                    placeholder="Enter Instagram Link"
                    name="Instagram_link"
                    onChange={onInputChange}
                    value={values?.Instagram_link || ""}
                  />
                  <Image
                    className={styles.signup_icons}
                    src={Images.insta_black}
                    alt="user icon"
                  />
                </div>
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button onClick={handleSubmitNewStaff}>Send Request</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketing;
