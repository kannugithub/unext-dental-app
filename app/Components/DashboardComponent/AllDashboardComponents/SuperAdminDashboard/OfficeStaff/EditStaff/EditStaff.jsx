import React, { useEffect, useRef, useState } from "react";
import styles from "../AddStaff/addStaff.module.scss";
import { useDispatch } from "react-redux";
import {
  fetchClinicsList,
  fetchSingleClinicStaff,
  updateClinicStaff,
} from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const EditStaff = () => {
  const [selectKey, setSelectKey] = useState(Date.now());
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedGender, setSelectedGender] = useState("");
  const [formDataModified, setFormDataModified] = useState(false);
  const clinicListData = useAppSelector((state) => state.admin.clinicListData);
  const singleClinicStaffData = useAppSelector(
    (state) => state?.admin?.singleClinicStaffInfo
  );
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  const dispatch = useDispatch();
  const fetched = useRef(false);
  const router = useRouter();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (singleClinicStaffData) {
      setSelectedGender(singleClinicStaffData?.data?.gender || "");
    }
  }, [singleClinicStaffData]);

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setFormDataModified(true);
  };

  console.log("singleClinicStaffData", singleClinicStaffData);

  useEffect(() => {
    if (singleClinicStaffData) {
      setSelectKey(Date.now());
      setSelectedGender(singleClinicStaffData?.data?.gender); // Set selected gender
    }
  }, [singleClinicStaffData]);

  const handleSelectChange = (selectedOptions) => {
    setValues((prevValues) => ({
      ...prevValues,
      officeName: selectedOptions,
    }));
    setFormDataModified(true); // Set flag indicating form data modification
  };

  const handleGenderChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedGender(selectedOption);
    setValues({ ...values, gender: selectedOption });
    setErrors({ ...errors, gender: undefined });
    setFormDataModified(true);
  };

  const params = new URLSearchParams(window.location.search);
  const clinicStaffId = params.get("item");

  useEffect(() => {
    dispatch(fetchClinicsList({}));
  }, []);

  useEffect(() => {
    if (clinicStaffId) {
      dispatch(fetchSingleClinicStaff(clinicStaffId));
    }
  }, [dispatch, clinicStaffId]);

  useEffect(() => {
    if (singleClinicStaffData) {
      // Set form values and mark as unmodified initially
      setValues({
        staffName: singleClinicStaffData.data.name,
        email: singleClinicStaffData.data.email,
        number: singleClinicStaffData.data.p_number.replace("+1", ""),
        address: singleClinicStaffData.data.address,
        work: singleClinicStaffData.data.work,
        dob: singleClinicStaffData.data.dob,
      });
      setSelectedGender(singleClinicStaffData.data.gender);
      setFormDataModified(false);
    }
  }, [singleClinicStaffData]);

  console.log("clinicListData", clinicListData);

  const options =
    clinicListData &&
    clinicListData?.data?.map((item) => ({
      value: item._id,
      label: item.clinic_name,
    }));

  const defaultOptions = singleClinicStaffData?.data?.clinicName?.map(
    (clinic) => ({
      value: clinic,
      label: clinic,
    })
  );

  const defaultClinicOptions = clinicListData?.data
    ?.filter((clinic) =>
      singleClinicStaffData?.data?.clinics.includes(clinic._id)
    )
    ?.map((clinic) => ({
      value: clinic._id,
      label: clinic.clinic_name,
    }));

  const clinicId = singleClinicStaffData?.data?._id;

  const handleSubmitNewStaff = async () => {
    if (!formDataModified) {
      // If form data not modified, navigate directly without hitting API
      router.push("/dashboard/office-staff");
      return;
    }
    const validations = {
      staffName: ["required"],
      email: ["email"],
      number: ["required"],
      dob: ["required"],
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
      p_number: values.number,
      address: values.address,
      work: values.work,
      role: "Staff",
      dob: values.dob,
      clinics: values.officeName?.map((option) => option.value),
      clinicName: values.officeName?.map((option) => option.label),
    };
    try {
      const actionResult = await dispatch(
        updateClinicStaff({ clinicId, data })
      );
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        // Clear errors after successful submission
        setErrors({});
        router.push("/dashboard/office-staff");
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
            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Staff Name</div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="staffName"
                  value={values.staffName || ""}
                  onChange={onInputChange}
                />
                {errors.staffName && (
                  <div className={styles.error}>{errors.staffName}</div>
                )}
                <div className={styles.office_name_label}>Email ID</div>
                <input
                  type="text"
                  placeholder="Enter Email ID"
                  name="email"
                  value={values.email || ""}
                  onChange={onInputChange}
                  readOnly
                />
                {errors.email && (
                  <div className={styles.error}>{errors.email}</div>
                )}
                <div className={styles.office_name_label}>Address</div>
                <input
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={values.address || ""}
                  onChange={onInputChange}
                />
                {errors.address && (
                  <div className={styles.error}>{errors.address}</div>
                )}
                <div className={styles.office_name_label}>
                  Dental Office Name
                </div>
                {/* <Select
                  className={styles.office_name_label1}
                  key={selectKey}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options || ""}
                  name="officeName"
                  defaultValue={defaultClinicOptions}
                  onChange={handleSelectChange}
                /> */}
                <Select
                  className={styles.office_name_label1}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options || ""}
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
              </div>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Phone Number</div>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  name="number"
                  maxLength={12}
                  value={values.number || ""}
                  onChange={onInputChange}
                  readOnly
                />

                {errors.number && (
                  <div className={styles.error}>{errors.number}</div>
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
                  placeholder="Enter work"
                  name="work"
                  value={values.work || ""}
                  onChange={onInputChange}
                />
                {errors.work && (
                  <div className={styles.error}>{errors.work}</div>
                )}
                <div className={styles.office_name_label}>Gender</div>
                <select
                  name="gender"
                  value={selectedGender || ""}
                  onChange={handleGenderChange}
                  className={styles.office_name_label1}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button onClick={handleSubmitNewStaff}>Update Staff</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStaff;
