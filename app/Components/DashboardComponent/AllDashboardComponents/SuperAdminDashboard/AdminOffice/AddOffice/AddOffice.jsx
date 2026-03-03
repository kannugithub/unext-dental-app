import React, { useEffect, useState } from "react";
import styles from "./addOffice.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { addClinic } from "@/app/store/slices/superAdminSlices";
import { useAppDispatch } from "@/app/store/lib/hooks";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const AddOffice = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const InputHandleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "mobileNumber" || name === "fax_Number") {
      newValue = newValue.replace(/\D/g, "");
    }

    setValues({ ...values, [name]: newValue });
    setErrors({ ...errors, [name]: undefined });
  };
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

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

  const SubmitDentalOffice = async (e) => {
    e.preventDefault();

    const validations = {
      officeName: ["required"],
      mobileNumber: ["phone"],
      officeAddress: ["required"],
      email: ["email"],
      fax_Number: ["fax"],
    };

    const validationErrors = validateInput(values, validations);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("clinic_name", values.officeName);
    formData.append("clinic_email", values.email);
    formData.append("clinic_phone", values.mobileNumber);
    formData.append("clinic_address", values.officeAddress);
    formData.append("fax_phone", values.faxNumber);

    try {
      const actionResult = await dispatch(addClinic(formData));
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
              <div className={styles.office_box}>
                <div className={styles.office_name_label}>Office Name</div>
                <input
                  type="text"
                  placeholder="Enter Office Name"
                  name="officeName"
                  value={values?.officeName || ""}
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
                  maxLength="10"
                  value={values?.mobileNumber || ""}
                  onChange={InputHandleChange}
                />

                {errors.mobileNumber && (
                  <div className="error_message">{errors.mobileNumber}</div>
                )}
                <div className={styles.office_name_label}>Office Address</div>
                <input
                  type="text"
                  placeholder="Enter Office Address"
                  name="officeAddress"
                  value={values?.officeAddress || ""}
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
                  onChange={InputHandleChange}
                  value={values?.email || ""}
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
                  name="fax_Number"
                  maxLength={10}
                  value={values?.fax_Number || ""}
                  onChange={InputHandleChange}
                />
                {errors.fax_Number && (
                  <div className="error_message">{errors.fax_Number}</div>
                )}
              </div>
            </div>
            <div className={styles.add_new_dental_btn}>
              <button onClick={SubmitDentalOffice}>
                Add New Dental Office
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOffice;
