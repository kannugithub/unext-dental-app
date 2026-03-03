import React, { useEffect, useState } from "react";
import styles from "./editoffice.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useAppDispatch, useAppSelector } from "@/app/store/lib/hooks";
import {
  fetchSingleClinic,
  updateClinic,
} from "@/app/store/slices/superAdminSlices";
import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const EditOffice = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  console.log(singleClinicData, "singleClinicData");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useAppDispatch();
  const router = useRouter();

  const params = new URLSearchParams(window.location.search);
  const clinicId = params.get("item");

  const InputHandleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: undefined });
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

  useEffect(() => {
    if (clinicId) {
      dispatch(fetchSingleClinic(clinicId));
    }
  }, [dispatch, clinicId]);

  useEffect(() => {
    setValues({
      officeName: singleClinicData?.data?.clinic_name,
      email: singleClinicData?.data?.clinic_email,
      mobileNumber: singleClinicData?.data?.clinic_phone,
      officeAddress: singleClinicData?.data?.clinic_address,
      faxNumber: singleClinicData?.data?.fax_phone,
    });
  }, [singleClinicData]);

  const SubmitDentalOffice = async (e) => {
    e.preventDefault();

    const validations = {
      officeName: ["required"],
      email: ["email"],
      mobileNumber: ["required"],
      officeAddress: ["required"],
      faxNumber: ["required"],
    };

    const allValues = { ...values };

    const errors = validateInput(allValues, validations);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("Validation errors:", errors);
      return;
    }
    // setErrors(validateInput(values));

    const dataFormData = new FormData();
    dataFormData.append("clinic_name", values.officeName);
    dataFormData.append("clinic_address", values.officeAddress);
    dataFormData.append("image", selectedFile);
    console.log(dataFormData, "dataFormData");

    try {
      const actionResult = await dispatch(
        updateClinic({ clinicId, dataFormData })
      );
      console.log(actionResult, "actionResult");
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        router.push("/dashboard/office");
      }
    } catch (error) {
      toast.error(error.message || "Error adding clinic");
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
                    ) : singleClinicData?.data?.image?.[0] ? (
                      <Image
                        src={singleClinicData.data.image[0]}
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
                  {errors.selectedImage && (
                    <div className="error_message">{errors.selectedImage}</div>
                  )}
                  <div className={styles.upload_logo}>Upload Logo</div>
                </div>
              </div>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Office Name</div>
                <input
                  type="text"
                  placeholder="Enter Office Name"
                  name="officeName"
                  value={values.officeName}
                  onChange={InputHandleChange}
                />
                {errors.officeName && (
                  <div className="error_message">{errors.officeName}</div>
                )}
                <div className={styles.office_name_label}>
                  Office Mobile Number
                </div>
                <input
                  type="text"
                  placeholder="Enter Office Number"
                  name="mobileNumber"
                  value={values.mobileNumber}
                  onChange={InputHandleChange}
                  maxLength={12}
                  readOnly
                />
                {errors.mobileNumber && (
                  <div className="error_message">{errors.mobileNumber}</div>
                )}
                <div className={styles.office_name_label}>Office Address</div>
                <input
                  type="text"
                  placeholder="Enter Office Address"
                  name="officeAddress"
                  value={values.officeAddress}
                  onChange={InputHandleChange}
                />
                {errors.officeAddress && (
                  <div className="error_message">{errors.officeAddress}</div>
                )}
              </div>
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Email</div>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={values.email || ""}
                  onChange={InputHandleChange}
                  readOnly
                />
                {errors.email && (
                  <div className="error_message">{errors.email}</div>
                )}
                <div className={styles.office_name_label}>
                  Office Fax Number
                </div>
                <input
                  type="text"
                  placeholder="Enter Office Fax Number"
                  name="faxNumber"
                  value={values.faxNumber}
                  onChange={InputHandleChange}
                  maxLength={12}
                  readOnly
                />
                {errors.faxNumber && (
                  <div className="error_message">{errors.faxNumber}</div>
                )}
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button onClick={SubmitDentalOffice}>Edit Dental Office</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOffice;
