import React, { useEffect, useState } from "react";
import styles from "./addfax.module.scss";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/lib/hooks";
import { addEfax } from "@/app/store/slices/clinicAdminSlices";
import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import RightCustomModal from "@/app/Components/PopupsComponents/RightModal";
import Sendfaxpatient from "../SendfaxPatient/Sendfaxpatient";

const Addfax = ({ setOpenbell }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formateselectedPatient, setFormatedSelectedPatient] = useState(null);
  const [openCreateAppointment, setOpenCreateAppointment] = useState(false);

  const [values, setValues] = useState({
    reciever_number: "",
  });
  const [faxNum, setFaxNum] = useState(null);
  const [userId, setUserId] = useState(null);
  const [logErrors, setLogErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const data = useAppSelector((state) => state.admin.getClinicsDetailsData);
  const userInfo = useAppSelector((state) => state.authWeb.userInfo);
  const recivefaxlistdata = useAppSelector(
    (state) => state?.clinic?.recivefaxlistdata?.data
  );
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );
  const addEfaxList = useAppSelector((state) => state.clinic.addEfaxList);

  useEffect(() => {
    if (selectedPatient) {
      const formattedNumber = selectedPatient.replace(/^\+1/, "");
      setFormatedSelectedPatient(formattedNumber);
    }
  }, [selectedPatient]);

  useEffect(() => {
    setFaxNum(`${singleClinicData?.data?.fax_phone}`);
    setUserId(userInfo?.user?._id);
  }, [singleClinicData, userInfo, addEfaxList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      reciever_number: formateselectedPatient || "",
    }));
  }, [formateselectedPatient]);

  const handleInputChnage = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "reciever_number") {
      newValue = newValue.replace(/\D/g, ""); // Remove all non-digit characters
    }

    setValues({ ...values, [name]: newValue });
    setLogErrors({ ...logErrors, [name]: false });
  };

  const handleClose = () => {
    setOpenCreateAppointment(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setFileError("Please select a file.");
      return;
    }

    const reader = new FileReader();

    const allowedExtensions = ["jpeg", "jpg", "png", "doc", "pdf"];

    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setFileError("Only jpeg, jpg, png, doc, and pdf files are allowed.");
      return;
    }

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setSelectedFile(file);
    };

    reader.readAsDataURL(file);
    setFileError("");
  };

  const clinicID = localStorage.getItem("clinicId");
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!values?.reciever_number) {
      errors.reciever_number = "Please enter fax number.";
      isValid = false;
    } else if (!/^\d{10}$/.test(values.reciever_number)) {
      errors.reciever_number = "Fax number should be 10 digits";
      isValid = false;
    }

    if (!selectedFile) {
      setFileError("Please select a file.");
      isValid = false;
    } else {
      setFileError(null);
    }

    setLogErrors(errors);
    return isValid;
  };

  const handleAddNewUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (fileError) {
      toast.error(fileError);
      return;
    }

    const formData = new FormData();
    formData.append("clinic_id", clinicID);
    formData.append("sender_id", userId);
    formData.append("sender_number", faxNum);
    formData.append("reciever_number", `+1${values?.reciever_number}`);
    if (selectedFile) {
      formData.append("fax_docs", selectedFile);
    }

    try {
      const actionResult = await dispatch(addEfax(formData));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success("Fax sent successfully");
        // Clear the input fields after success
        setValues({
          reciever_number: "",
        });
        setSelectedFile(null);
        setSelectedImage(null);
        setOpenbell(false)
      }
    } catch (error) {
      toast.error(error.message || "Error sending fax");
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.close_icons}>
          {isDarkTheme === "dark" ? (
            <>
              <div
                className={styles.close_icons_notification}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={Images.whiteclose_icon}
                  onClick={() => setOpenbell(false)}
                ></Image>
              </div>
            </>
          ) : (
            <>
              <div
                className={styles.close_icons_notification}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={Images.blackCrossIcon}
                  onClick={() => setOpenbell(false)}
                ></Image>
              </div>
            </>
          )}
        </div>
        <div className={isDarkTheme === "dark" ? styles.card2 : styles.card2}>
          <form action="">
            <div className="card-body">
              <div className={styles.sentfax_container}>
                <div className={styles.sentMobile_left}>
                  <div className={styles.mobile_number_txt}>Fax Number</div>

                  <div className={styles.input_with}>
                    <div className={styles.input_with_btn}>
                      <input
                        type="text"
                        placeholder="Enter Fax Number"
                        name="reciever_number"
                        maxLength={10}
                        value={values?.reciever_number || ""}
                        onChange={handleInputChnage}
                        required
                      />
                    </div>
                    <div
                      onClick={() => setOpenCreateAppointment(true)}
                      style={{ cursor: "pointer" }}
                    >
                      {isDarkTheme === "dark" ? (
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.72734 6.73537L5.61584 6.72975C4.99596 6.7275 4.48971 7.22925 4.48634 7.85025C4.48409 8.47125 4.98584 8.9775 5.60684 8.97975L6.72734 8.98537V13.4921L5.63834 13.4876C5.01734 13.4843 4.51109 13.9871 4.50884 14.6081C4.50659 15.228 5.00834 15.7343 5.62934 15.7376L6.72734 15.7421V20.2545L5.63834 20.25C5.01734 20.2477 4.51109 20.7495 4.50884 21.3705C4.50659 21.9915 5.00834 22.4977 5.62934 22.5L6.72734 22.5045V26.9955L5.63834 26.991C5.01734 26.9876 4.51109 27.4905 4.50884 28.1115C4.50659 28.7325 5.00834 29.2376 5.62934 29.241L6.72734 29.2455V30.375C6.72734 32.2391 8.23821 33.75 10.1023 33.75C14.0027 33.75 21.9745 33.75 25.8748 33.75C27.739 33.75 29.2498 32.2391 29.2498 30.375V5.625C29.2498 3.76088 27.739 2.25 25.8748 2.25C21.9745 2.25 14.0027 2.25 10.1023 2.25C8.23821 2.25 6.72734 3.76088 6.72734 5.625V6.73537ZM8.97734 29.2545V30.375C8.97734 30.996 9.48134 31.5 10.1023 31.5C14.0027 31.5 21.9745 31.5 25.8748 31.5C26.4958 31.5 26.9998 30.996 26.9998 30.375V5.625C26.9998 5.004 26.4958 4.5 25.8748 4.5C21.9745 4.5 14.0027 4.5 10.1023 4.5C9.48134 4.5 8.97734 5.004 8.97734 5.625V6.74437L10.1293 6.74888C10.7503 6.75112 11.2521 7.25737 11.2498 7.87837C11.2476 8.49937 10.7413 9.00112 10.1203 8.99888L8.97734 8.99437V13.5011L10.1293 13.5056C10.7503 13.5079 11.2521 14.0141 11.2498 14.6351C11.2476 15.2561 10.7413 15.7579 10.1203 15.7556L8.97734 15.7511V20.2635L10.1293 20.2691C10.7503 20.2714 11.2521 20.7776 11.2498 21.3986C11.2476 22.0196 10.7413 22.5214 10.1203 22.5191L8.97734 22.5135V27.0045L10.1293 27.009C10.7503 27.0124 11.2521 27.5186 11.2498 28.1385C11.2476 28.7595 10.7413 29.2624 10.1203 29.259L8.97734 29.2545Z"
                            fill="white"
                            fill-opacity="0.7"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M23.6484 25.877C24.2694 25.877 24.7734 25.373 24.7734 24.752C24.7734 21.6447 22.2546 19.127 19.1484 19.127C16.0423 19.127 13.5234 21.6447 13.5234 24.752C13.5234 25.373 14.0274 25.877 14.6484 25.877H23.6484ZM22.3311 23.627H15.9658C16.4282 22.3163 17.6792 21.377 19.1484 21.377C20.6177 21.377 21.8687 22.3163 22.3311 23.627Z"
                            fill="white"
                            fill-opacity="0.7"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.1478 10.123C17.2915 10.123 15.7852 11.6305 15.7852 13.4868C15.7852 15.343 17.2915 16.8494 19.1478 16.8494C21.004 16.8494 22.5115 15.343 22.5115 13.4868C22.5115 11.6305 21.004 10.123 19.1478 10.123ZM19.1478 12.373C19.762 12.373 20.2615 12.8725 20.2615 13.4868C20.2615 14.101 19.762 14.5994 19.1478 14.5994C18.5335 14.5994 18.0352 14.101 18.0352 13.4868C18.0352 12.8725 18.5335 12.373 19.1478 12.373Z"
                            fill="white"
                            fill-opacity="0.7"
                          />
                        </svg>
                      ) : (
                        <Image src={Images.Efaxbook} alt="" />
                      )}
                    </div>
                  </div>
                  {logErrors.reciever_number && (
                    <div className={styles.error}>
                      {logErrors.reciever_number}
                    </div>
                  )}
                  <div className={styles.upload_fax_txt}>Upload Fax</div>

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
                          <div className={styles.accept_files}>
                            Accepted file types: JPEG, Doc, PDF, PNG
                          </div>
                          <p className={styles.upltext}>{selectedFile?.name}</p>
                          <div className={styles.uplBtn}>
                            <div className={styles.upload_file_btn}>
                              Upload FIle
                            </div>
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
                      </div>
                    </div>

                    {fileError && (
                      <div className={styles.error}>{fileError}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.sent_fax_btn}>
                <button type="submit" onClick={handleAddNewUser}>
                  Send Fax
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {openCreateAppointment && (
        <RightCustomModal
          isOpen={openCreateAppointment}
          onClose={handleClose}
          width="30w"
          shouldCloseOnOutsideClick={true}
        >
          <Sendfaxpatient
            setOpenCreateAppointment={setOpenCreateAppointment}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
          />
        </RightCustomModal>
      )}
    </>
  );
};

export default Addfax;
