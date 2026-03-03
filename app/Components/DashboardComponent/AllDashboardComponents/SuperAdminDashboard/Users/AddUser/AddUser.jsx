import React, { useEffect, useState } from "react";
import styles from "./AddUser.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addClinicStaff } from "@/app/store/slices/superAdminSlices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import Link from "next/link";

const AddUser = ({ data, openUserNew, setOpenUserList, changeTab }) => {
  const [values, setValues] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "userPhoneNumer") {
      newValue = newValue.replace(/\D/g, "");
    }

    setValues({ ...values, [name]: newValue });
    setErrors({ ...errors, [name]: undefined });
  };

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

  const handleAddNewUser = async (e) => {
    e.preventDefault();
    const validations = {
      username: ["required"],
      userEmail: ["email"],
      userPhoneNumer: ["phone"],
      userRole: ["role"],
    };

    const inputErrors = validateInput(values, validations);

    // Check if an image is selected
    if (!selectedFile) {
      setErrors({ ...inputErrors, image: "Please upload an image" });
      return;
    }

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("name", values.username);
    formData.append("email", values.userEmail);
    formData.append("p_number", values.userPhoneNumer);
    formData.append("role", values.userRole);
    formData.append("profile_pic", selectedFile);

    try {
      const actionResult = await dispatch(addClinicStaff(formData));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        router.push("/dashboard/users");
      }
    } catch (error) {
      toast.error(error.message || "Error adding clinic");
    }
  };

  const handleBackUser = () => {
    changeTab("users/all-users");
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
            <div className="col-md-8">
              {/* <Link
                href="/dashboard/users/all-users/"
                style={{ textDecoration: "none" }}
              > */}
              <div className={styles.add_suer} onClick={handleBackUser}>
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
                <h1>Add New User</h1>
              </div>
              {/* </Link> */}
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Name</div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="username"
                  onChange={handleInputChange}
                  value={values?.username || ""}
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
                  onChange={handleInputChange}
                  value={values?.userEmail || ""}
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
                  maxLength={10}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  value={values?.userRole || ""}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  <option value="Clinic Admin">Office Admin</option>
                </select>
                {errors.userRole && (
                  <div className={styles.error}>{errors.userRole}</div>
                )}
              </div>
            </div>
            <div className="col-md-3">
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
                        width={200}
                        height={200}
                      />
                    ) : isDarkTheme === "dark" ? (
                      <Image
                        src={Images.thickDownloadIcon}
                        alt="Upload icon"
                        className={styles.download_icon}
                      />
                    ) : (
                      <Image
                        src={Images.Upload_icon}
                        alt="Upload icon"
                        className={styles.download_icon}
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
                  {errors.image && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.image}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.add_new_dental_btn}>
            <button onClick={handleAddNewUser}>Add New User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
