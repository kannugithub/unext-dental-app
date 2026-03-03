import React, { useEffect, useState } from "react";
import styles from "./usersetting.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { updateUser } from "@/app/store/slices/superAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { Row } from "react-bootstrap";
import formatPhoneNumber from "../../../../../Components/common/ChangeNumberFormate/formatPhoneNumber";

const UserSetting = ({ changeTab }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [onOff, setOnOff] = useState(false);
  const dispatch = useDispatch();
  const [clinicId, setClinicId] = useState();
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);

  const [url, setUrl] = useState();
  const params = new URLSearchParams(window.location.search);
  const userId = userInfoData?.user?._id;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    if (userInfoData) {
      setValues((prevValues) => ({
        ...prevValues,
        username: userInfoData?.user?.name,
        userEmail: userInfoData?.user?.email,
        userPhoneNumber: userInfoData?.user?.p_number,
        profile_pic: userInfoData?.user?.profile_pic,
      }));
    }
  }, [userInfoData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setSelectedImage(reader.result);
  //     setSelectedFile(file);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     setSelectedImage(null);
  //     setSelectedFile(null);
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setSelectedFile(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setSelectedFile(null);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();

    const initialName = userInfoData?.user?.name || "";
    const validations = {
      username: ["required"],
    };

    const inputErrors = validateInput(values, validations);

    if (values.username !== initialName) {
      inputErrors.username = "Name must be changed.";
    }

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("name", values?.username);
    formData.append("email", userInfoData?.user?.email);
    formData.append("p_number", userInfoData?.user?.p_number);
    formData.append("profile_pic", selectedImage);

    try {
      const actionResult = await dispatch(
        updateUser({ id: userInfoData?.user?._id, formData })
      );
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
      }
    } catch (error) {
      toast.error(error.message || "Error updating user");
    }
  };

  const handleToggle = () => {
    setOnOff(!onOff);
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
            <div className={styles.compo_name}>
              <span onClick={() => changeTab("clinic-dashboard")}>
                <Image src={Images.backIcon} />
              </span>
              <span>Profile Setting</span>
            </div>
            <div className={styles.add_form_box}>
              <Row>
                <div className="col-md-8">
                  <div className={styles.office_box}>
                    <div className={styles.office_name_label}>Name</div>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="username"
                      value={values?.username || ""}
                      onChange={handleInputChange}
                    />
                    {/* {errors.username && (
                      <div className={styles.error}>{errors.username}</div>
                    )} */}
                  </div>
                  <div className={styles.office_box}>
                    <div className={styles.office_name_label}>Phone Number</div>
                    <input
                      type="text"
                      placeholder="Enter Phone Number"
                      name="userPhoneNumber"
                      value={formatPhoneNumber(values?.userPhoneNumber) || ""}
                      onChange={handleInputChange}
                      maxLength={12}
                      disabled
                    />
                  </div>
                  <div className={styles.office_box}>
                    <div className={styles.office_name_label}>Email ID</div>
                    <input
                      type="text"
                      placeholder="Enter Email ID"
                      name="userEmail"
                      value={values?.userEmail || ""}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className={styles.office_box2}>
                    <div className={styles.office_name_label}>
                      Set as a busy
                    </div>
                    <div
                      className={styles.toggle_wrapper}
                      onClick={handleToggle}
                    >
                      <input type="checkbox" checked={onOff} readOnly />
                      <label></label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={styles.img_upload_box}>
                    <div
                      className={styles.delete_icon}
                      onClick={handleDeleteImage}
                    >
                      {isDarkTheme === "dark" ? (
                        <Image src={Images.deleteprofile_black} />
                      ) : (
                        <Image src={Images.deleteprofile_white} />
                      )}
                    </div>
                    <div className={styles.img_boxes}>
                      <div
                        className={styles.upload_circle}
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            document.getElementById("imageUpload").click();
                          }
                        }}
                      >
                        {selectedImage ? (
                          <Image
                            src={selectedImage}
                            alt="Uploaded"
                            width={100}
                            height={100}
                          />
                        ) : userInfoData?.user?.profile_pic ? (
                          <Image
                            style={{ borderRadius: "0px" }}
                            src={userInfoData?.user?.profile_pic}
                            width={40}
                            height={40}
                            alt="user icon"
                          />
                        ) : isDarkTheme === "dark" ? (
                          <Image
                            src={Images.thickDownloadIcon}
                            alt=""
                            className={styles.download_icon}
                            width={100}
                            height={100}
                          />
                        ) : (
                          <Image
                            src={Images.upload_black}
                            alt=""
                            className={styles.download_icon}
                            width={100}
                            height={100}
                          />
                        )}
                        <input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                        />
                      </div>
                      <div className={styles.upload_logo}>Upload Image</div>
                    </div>

                    {/* <div className={styles.img_boxes}>
                      <div
                        className={styles.upload_circle}
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            document.getElementById("imageUpload").click();
                          }
                        }}
                      >
                        {selectedImage ? (
                          <Image
                            src={selectedImage}
                            alt="Uploaded"
                            width={100}
                            height={100}
                          />
                        ) : userInfoData?.user?.profile_pic ? (
                          <Image
                            src={Images.thickDownloadIcon}
                            alt=""
                            className={styles.download_icon}
                            width={100}
                            height={100}
                          />
                        ) : isDarkTheme === "dark" ? (
                          <Image
                            src={Images.thickDownloadIcon}
                            alt=""
                            className={styles.download_icon}
                            width={100}
                            height={100}
                          />
                        ) : (
                          <div className={styles.placeholder}></div>
                        )}
                        <input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                        />
                      </div>
                      {!selectedImage && (
                        <div className={styles.upload_logo}>Upload Image</div>
                      )}
                    </div> */}
                  </div>
                </div>
              </Row>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button onClick={handleEditUser}>SAVE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSetting;
