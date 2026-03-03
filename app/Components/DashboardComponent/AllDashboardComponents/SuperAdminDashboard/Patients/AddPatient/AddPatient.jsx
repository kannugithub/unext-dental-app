import React, { useEffect, useRef, useState } from "react";
import styles from "./addPatient.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useDispatch, useSelector } from "react-redux";
import {
  addPatient,
  fetchClinicsStaffList,
  fetchSinglePatient,
  updatePatientData,
} from "@/app/store/slices/superAdminSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { usePathname, useRouter } from "next/navigation";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { Row } from "react-bootstrap";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

const AddPatient = ({ changeTab }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const [clinicId, setClinicId] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [members, setMembers] = useState([
    { name: "", relation: "", phone: "" },
  ]);

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedInsuranceDoc, setSelectedInsuranceDoc] = useState(null);
  const [sendDataLoading, setShowDataLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [getPatientId, setGetPatientId] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [Insurancedocs, setInsurancedocs] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const patientData = useAppSelector(
    (state) => state?.admin?.singlePatientData
  );
  console.log(patientData?.data?.contact, "patientData");
  const pathname = usePathname();

  const addMember = () => {
    setMembers([...members, { name: "", relation: "", phone: "" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
      if (pathname === "/dashboard/edit-patient/") {
        const ids = localStorage.getItem("patient-id");
        console.log("first", ids);
        setGetPatientId(ids);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (getPatientId) {
      const fetchPatient = async () => {
        setDataLoading(true);
        try {
          const actionResult = await dispatch(fetchSinglePatient(getPatientId));
          const { success } = unwrapResult(actionResult);
          if (success) {
            setDataLoading(false);
          }
        } catch (error) {
          toast.error(error?.message);
          setDataLoading(false);
        }
      };

      fetchPatient();
    }
  }, [getPatientId, pathname]);

  useEffect(() => {
    if (patientData && getPatientId) {
      const [patientFirstName = "", patientLastName = ""] =
        patientData?.data?.patient_name?.split(" ") || [];
      const contactWithoutCountryCode =
        patientData?.data?.contact?.replace(/^\+1/, "") || "";

      setValues((prevValues) => ({
        ...prevValues,
        ...patientData?.data,
        patientFirstName,
        patientLastName,
        contact: contactWithoutCountryCode,
        gender: patientData?.data?.gender,
      }));

      setProfileImageUrl(patientData?.data?.profile_image);
      setInsurancedocs(patientData?.data?.insurance_docs);
      setMembers(JSON.parse(JSON.stringify(patientData?.data?.familyMember)));
    }
  }, [patientData, getPatientId]);

  // Profile Image Upload
  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setSelectedProfileImage(objectUrl);
  };

  // Insurance Document Upload

  // const handleInsuranceUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   const fileUrls = files.map((file) => URL.createObjectURL(file));
  //   setSelectedInsuranceDoc(fileUrls);
  // };
  const handleInsuranceUpload = (event) => {
    const files = event.target.files;
    setErrors({ ...errors, insuranceDoc: undefined });
    setSelectedInsuranceDoc(Array.from(files));
  };
  console.log(selectedInsuranceDoc, "selectedInsuranceDoc");

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name.includes("phoneNumber")) {
      newValue = newValue.replace(/\D/g, "");
    }

    setValues({ ...values, [name]: newValue });
    setErrors({ ...errors, [name]: undefined });

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (newValue && !emailRegex.test(newValue)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: undefined,
        }));
      }
    }
  };

  useEffect(() => {
    dispatch(fetchClinicsStaffList());
  }, []);

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const submitPatientInfo = async (e) => {
    e.preventDefault();
    const validations = {
      patientFirstName: ["required"],

      email: ["required"],
      dob: ["required"],
      gender: ["required"],
      balance: ["required"],
      contact: ["phone"],
    };
    const inputErrors = validateInput(values, validations);

    // Custom email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      inputErrors.email = "Invalid email format";
    }

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    const formattedFamilyData = members.map((_, index) => ({
      name: values[`patientName${index}`],
      relation: values[`relation${index}`],
      phone: values[`phoneNumber${index}`],
    }));

    const formData = new FormData();
    formData.append(
      "patient_name",
      values?.patientFirstName + " " + values?.patientLastName
    );
    formData.append("dob", values?.dob);
    formData.append("email", values?.email);
    formData.append("gender", values?.gender);
    formData.append("balance", values?.balance);
    formData.append("contact", `+1${values?.contact}`);
    formData.append("clinic_id", clinicId);
    if (formattedFamilyData.length > 0) {
      formData.append("familyMember", JSON.stringify(formattedFamilyData));
    }
    for (let i = 0; i < selectedInsuranceDoc.length; i++) {
      formData.append("insurance_docs", selectedInsuranceDoc[i]);
    }

    const profileImageInput = document.getElementById("imageUpload");
    const profileImageFile = profileImageInput.files[0];
    formData.append("profile_image", profileImageFile);
    if (sendDataLoading) {
      return;
    }
    setShowDataLoading(true);
    try {
      let actionResult;
      if (values?._id) {
        const id = values?._id;
        // If the patient's ID exists, update the patient
        actionResult = await dispatch(updatePatientData({ formData, id }));
      } else {
        // Otherwise, create a new patient
        actionResult = await dispatch(addPatient(formData));
      }
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        setShowDataLoading(false);
        router.push("/dashboard/patients");
      }
    } catch (error) {
      toast.error(error.message || "Error processing patient data");
      setShowDataLoading(false);
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
          <div className={styles.add_new}>
            <ArrowBack onClick={() => changeTab("patients/all-patients")} />
            {values?._id ? "Edit" : "Add New"} Patient
          </div>
          <div className={styles.add_new_dental_box}>
            <div className={styles.add_form_box}>
              <div className={styles.office_box}>
                <Row>
                  <div className="col-md-8">
                    <Row>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          First Name
                        </div>
                        <input
                          type="text"
                          placeholder="Enter First Name"
                          name="patientFirstName"
                          onChange={handleChange}
                          value={values?.patientFirstName || ""}
                        />
                        {errors.patientFirstName && (
                          <div className="error_message">
                            {errors.patientFirstName}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          Last Name
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Last Name"
                          name="patientLastName"
                          onChange={handleChange}
                          value={values?.patientLastName || ""}
                        />
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          Phone Number
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Phone Number"
                          maxLength="10"
                          name="contact"
                          onChange={handleChange}
                          value={values?.contact || ""}
                        />
                        {errors.contact && (
                          <div className="error_message">{errors.contact}</div>
                        )}
                      </div>
                      {/* <div className="col-md-6">
                        <div className={styles.office_name_label}>Email</div>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          onChange={handleChange}
                          value={values?.email || ""}
                        />
                        {errors.email && (
                          <div className="error_message">{errors.email}</div>
                        )}
                      </div> */}
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>Email</div>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          onChange={handleChange}
                          value={values?.email || ""}
                          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" // Add pattern attribute for email validation
                          required // Ensure the field is required
                        />
                        {errors.email && (
                          <div className="error_message">{errors.email}</div>
                        )}
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>
                          Open Balance
                        </div>
                        <input
                          type="number"
                          placeholder="Enter Balance"
                          name="balance"
                          onChange={handleChange}
                          value={values?.balance || ""}
                        />
                        {errors.balance && (
                          <div className="error_message">{errors.balance}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className={styles.office_name_label}>DOB</div>
                        <input
                          type="date"
                          placeholder="Select date"
                          name="dob"
                          onChange={handleChange}
                          value={values?.dob || ""}
                          max={new Date().toISOString().split("T")[0]}
                        />

                        {errors.dob && (
                          <div className="error_message">{errors.dob}</div>
                        )}
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-12">
                        <div className={styles.office_name_label}>Gender</div>

                        <select
                          name="gender"
                          id=""
                          value={values?.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select your gender</option>
                          {Array.isArray(genderOptions) &&
                            genderOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>

                        {errors.gender && (
                          <div className="error_message">{errors.gender}</div>
                        )}
                      </div>
                    </Row>

                    <div className={styles.family_member}>
                      <p> {values?._id ? "Edit" : "Add New"} Family Member</p>
                      <div className={styles.add_member} onClick={addMember}>
                        <Image src={Images.plus_icon}></Image>
                        &nbsp;
                        <span className={styles.family_button}>
                          {values?._id ? "Edit" : "Add New"} Family Member
                        </span>
                      </div>
                    </div>
                    <div className={styles.family_lists}>
                      {members.map((member, index) => (
                        <div className={styles.family_info} key={index}>
                          <div className="col-md-11">
                            <Row>
                              <div className="col-md-4">
                                <div className={styles.office_name_label}>
                                  First Name
                                </div>
                                <input
                                  type="text"
                                  placeholder="Enter First Name"
                                  // name={`patientName${index}`}
                                  value={member.name}
                                  onChange={(e) => {
                                    const newMembers = [...members];
                                    newMembers[index].name = e.target.value;
                                    setMembers(newMembers);
                                  }}
                                />
                                {errors[`patientName${index}`] && (
                                  <div className="error_message">
                                    {errors[`patientName${index}`]}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-4">
                                <div className={styles.office_name_label}>
                                  Relation
                                </div>
                                <input
                                  type="text"
                                  placeholder="Enter Relation"
                                  // name={`relation${index}`}
                                  value={member.relation}
                                  onChange={(e) => {
                                    const newMembers = [...members];
                                    newMembers[index].relation = e.target.value;
                                    setMembers(newMembers);
                                  }}
                                />
                                {errors[`relation${index}`] && (
                                  <div className="error_message">
                                    {errors[`relation${index}`]}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-4">
                                <div className={styles.office_name_label}>
                                  Phone Number
                                </div>
                                <input
                                  type="text"
                                  placeholder="Enter Phone Number"
                                  maxLength="12"
                                  // name={`phoneNumber${index}`}
                                  value={member.phone}
                                  onChange={(e) => {
                                    const newMembers = [...members];
                                    newMembers[index].phone = e.target.value;
                                    setMembers(newMembers);
                                  }}
                                />
                                {errors[`phoneNumber${index}`] && (
                                  <div className="error_message">
                                    {errors[`phoneNumber${index}`]}
                                  </div>
                                )}
                              </div>
                            </Row>
                          </div>
                          <div className="col-md-1">
                            <div
                              className={styles.close_icon}
                              onClick={() => removeMember(index)}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
                                  fill="#FF3232"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
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
                          {selectedProfileImage ? (
                            <Image
                              src={selectedProfileImage}
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
                              // width={100}
                              // height={100}
                            />
                          )}

                          <input
                            id="imageUpload"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                            style={{ display: "none" }}
                          />
                        </div>
                        <div className={styles.upload_logo}>Upload Image</div>
                        {errors?.profileImage && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "-10px",
                              marginBottom: "12px",
                            }}
                          >
                            {errors.profileImage}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={styles.img_upload_box}>
                      <div className={styles.img_boxes}>
                        <div
                          className={styles.upload_circle}
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              document
                                .getElementById("insuranceUpload")
                                .click();
                            }
                          }}
                        >
                          {selectedInsuranceDoc || Insurancedocs ? (
                            ""
                          ) : (
                            <Image
                              src={
                                isDarkTheme === "dark"
                                  ? Images.thickDownloadIcon
                                  : Images.upload_black
                              }
                              alt=""
                              className={styles.download_icon}
                              // width={100}
                              // height={100}
                            />
                          )}

                          <input
                            type="file"
                            name="image"
                            accept=".pdf,.docx,.jpg,.jpeg,.png"
                            onChange={handleInsuranceUpload}
                            id="insuranceUpload"
                            multiple
                            style={{ display: "none" }}
                          />
                        </div>
                        {selectedInsuranceDoc ? (
                          <div className={styles.selected_files_list}>
                            {Array.from(selectedInsuranceDoc).map(
                              (file, index) => (
                                <div className={styles.files_list} key={index}>
                                  {file.name}
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <>
                            {patientData?.data?.insurance_docs.map(
                              (url, index) => {
                                const urlObj = new URL(url);
                                const pathnameSegments =
                                  urlObj.pathname.split("/");
                                const fileName =
                                  pathnameSegments[pathnameSegments.length - 1];

                                return (
                                  <div
                                    className={styles.selected_files_list}
                                    key={index}
                                  >
                                    <div className={styles.files_list}>
                                      {fileName}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </>
                        )}
                        <div className={styles.upload_logo}>
                          Upload The Insurance Doc
                        </div>
                        {errors?.insuranceDoc && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "-10px",
                              marginBottom: "12px",
                            }}
                          >
                            {errors.insuranceDoc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button onClick={submitPatientInfo} disabled={sendDataLoading}>
                {values?._id ? "Edit" : "Add New"} Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPatient;
