import React, { useEffect, useState } from "react";
import styles from "./insidevoicemail.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useAppSelector } from "@/app/store/lib/hooks";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { OutsideVoicemailsetting } from "@/app/store/slices/clinicAdminSlices";

const OutsideVoicemailSetting = () => {
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);

  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [logErrors, setLogErrors] = useState({});
  const [onOff, setOnOff] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [values, setValues] = useState({});
  const [clinicId, setClinicId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const handleToggle = () => {
    setOnOff(!onOff);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setLogErrors({ ...logErrors, [name]: false });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setFileError("Please select a file.");
      return;
    }

    const reader = new FileReader();
    const allowedExtensions = ["jpeg", "jpg", "png", "doc", "pdf"];
    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setFileError("Only jpeg, jpg, png, doc, and pdf files are allowed.");
      return;
    }

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setSelectedFile(file);
    };

    reader.readAsDataURL(file);
    setFileError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = {
      day: ["required"],
      start_time: ["required"],
      end_time: ["required"],
    };
    const inputErrors = validateInput(values, validations);

    setLogErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }
    if (!selectedFile) {
      setFileError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("day", values.day);
    formData.append("start_time", values.start_time);
    formData.append("end_time", values.end_time);
    formData.append("clinic_id", clinicId);
    formData.append("employee_id", userInfoData?.user?._id);
    formData.append("business_hour", "Outside Business Hours Vm");
    formData.append("on_off", onOff ? "on" : "off");

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const actionResult = await dispatch(OutsideVoicemailsetting(formData));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        setValues("");
        setSelectedFile("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.card2}>
        <div className={styles.card_toggle}>
          <div className={styles.setting_head}>Outside Business Hours Vm</div>
          <div className={styles.toggle_wrapper} onClick={handleToggle}>
            <input type="checkbox" checked={onOff} readOnly />
            <label></label>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className={styles.sentfax_container}>
              <div className={styles.sentMobile_left}>
                <div className={styles.upload_fax_txt}>Upload Files</div>
                <div className={styles.img_upload_box}>
                  <div className={styles.img_boxes}>
                    <div
                      className={styles.upload_circle}
                      style={{ cursor: onOff ? "pointer" : "not-allowed" }}
                      onClick={() =>
                        onOff && document.getElementById("imageUpload").click()
                      }
                    >
                      <div className={styles.img_wrapper}>
                        <div className={styles.img_box_wrappper}>
                          <Image src={Images.uploadIcon} alt="" />
                        </div>
                        <div className={styles.upload_sent_docs}>
                          Upload File
                        </div>
                        <div className={styles.accept_files}>
                          VM File, MP3 File, WAV File
                        </div>
                        <p className={styles.upltext}>{selectedFile?.name}</p>
                      </div>
                      <div className={styles.inptDiv}>
                        <input
                          id="imageUpload"
                          type="file"
                          accept=".jpeg,.jpg,.png,.doc,.pdf"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                          disabled={!onOff}
                        />
                      </div>
                    </div>
                    {fileError && (
                      <div className={styles.error}>{fileError}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.input_text}>
              <Row>
                <div className="col-md-12">
                  <div className={styles.mobile_number_txt}>Select Date</div>
                  <div className={styles.input_with_btn}>
                    <input
                      type="date"
                      placeholder="Please Select Date"
                      name="day"
                      disabled={!onOff}
                      value={values?.day || ""}
                      onChange={handleInputChange}
                    />
                    {/* <Image src={Images.calender_icon} alt="" /> */}
                  </div>
                  {logErrors.day && (
                    <div className={styles.error}>{logErrors.day}</div>
                  )}
                </div>
              </Row>
              <Row>
                <div className="col-md-6">
                  <div className={styles.mobile_number_txt}>Start Time</div>
                  <div className={styles.input_with_btn}>
                    <input
                      type="time"
                      placeholder="Please Select Time"
                      name="start_time"
                      value={values?.start_time || ""}
                      onChange={handleInputChange}
                      disabled={!onOff}
                    />
                    {/* <Image src={Images.time_icon} alt="" /> */}
                  </div>
                  {logErrors.start_time && (
                    <div className={styles.error}>{logErrors.start_time}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <div className={styles.mobile_number_txt}>End Time</div>
                  <div className={styles.input_with_btn}>
                    <input
                      type="time"
                      placeholder="Please Select Time"
                      name="end_time"
                      value={values?.end_time || ""}
                      onChange={handleInputChange}
                      disabled={!onOff}
                    />
                    {/* <Image src={Images.time_icon} alt="" /> */}
                  </div>
                  {logErrors.end_time && (
                    <div className={styles.error}>{logErrors.end_time}</div>
                  )}
                </div>
              </Row>
            </div>
            <div className={styles.sent_fax_btn}>
              <button type="submit" disabled={!onOff}>
                Save
              </button>
              {isDarkTheme === "dark" ? (
                <Image src={Images.mice_dark} alt="" />
              ) : (
                <Image src={Images.mice_light} alt="" />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OutsideVoicemailSetting;
