import React, { useState } from "react";
import styles from "./update.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import { useAppDispatch } from "@/app/store/lib/hooks";
import { useRouter } from "next/navigation";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addClinic } from "@/app/store/slices/superAdminSlices";
import { addAdminClinic } from "@/app/store/slices/clinicAdminSlices";
import { toast } from "react-toastify";

const UpdateDentalOfficePopup = ({ clinicId, setUpdatePopup }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const InputHandleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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

  const SubmitDentalOffice = async (e) => {
    e.preventDefault();

    const inputErrors = validateInput(values);

    // setErrors(inputErrors);
    // if (Object.keys(inputErrors).length > 0) {
    //   console.log("dawdaw", inputErrors);
    //   return;
    // }

    const formData = new FormData();
    formData.append("clinic_name", values.officeName);
    formData.append("clinic_email", values.email);
    formData.append("clinic_phone", values.mobileNumber);
    formData.append("clinic_address", values.officeAddress);
    formData.append("fax_phone", values.faxNumber);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    dispatch(addAdminClinic(formData))
      .then((action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
          setUpdatePopup(false);
        } else if (action.error) {
          toast.error(action.error.message);
          setUpdatePopup(false);
        }
      })
      .catch((error) => {
        toast.error(error.message || "Error adding Office");
      });
  };
  return (
    <>
      <div className={styles.update_container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
        >
          <path
            d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
            fill="black"
          />
        </svg>
        <div className={styles.main_wrapper}>
          <div className={styles.headline}>
            <h3>Add New Office</h3>
          </div>
          <div className={styles.form_wrapper}>
            <div className={styles.input_box}>
              <label htmlFor="">Office Name</label>
              <input
                type="text"
                placeholder="Enter Office Name"
                name="officeName"
                onChange={InputHandleChange}
              />
            </div>
            {errors.officeName && (
              <div className="error_message">{errors.officeName}</div>
            )}
            <div className={styles.input_box}>
              <label htmlFor="">Office Number</label>
              <input
                type="text"
                placeholder="Enter Office Number"
                name="mobileNumber"
                onChange={InputHandleChange}
              />
            </div>
            {errors.mobileNumber && (
              <div className="error_message">{errors.mobileNumber}</div>
            )}
            <div className={styles.input_box}>
              <label htmlFor="">e-fax Number</label>
              <input
                type="text"
                placeholder="Enter Office Fax Number"
                name="faxNumber"
                onChange={InputHandleChange}
              />
            </div>
            {errors.faxNumber && (
              <div className="error_message">{errors.faxNumber}</div>
            )}
            <div className={styles.input_box}>
              <label htmlFor="">email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={InputHandleChange}
              />
            </div>
            {errors.email && (
              <div className="error_message">{errors.email}</div>
            )}
            <div className={styles.input_box}>
              <label htmlFor="">Office Location</label>
              <input
                type="text"
                placeholder="Enter Office Location"
                name="officeAddress"
                onChange={InputHandleChange}
              />
            </div>
            {errors.officeAddress && (
              <div className="error_message">{errors.officeAddress}</div>
            )}

            <div className={styles.input_box}>
              <label htmlFor="">Office image</label>
              {/* <div className={styles.upload_fax_txt}>Upload Fax</div> */}

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
                    <div className={styles.img_wrapper}>
                      <div className={styles.img_box_wrappper}>
                        <Image src={Images.uploadIcon} alt="" />
                      </div>
                      <div className={styles.upload_sent_docs}>
                        upload Document
                      </div>
                    </div>
                    <div className={styles.inptDiv}>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="doc/* pdf/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>
                    <p style={{ color: "#000", textAlign: "center" }}>
                      {selectedFile?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <button onClick={SubmitDentalOffice}>Add Office</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDentalOfficePopup;
