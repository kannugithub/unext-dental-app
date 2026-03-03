import React, { useEffect, useRef, useState } from "react";
import styles from "./addStaff.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  addClinicStaff,
  fetchClinicsList,
} from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { FormSelect } from "react-bootstrap";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const AddStaff = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const clinicListData = useAppSelector((state) => state.admin.clinicListData);

  const dispatch = useDispatch();
  const fetched = useRef(false);
  const router = useRouter();
  const animatedComponents = makeAnimated();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "p_number") {
      newValue = newValue.replace(/\D/g, "");
    }

    setErrors({ ...errors, [e.target.name]: undefined });
    setValues({ ...values, [e.target.name]: newValue });
  };

  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  useEffect(() => {
    if (!fetched.current) {
      dispatch(fetchClinicsList({}));
      fetched.current = true;
    }
  }, []);
  const options = clinicListData?.data?.map((item) => ({
    value: item._id,
    label: item.clinic_name,
  }));
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleSubmitNewStaff = async () => {
    const validations = {
      staffName: ["required"],
      email: ["email"],
      p_number: ["phone"],
      officeName: ["required"],
      dob: ["required"],
      gender: ["required"],
      address: ["required"],
      work: ["required"],
    };
    const inputErrors = validateInput(values, validations);

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }
    const data = {
      name: values.staffName,
      email: values.email,
      p_number: `+1${values?.p_number?.trim()}`,
      address: values.address,
      work: values.work,
      role: "Staff",
      dob: values.dob,
      gender: values.gender?.label,
      clinics: values.officeName?.map((option) => option.value),
      clinicName: values.officeName?.map((option) => option.label),
    };
    console.log("data", data);
    try {
      const actionResult = await dispatch(addClinicStaff(data));
      console.log(actionResult);
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        router.push("/dashboard/office-staff");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setValues({ ...values, officeName: selectedOption });
    setErrors({ ...errors, officeName: undefined });
  };
  const handleGenderChange = (selectedOption) => {
    setValues({ ...values, gender: selectedOption });
    setErrors({ ...errors, gender: undefined });
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
            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Staff Name</div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="staffName"
                  onChange={onInputChange}
                  value={values?.staffName || ""}
                />
                {errors.staffName && (
                  <div className={styles.error}>{errors.staffName}</div>
                )}
                <div className={styles.office_name_label}>Email ID</div>
                <input
                  type="text"
                  placeholder="Enter Email ID"
                  name="email"
                  onChange={onInputChange}
                  value={values?.email || ""}
                />
                {errors.email && (
                  <div className={styles.error}>{errors.email}</div>
                )}
                <div className={styles.office_name_label}>Address</div>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  onChange={onInputChange}
                  value={values?.address || ""}
                />
                {errors.address && (
                  <div className={styles.error}>{errors.address}</div>
                )}
                <div className={styles.office_name_label}>
                  Dental Office Name
                </div>

                <Select
                  className={styles.office_name_label1}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  name="officeName"
                  value={values?.officeName || ""}
                  onChange={handleSelectChange}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: isDarkTheme ? "#272727" : "#fff",
                      color: isDarkTheme ? "white" : " ",
                      borderColor: "rgba(255, 255, 255, 0.09)",
                    }),
                  }}
                />
                {errors.officeName && (
                  <div className={styles.error1}>{errors.officeName}</div>
                )}
              </div>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Phone Number</div>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  name="p_number"
                  onChange={onInputChange}
                  value={values?.p_number || ""}
                  maxLength={10}
                />
                {errors.p_number && (
                  <div className={styles.error}>{errors.p_number}</div>
                )}
                <div className={styles.office_name_label}>Date Of Birth</div>
                <input
                  type="date"
                  name="dob"
                  onChange={onInputChange}
                  value={values?.dob || ""}
                />
                {errors.dob && <div className={styles.error}>{errors.dob}</div>}
                <div className={styles.office_name_label}>Work</div>
                <input
                  type="text"
                  placeholder="Enter your work"
                  name="work"
                  onChange={onInputChange}
                  value={values?.work || ""}
                />
                {errors.work && (
                  <div className={styles.error}>{errors.work}</div>
                )}
                <div className={styles.office_name_label}>Gender</div>
                <select
                  name="gender"
                  value={values.gender || ""}
                  onChange={handleGenderChange}
                  className={styles.office_name_label1}
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <div className={styles.error1}>{errors.gender}</div>
                )}
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button onClick={handleSubmitNewStaff}>Add New Staff</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStaff;
