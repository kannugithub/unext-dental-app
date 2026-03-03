import React, { useEffect, useState } from "react";
import styles from "../AddUser/AddUser.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import {
  fetchSingleClinicStaff,
  updateUser,
} from "@/app/store/slices/superAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import Link from "next/link";

const EditUser = ({ changeTab }) => {
  const [values, setValues] = useState({});
  const [id, setId] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleInputChnage = (e) => {
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
  console.log(values, "values");
  const [url, setUrl] = useState();
  const singleClinicData = useAppSelector(
    (state) => state?.admin?.singleClinicStaffInfo
  );
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("item");
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  useEffect(() => {
    if (singleClinicData) {
      setValues((prevValues) => ({
        ...prevValues,
        username: singleClinicData?.data?.name,
        userEmail: singleClinicData?.data?.email,
        userPhoneNumer: singleClinicData?.data?.p_number,
        userRole: singleClinicData?.data?.role,
      }));
    }
  }, [singleClinicData]);
  console.log("singleClinicData", singleClinicData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user-id");
      setId(userId);
      dispatch(fetchSingleClinicStaff(userId));
    }
  }, []);

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

  const handleEditUser = async (e) => {
    e.preventDefault();
    const validations = {
      username: ["required"],
      userEmail: ["email"],
      userPhoneNumer: ["required"],
      userRole: ["role"],
    };
    const inputErrors = validateInput(values, validations);

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("name", values?.username);
    formData.append("email", values?.userEmail);
    formData.append("p_number", values?.userPhoneNumer);
    formData.append("role", values?.userRole);

    console.log(id, "id");
    try {
      const actionResult = await dispatch(updateUser({ id, formData }));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        changeTab("users");
      }
    } catch (error) {
      toast.error(error.message || "Error updating user");
    }
  };
  console.log(id, "=====098755");

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
              <div className="col-md-8">
                <div
                  className={styles.add_suer}
                  onClick={() => changeTab("users/all-users")}
                >
                  <svg
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75195 13.6209L7.81398 14.5L0.0519524 7.25L7.81398 0L8.75195 0.874531L1.93242 7.25L8.75195 13.6209Z"
                      fill={isDarkTheme === "dark" ? "white" : "black"}
                    />
                  </svg>
                  <h1> Edit User</h1>
                </div>

                <div className={styles.office_box}>
                  <div className={styles.office_name_label}>Name</div>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="username"
                    value={values?.username || ""}
                    onChange={handleInputChnage}
                  />

                  {errors.username && (
                    <div className={styles.error}>{errors.username}</div>
                  )}
                </div>
                <div className={styles.office_box}>
                  <div className={styles.office_name_label}>Email ID</div>
                  <input
                    type="text"
                    placeholder="Enter Email ID"
                    name="userEmail"
                    value={values?.userEmail || ""}
                    onChange={handleInputChnage}
                  />
                  {errors.userEmail && (
                    <div className={styles.error}>{errors.userEmail}</div>
                  )}
                </div>
                <div className={styles.office_box}>
                  <div className={styles.office_name_label}>Phone Number</div>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    name="userPhoneNumer"
                    value={values?.userPhoneNumer || ""}
                    onChange={handleInputChnage}
                    maxLength={10}
                  />
                  {errors.userPhoneNumer && (
                    <div className={styles.error}>{errors.userPhoneNumer}</div>
                  )}
                </div>
                <div className={styles.office_box}>
                  <div className={styles.office_name_label}>Role</div>
                  <select
                    name="userRole"
                    id=""
                    onChange={handleInputChnage}
                    value={values?.userRole || ""}
                  >
                    <option value="">Select option</option>
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                    {/* <option value="Clinic Staff">Clinic Staff</option> */}
                    <option value="Clinic Admin">Office Admin</option>
                  </select>
                  {errors.userRole && (
                    <div className={styles.error}>{errors.userRole}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.img_upload_box}>
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
                      ) : singleClinicData?.data?.profile_pic ? (
                        <Image
                          src={singleClinicData.data.profile_pic}
                          alt="Clinic"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <Image
                          src={Images.thickDownloadIcon}
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
                    <div className={styles.upload_logo}>Upload Logo</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button onClick={handleEditUser}>Update User</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
