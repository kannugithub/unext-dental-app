import React, { useEffect, useState } from "react";
import styles from "../adminAddStaff/AdminAddStaff.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  addStaff,
  getSingleClinicdetails,
  updateUserDetails,
} from "@/app/store/slices/clinicAdminSlices";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { useAppSelector } from "@/app/store/lib/hooks";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";

import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

const AdminEditStaff = () => {
  const [values, setValues] = useState({});
  const [logErrors, setLogErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  console.log(userInfoData, "dfdg");

  const options = userInfoData?.user?.clinics.map((item) => ({
    value: item._id,
    label: item.clinic_name,
  }));

  const animatedComponents = makeAnimated();
  const handleInputChnage = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setLogErrors({ ...logErrors, [e.target.name]: false });
  };
  const singleClinicData = useAppSelector(
    (state) => state?.clinic?.getSingleClinicdetailsdata
  );

  console.log(singleClinicData, "dfdg");

  const params = new URLSearchParams(window.location.search);
  const userId = params.get("item");

  useEffect(() => {
    if (singleClinicData) {
      setValues((prevValues) => ({
        ...prevValues,
        username: singleClinicData?.data?.name,
        userEmail: singleClinicData?.data?.email,
        userPhoneNumer: singleClinicData?.data?.p_number,
        userRole: singleClinicData?.data.role,
      }));
    }
  }, [singleClinicData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (url) {
      const params = new URLSearchParams(url.split("?")[1]);
      const userId = params.get("item");
      dispatch(getSingleClinicdetails(userId));
    }
  }, [url]);

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

  const handleSelectChange = (selectedOption) => {
    setValues({ ...values, officeName: selectedOption });
    setLogErrors({ ...logErrors, officeName: "" }); // Clear the error message for office name
  };

  const handleAddNewUser = async (e) => {
    e.preventDefault();

    const validations = {
      username: ["required"],
      userEmail: ["email"],
      userPhoneNumer: ["required"],
      userRole: ["role"],
      officeName: ["required"],
    };

    const validationErrors = validateInput(values, validations);

    if (Object.keys(validationErrors).length > 0) {
      setLogErrors(validationErrors); // Set logErrors instead of errors
      return;
    }

    // Reset logErrors if there are no validation errors
    setLogErrors({});

    const data = {
      name: values?.username,
      email: values?.userEmail,
      p_number: values?.userPhoneNumer,
      role: values?.userRole,
      address: values.address,
      work: values.work,
      clinics: values.officeName?.map((option) => option.value),
      clinicName: values.officeName?.map((option) => option.label),
    };

    const formData = new FormData();
    formData.append("name", values.username);
    // formData.append("email", values.userEmail);
    // formData.append("p_number", values.userPhoneNumer);
    formData.append("role", values.userRole);
    if (selectedFile) {
      formData.append("profile_pic", selectedFile);
    }

    try {
      const actionResult = await dispatch(
        updateUserDetails({ userId, formData })
      );
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        router.push("/dashboard/clinic-staff");
      }
    } catch (error) {
      toast.error(error.message || "Error updating user");
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark"
            ? styles.darkHeader
            : styles.addOffice_container
        }
      >
        <div className={styles.add_new}>Edit Staff</div>
        <form action="" onSubmit={handleAddNewUser}>
          <div className={styles.add_new_dental_box}>
            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                <Row>
                  <div className="col-md-8">
                    <div className={styles.office_name_label}> Staff Name</div>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="username"
                      value={values?.username}
                      onChange={handleInputChnage}
                    />
                    {logErrors.username && (
                      <p className={styles.error_message}>
                        {logErrors.username}
                      </p>
                    )}

                    <div className={styles.office_name_label}>Email ID</div>
                    <input
                      type="email"
                      placeholder="Enter Email ID"
                      name="userEmail"
                      value={values?.userEmail}
                      onChange={handleInputChnage}
                      readOnly
                    />
                    {logErrors.userEmail && (
                      <p className={styles.error_message}>
                        {logErrors.userEmail}
                      </p>
                    )}
                    <div className={styles.office_name_label}>
                      Date Of Birth
                    </div>
                    <input
                      type="date"
                      name="dob"
                      onChange={handleInputChnage}
                      value={values?.dob || ""}
                    />
                    {logErrors.dob && (
                      <div className={styles.error_message}>
                        {logErrors.dob}
                      </div>
                    )}

                    <Row>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>Gender</div>
                        <select
                          name="Gender"
                          id=""
                          onChange={handleInputChnage}
                        >
                          <option value=""></option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          {/* {/ <option value="Clinic Staff">Clinic Staff</option> /} */}
                          <option value="Other">Other</option>
                        </select>
                        {/* {logErrors?.Gender && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "-10px",
                    }}
                  >
                    {logErrors.Gender}
                  </p>
                )} */}
                      </div>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          Phone Number
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Phone Number"
                          name="userPhoneNumer"
                          value={values?.userPhoneNumer}
                          onChange={handleInputChnage}
                          maxLength={12}
                        />

                        {logErrors.userPhoneNumer && (
                          <p className={styles.error_message}>
                            {logErrors.userPhoneNumer}
                          </p>
                        )}
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>Role</div>
                        <select
                          name="userRole"
                          id=""
                          value={values?.userRole}
                          onChange={handleInputChnage}
                        >
                          <option value=""> select role</option>
                          <option value="Admin">Admin</option>
                          <option value="Staff">Staff</option>
                          {/* {/ <option value="Clinic Staff">Office Staff</option> /} */}
                          <option value="Clinic Admin">Office Admin</option>
                        </select>

                        {logErrors.userRole && (
                          <p className={styles.error_message}>
                            {logErrors.userRole}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          Dental Office Name
                        </div>
                        <select
                          name="officeName"
                          onChange={handleSelectChange}
                          value={values?.officeName || ""}
                        >
                          <option value="">Select an office</option>
                          {userInfoData?.user?.clinics.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.clinic_name}
                            </option>
                          ))}
                        </select>

                        {/* <Select
                  className={styles.office_name_label1}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  name="officeName"
                  value={values?.officeName || ""}
                  onChange={handleSelectChange}
                /> */}
                        {logErrors?.officeName && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                            }}
                          >
                            {logErrors.officeName}
                          </p>
                        )}
                      </div>
                    </Row>
                  </div>
                  <div className="col-md-4">
                    {" "}
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
                              src={
                                isDarkTheme === "dark"
                                  ? Images.thickDownloadIcon
                                  : Images.upload_black
                              }
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
                </Row>
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button type="submit">Update Staff</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminEditStaff;
