import React, { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import Images from "@/app/Components/Images/Images";
import {
  Form,
  FormGroup,
  input,
  Button,
  Col,
  Row,
  FormSelect,
} from "react-bootstrap";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { fetchUserInfo } from "@/app/store/slices/authSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import { updateClinicStaff } from "@/app/store/slices/superAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Router } from "next/router";
import Image from "next/image";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const Profile = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const userInfo = useAppSelector((state) => state.authWeb.userInfo);
  const clinicId = userInfo?.user?._id;
  useEffect(() => {
    setValues(userInfo);
    setSelectedImage(userInfo?.user?.profile_pic);
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phoneNumber") {
      newValue = newValue.replace(/\D/g, "");
    }

    // Update nested state correctly
    setValues((prevValues) => ({
      ...prevValues,
      user: {
        ...prevValues.user,
        [name]: newValue,
      },
    }));

    // Clear error message only if the field is touched
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
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
  console.log(values, "values");
  const handleAddNewUser = async (e) => {
    e.preventDefault();

    const validations = {
      name: ["required"],
      email: ["email"],
      p_number: ["phone"],
      role: ["role"],
    };

    const inputErrors = validateInput(values?.user, validations);

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    const data = {
      name: values.user.name,
      email: values.user.email,
      p_number: values.user.p_number,
      role: values.user.role,
      dob: values.user.dob,
    };
    console.log(data, "data");

    const formData = new FormData();
    formData.append("name", values.user.name);
    formData.append("email", values.user.email);
    formData.append("p_number", values.user.p_number);
    formData.append("role", values.user.role);
    formData.append("dob", values.user.dob);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    try {
      const actionResult = await dispatch(
        updateClinicStaff({ clinicId, formData })
      );
      const result = unwrapResult(actionResult);
      if (result) {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.addOffice_container}>
        <div className={styles.add_new_dental_box}>
          <div className={styles.add_form_box}>
            <div className={styles.img_upload_box}>
              <div className={styles.img_boxes}>
                <div className={styles.upload_circle}>
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
                        className={styles.upload_circle}
                        src={selectedImage}
                        alt="Uploaded"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Image
                        className={styles.upload_circle}
                        src={Images.profile_dumy}
                        alt="Clinic"
                        width={100}
                        height={100}
                      />
                    )}
                    <input
                      className={styles.label}
                      id="imageUpload"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup className={styles.group}>
                      <div className={styles.label}>Name</div>
                      <input
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={values?.user?.name || ""}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <span className={styles.error}>{errors.name}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className={styles.group}>
                      <div className={styles.label}>Email ID</div>
                      <input
                        className={styles.input}
                        type="text"
                        name="email"
                        placeholder="Enter Email ID"
                        value={values?.user?.email || ""}
                        onChange={handleChange}
                        readOnly
                      />
                      {errors.email && (
                        <span className={styles.error}>{errors.email}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className={styles.group}>
                      <div className={styles.label}>Role</div>
                      <select
                        className={styles.input}
                        as="select"
                        name="role"
                        readOnly
                        disabled
                        value={values?.user?.role || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Office">Office</option>
                      </select>
                      {errors.role && (
                        <span className={styles.error}>{errors.role}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className={styles.group}>
                      <div className={styles.label}>Phone Number</div>

                      <input
                        className={styles.input}
                        type="text"
                        readOnly
                        name="p_number"
                        placeholder="Enter Phone Number"
                        value={values?.user?.p_number || ""}
                        onChange={handleChange}
                      />
                      {errors.p_number && (
                        <span className={styles.error}>{errors.p_number}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className={styles.group}>
                      <div className={styles.label}>Date of Birth</div>
                      <input
                        className={styles.input}
                        type="date"
                        name="dob"
                        value={values?.user?.dob || ""}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div
                  className={styles.add_new_dental_btn}
                  onClick={handleAddNewUser}
                >
                  <button>Save Changes</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
