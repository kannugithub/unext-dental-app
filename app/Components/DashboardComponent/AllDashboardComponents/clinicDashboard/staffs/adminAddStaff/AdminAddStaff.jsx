import React, { useEffect, useMemo, useState } from "react";
import styles from "./AdminAddStaff.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import {
  addStaff,
  addStaffData,
  editStaffData,
  getSingleClinicdetails,
} from "@/app/store/slices/clinicAdminSlices";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import Select from "react-select";
import { fetchGetClinicListByUser } from "@/app/store/slices/clinicAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import makeAnimated from "react-select/animated";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { ArrowBack } from "@mui/icons-material";

const AdminAddStaff = ({ changeTab }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [getStaffId, setGetStaffId] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);
  const getClinicListData = useAppSelector(
    (state) => state.clinic.getClinicListData
  );
  const getSingleClinicdetailsdata = useAppSelector(
    (state) => state.clinic.getSingleClinicdetailsdata
  );

  const animatedComponents = makeAnimated();
  const pathname = usePathname();

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
      if (pathname === "/dashboard/edit-staff/") {
        const ids = localStorage.getItem("staff-id");
        setGetStaffId(ids);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (getStaffId) {
      const fetchPatient = async () => {
        setIsDataLoading(true);
        try {
          const actionResult = await dispatch(
            getSingleClinicdetails(getStaffId)
          );
          const { success } = unwrapResult(actionResult);
          if (success) {
            setIsDataLoading(false);
          }
        } catch (error) {
          toast.error(error?.message);
          setIsDataLoading(false);
        }
      };

      fetchPatient();
    }
  }, [getStaffId, pathname]);

  useEffect(() => {
    if (getSingleClinicdetailsdata && getStaffId) {
      setValues({
        ...getSingleClinicdetailsdata?.data,
      });
      setProfileImageUrl(getSingleClinicdetailsdata?.data?.profile_pic);
    }
  }, [getSingleClinicdetailsdata, pathname]);

  const dispatch = useDispatch();
  const router = useRouter();

  const options = getClinicListData?.clinic_data?.map((item) => ({
    value: item._id,
    label: item.clinic_name,
  }));

  // Compute selected options with useMemo
  const selectedOptions = useMemo(() => {
    if (getSingleClinicdetailsdata?.data?.clinics && options) {
      return getSingleClinicdetailsdata.data.clinics.map((clinicId) => {
        const clinic = options.find((option) => option.value === clinicId);
        return clinic;
      });
    }
    return [];
  }, [getSingleClinicdetailsdata, options]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgb(39, 39, 39);",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      marginBottom: "18px",
      padding: "2px",
    }),
  };

  const roles = [
    "Doctor",
    "Associate",
    "Front Desk",
    "Assistant",
    "Manager",
    "Tx Coordinator",
    "Hygienist",
    "Dentist",
    "Dental Assistant",
    "Dental Hygienist",
    "Dental Receptionist",
    "Office Manager",
    "Treatment Coordinator",
    "Insurance Coordinator",
  ];

  const workOptions = roles.map((role) => ({
    value: role,
    label: role,
  }));

  useEffect(() => {
    dispatch(fetchGetClinicListByUser(userInfoData?.user?._id));
  }, [userInfoData]);

  // For Select component
  const handleSelectChange = (selectedOptions, { name }) => {
    setValues({ ...values, [name]: selectedOptions });
    setErrors({ ...errors, [name]: undefined });
  };

  // For input elements
  const handleInputChange = (e) => {
    let newValue = e.target.value;

    if (e.target.name === "p_number") {
      newValue = newValue.replace(/\D/g, "");
    }

    setValues({ ...values, [e.target.name]: newValue });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    if (file) {
      formData.append("image", file);
    } else {
      formData.delete("image");
    }
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const roleOption = [
    { value: "Admin", label: "Admin" },
    { value: "Staff", label: "Staff" },
    { value: "Clinic Admin", label: "Clinic Admin" },
    { value: "Clinic Admin Staff", label: "Clinic Admin Staff" },
  ];

  const handleAddNewUser = async (e) => {
    e.preventDefault();
    const validations = {
      name: ["required"],
      email: ["email"],
      p_number: ["required"],
      role: ["required"],
      dob: ["required"],
      gender: ["required"],
      work: ["required"],
      officeName: ["required"],
    };
    const allValues = { ...values };
    const errors = validateInput(allValues, validations);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const clinicIds = values.officeName.map((option) => option.value);
    const data = {
      name: values.name,
      email: values.email,
      p_number: `+1${values?.p_number?.trim()}`,
      work: values.work,
      role: values.role,
      gender: values.gender,
      dob: values.dob,
      clinics: clinicIds,
    };
    if (isDataLoading) {
      return;
    }
    setIsDataLoading(true);
    if (values?._id) {
      if (selectedImage) {
        formData.append("data", JSON.stringify(data));
        try {
          const actionResult = await dispatch(
            editStaffData({ getStaffId, formData })
          );
          const result = unwrapResult(actionResult);
          if (result) {
            setIsDataLoading(false);
            toast.success(result.message);
            router.push("/dashboard/clinic-staff");
          }
        } catch (error) {
          setIsDataLoading(false);
          toast.error("Failed to update staff member");
        }
      } else {
        try {
          const actionResult = await dispatch(
            editStaffData({ getStaffId, data })
          );
          const result = unwrapResult(actionResult);
          if (result) {
            setIsDataLoading(false);
            toast.success(result.message);
            router.push("/dashboard/clinic-staff");
          }
        } catch (error) {
          setIsDataLoading(false);
          toast.error("Failed to update staff member");
        }
      }
    } else {
      if (selectedImage) {
        formData.append("data", JSON.stringify(data));
        try {
          const actionResult = await dispatch(addStaffData(formData));
          const result = unwrapResult(actionResult);
          if (result) {
            setIsDataLoading(false);
            toast.success(result.message);
            router.push("/dashboard/clinic-staff");
          } else {
            toast.error("User already exists");
          }
        } catch (error) {
          setIsDataLoading(false);
          toast.error("Failed to add staff member");
        }
      } else {
        try {
          const actionResult = await dispatch(addStaffData(data));
          const result = unwrapResult(actionResult);
          if (result) {
            setIsDataLoading(false);
            toast.success(result.message);
            router.push("/dashboard/clinic-staff");
          } else {
            toast.error("User already exists");
            setIsDataLoading(false);
          }
        } catch (error) {
          setIsDataLoading(false);
          toast.error("Failed to add staff member");
        }
      }
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
        <div className={styles.add_new}>
          {" "}
          <ArrowBack onClick={() => changeTab("clinic-staff")} />
          &nbsp;&nbsp;
          {values?._id ? "Edit" : "Add New"} Staff
        </div>
        <form action="">
          <div className={styles.add_new_dental_box}>
            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                <Row>
                  <div className="col-md-8">
                    <div className={styles.office_name_label}> Name</div>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      onChange={handleInputChange}
                      value={values?.name}
                    />
                    {errors?.name && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "-10px",
                          marginBottom: " 12px",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                    <div className={styles.office_name_label}>Email</div>
                    <input
                      type="email"
                      placeholder="Enter Email ID"
                      name="email"
                      onChange={handleInputChange}
                      value={values?.email}
                    />
                    {errors?.email && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "-10px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.email}
                      </p>
                    )}
                    <Row>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          Mobile Number
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Mobile Number"
                          name="p_number"
                          maxLength="10"
                          onChange={handleInputChange}
                          value={values?.p_number}
                        />
                        {errors?.p_number && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "-10px",
                              marginBottom: " 12px",
                            }}
                          >
                            {errors.p_number}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          Choose Office (If More Than One Location)
                        </div>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={options}
                          onChange={handleSelectChange}
                          name="officeName"
                          defaultValue={selectedOptions}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor:
                                isDarkTheme === "dark"
                                  ? "rgb(39, 39, 39)"
                                  : "#fff",
                              color:
                                isDarkTheme === "dark" ? "#fff" : "#1E3441",
                              border:
                                isDarkTheme === "dark"
                                  ? "1px solid rgba(255, 255, 255, 0.08)"
                                  : "1px solid rgba(44, 74, 91, 0.22)",
                              padding: "2px",
                            }),
                          }}
                        />

                        {errors?.officeName && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "6px",
                              marginBottom: " 12px",
                            }}
                          >
                            {errors.officeName}
                          </p>
                        )}
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>Role</div>
                        <select
                          name="role"
                          id=""
                          value={values?.role}
                          onChange={handleInputChange}
                        >
                          <option value="">Role</option>
                          {Array.isArray(roleOption) &&
                            roleOption.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                        {errors?.role && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "-10px",
                              marginBottom: " 12px",
                            }}
                          >
                            {errors.role}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>Gender</div>
                        <select
                          name="gender"
                          id=""
                          value={values?.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Gender</option>
                          {Array.isArray(genderOptions) &&
                            genderOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                        {errors?.gender && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "-10px",
                            }}
                          >
                            {errors.gender}
                          </p>
                        )}
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          Date Of Birth
                        </div>
                        <input
                          type="date"
                          name="dob"
                          onChange={handleInputChange}
                          value={values?.dob || ""}
                        />
                        {errors.dob && (
                          <div className={styles.error_message}>
                            {errors.dob}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>Work</div>
                        <select
                          name="work"
                          id=""
                          value={values?.work}
                          onChange={handleInputChange}
                        >
                          <option value="">Position</option>
                          {Array.isArray(workOptions) &&
                            workOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                        {errors.work && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "-10px",
                            }}
                          >
                            {errors.work}
                          </p>
                        )}
                      </div>
                    </Row>
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
                              alt="Uploaded Profile Image"
                              width={100}
                              height={100}
                            />
                          ) : profileImageUrl ? (
                            <Image
                              src={profileImageUrl}
                              alt="Profile Image"
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
                            name="image"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                          />
                        </div>
                        <div className={styles.upload_logo}>Upload Image</div>
                        {errors?.image && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "-10px",
                              marginBottom: " 12px",
                            }}
                          >
                            {errors.image}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button
                type="submit"
                onClick={handleAddNewUser}
                disabled={isDataLoading}
              >
                {values?._id ? "Edit" : "Add New"} Staff
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAddStaff;
