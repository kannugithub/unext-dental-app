import React, { useEffect, useState } from "react";
import styles from "../ClinicSetupSecondStep/secondStepNew.module.scss";
import SideProgressBar from "../CommonComponent/SideProgressBar";
import ClinicSetupInto from "../CommonComponent/ClinicSetupInto";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { stateAreaCodes } from "@/app/Components/common/stateCodeForNumber/StateCode";
import { useDispatch } from "react-redux";
import {
  alreadyPortFaxNumber,
  dentalStateNumberList,
  sendSelectedFaxNumber,
  uploadFaxLoaDocs,
} from "@/app/store/slices/authSlices";
import { useAppSelector } from "@/app/store/lib/hooks";
import BillingForm from "../ClinicSetupSecondStep/BillingForm/BillingForm";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import SetupLater from "../SetupLater";

const ThirdStepFaxNumber = ({
  currentStep,
  setCurrentStep,
  setIsOpenProgress,
}) => {
  const [activeTab, setActiveTab] = useState("newNumber");
  const [limit, setLimit] = useState(10);
  const [selectedValue, setSelectedValue] = useState(
    "Please select state code"
  );
  const [clinicId, setClinicId] = useState(null);
  const [values, setValues] = useState({});
  const [newItems, setNewItems] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedFile, setSelectedFile] = useState({
    bill: { file: null, error: "" },
  });
  const [showBillingPopup, setShowBillingPopup] = useState(false);
  const [isAllDataField, setIsAlldataField] = useState(false);
  const [errors, setErrors] = useState({});
  const [checkNumber, setCheckNumber] = useState(null);
  const getNumbersList = useAppSelector(
    (state) => state.authWeb.getStateNumbersList
  );
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
    }
  }, []);

  // const handleChange = (e) => {
  //   let newValue = e.target.value;
  //   if (e.target.name === "clinicAlreadyPortPhoneNumber") {
  //     newValue = newValue.replace(/\D/g, "");
  //     if (newValue.length === 10) {
  //       const data = {
  //         phoneNumbers: ["+1" + newValue],
  //       };
  //       dispatch(alreadyPortNumber(data));
  //     }
  //   } else {
  //     setSelectedValue(e.target.value);
  //     setSelectedStateCode(e.target.value.replace(/\+1\((\d+)\)/, "$1"));
  //     const data = {
  //       ndc: e.target.value.replace(/\+1\((\d+)\)/, "$1"),
  //       limit: limit,
  //     };
  //     dispatch(dentalStateNumberList(data));
  //   }
  //   setValues({ ...values, [e.target.name]: newValue });
  // };

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (e.target.name === "clinicAlreadyFaxNumber") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length === 10) {
        const data = {
          phoneNumbers: ["+1" + newValue],
        };
        dispatch(alreadyPortFaxNumber(data));
      }
    } else {
      setSelectedValue(e.target.value);
      setSelectedStateCode(e.target.value.replace(/\+1\((\d+)\)/, "$1"));
      const data = {
        ndc: e.target.value.replace(/\+1\((\d+)\)/, "$1"),
        limit: limit,
      };
      dispatch(dentalStateNumberList(data));
    }
    if (errors.selectedValue) {
      setErrors({ ...errors, selectedValue: "" });
    }
    setValues({ ...values, [e.target.name]: newValue });
  };

  useEffect(() => {
    if (getNumbersList?.data) {
      setNewItems(getNumbersList.data.slice(-10));
    }
  }, [getNumbersList?.data]);

  const handleChangeTab = (type) => {
    setActiveTab(type);
  };

  useEffect(() => {
    if (selectedStateCode) {
      handleChange({ target: { value: `+1(${selectedStateCode})` } });
    }
  }, [limit]);

  const numbersList = [
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
    {
      number: "+1 (564)- 852 6328",
    },
  ];

  // const handleSendFaxNumber = () => {
  //   const data = {
  //     phoneNumber: selectedValue,
  //   };
  //   dispatch(sendSelectedFaxNumber(data));
  // };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedValue || selectedValue === "Please select state code") {
      newErrors.selectedValue = "Please select state code";
      isValid = false;
    }

    if (!checkNumber || checkNumber === "+") {
      newErrors.selectedNumber = "Please select any number from below";
      isValid = false;
    }

    if (newItems.length === 0) {
      newErrors.newItems = "Please select a number from below";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSendFaxNumber = async () => {
    const cleanedPhoneNumber = "+" + selectedValue.replace(/\D/g, "");
    setCheckNumber(cleanedPhoneNumber);
    const data = {
      fax_phone: cleanedPhoneNumber,
      clinicId: clinicId,
      employeeId: userInfoData?.user?._id,
    };
    if (validateForm()) {
      try {
        const actionResult = await dispatch(sendSelectedFaxNumber(data));
        const { success, message } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
          setIsOpenProgress(true);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleUpload = (type) => (e) => {
    const file = e.target.files[0];
    const fileType = file["type"];
    const validImageTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (file && validImageTypes.includes(fileType)) {
      setSelectedFile((prevState) => ({
        ...prevState,
        [type]: { file, error: "" },
      }));
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadFaxLoaDocs(formData));
    } else {
      setSelectedFile((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          error: "Please select a PDF, PNG, or JPEG file.",
        },
      }));
    }
  };

  const validateAlreadyForm = () => {
    let isValid = true;
    const newErrors = {};
    if (
      !values.clinicAlreadyFaxNumber ||
      values.clinicAlreadyFaxNumber.length !== 10
    ) {
      newErrors.clinicAlreadyFaxNumber = "Please enter your phone number";
      isValid = false;
    }
    if (!selectedFile.bill.file) {
      newErrors.bill = "Please upload the bill document";
    }
    if (!showBillingPopup) {
      newErrors.showBillingPopup = "Please sign loa";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return isValid;
  };

  const handleAreadyHaveClinicNumber = () => {
    const isValid = validateAlreadyForm();
    if (isValid) {
      if (
        values.clinicAlreadyFaxNumber &&
        selectedFile.bill.file &&
        showBillingPopup
      ) {
        setIsAlldataField(true);
      }
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
    <>
      <div
        className={
          isDarkTheme ? styles.darkHeader : styles.second_popup_container
        }
      >
        {userInfo?.user?.clinics?.length > 1 && <SetupLater />}
        <SideProgressBar currentStep={currentStep} />
        {isAllDataField ? (
          <BillingForm
            setIsAlldataField={setIsAlldataField}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        ) : (
          <div className={styles.pic_newNumber_control}>
            <div className={styles.pic_number_tag}>
              <span>Setup A New e-Fax </span>
              or Move Existing One
            </div>
            <div className={styles.numbers_tab}>
              <div
                className={`${styles.get_new_number} ${
                  activeTab === "newNumber" ? styles.activeNumberClass : ""
                }`}
                onClick={() => handleChangeTab("newNumber")}
              >
                get a new e-fax number
              </div>

              <div
                className={`${styles.get_new_number} ${
                  activeTab === "alreadyNumber" ? styles.activeNumberClass : ""
                }`}
                onClick={() => handleChangeTab("alreadyNumber")}
              >
                already have e-fax Number
              </div>
            </div>
            {activeTab === "newNumber" && (
              <div className={styles.select_newNumber}>
                <div className={styles.select_state}>Select state code</div>
                <select value={selectedValue} onChange={handleChange}>
                  <option value="Please select state code">
                    Please select state code
                  </option>
                  {Object.keys(stateAreaCodes).map((state) =>
                    stateAreaCodes[state].map((areaCode) => (
                      <option
                        value={`+1(${areaCode})`}
                        key={`${state}-${areaCode}`}
                      >
                        +1({areaCode})
                      </option>
                    ))
                  )}
                  <option value={selectedValue} hidden>
                    {selectedValue}
                  </option>
                </select>
                {errors.selectedValue && (
                  <div className="error_message">{errors.selectedValue}</div>
                )}
                {!errors.selectedValue && errors.selectedNumber && (
                  <div className="error_message">{errors.selectedNumber}</div>
                )}
                <div className={styles.allMobile_numbers}>
                  {newItems?.map((item, key) => (
                    <div
                      className={styles.numbers_options}
                      key={key}
                      onClick={() => {
                        const formattedNumber = `+1(${item.phone_number?.slice(
                          2,
                          5
                        )}) ${item.phone_number?.slice(5)}`;
                        setSelectedValue(formattedNumber);
                        setErrors({ selectedNumber: "" });
                      }}
                    >
                      {item.phone_number}
                    </div>
                  ))}
                </div>
                {newItems?.length === 10 && (
                  <div
                    className={styles.viewmore}
                    onClick={() => {
                      setLimit((prevLimit) => prevLimit + 10);
                    }}
                  >
                    <div className={styles.view_more_txt}>view more</div>
                  </div>
                )}
                <div className={styles.first_next_btn}>
                  <button
                    className={styles.back_btn}
                    onClick={() => setCurrentStep("create-account")}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                      >
                        <path
                          d="M8 0.808333L7.1375 0L0 6.66667L7.1375 13.3333L8 12.5292L1.72917 6.66667L8 0.808333Z"
                          fill="#409EEE"
                        />
                      </svg>
                    </div>
                    <span>Back</span>
                  </button>
                  <button
                    className={styles.next_btn}
                    onClick={handleSendFaxNumber}
                  >
                    <span>Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                    >
                      <path
                        d="M0 0.808333L0.8625 0L8 6.66667L0.8625 13.3333L0 12.5292L6.27083 6.66667L0 0.808333Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            {activeTab === "alreadyNumber" && (
              <div className={styles.select_newNumber}>
                <div className={styles.select_state}>
                  Enter clinic Fax Number
                </div>
                {/* <input type="text" placeholder="00000000000" /> */}
                <input
                  className={styles.input_text}
                  type="text"
                  placeholder="+1 (201) 852-1254"
                  name="clinicAlreadyFaxNumber"
                  maxLength={10}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                {errors.clinicAlreadyFaxNumber && (
                  <div className="error_message">
                    {errors.clinicAlreadyFaxNumber}
                  </div>
                )}
                <div className={styles.filesUpload_div}>
                  <div className={styles.upload_loa_box}>
                    <div>Upload bill</div>
                    <div className={styles.upload_control}>
                      <div className={styles.upload_img_div}>
                        <Image src={Images.uploadIcon} alt="" />
                      </div>
                      <div className={styles.upload_control_txt}>
                        upload bill
                      </div>
                      <div className={styles.files_accept}>
                        Accepted file: JPEG, Doc, PDF, PNG
                      </div>
                      {selectedFile?.bill?.file?.name && (
                        <div className={styles.selectedFileName}>
                          {selectedFile?.bill?.file?.name}
                        </div>
                      )}
                      <div className={styles.upload_files_btn}>
                        <label htmlFor="uploadBill">Upload File</label>
                        <input
                          type="file"
                          id="uploadBill"
                          onChange={handleUpload("bill")}
                        />
                        {selectedFile.bill.error && (
                          <p style={{ color: "red" }}>
                            {selectedFile.bill.error}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.filesUpload_div}>
                  <div className={styles.upload_loa_box}>
                    {selectedFile?.bill?.file === null
                      ? errors.bill && (
                          <div className="error_message">{errors.bill}</div>
                        )
                      : ""}
                  </div>
                </div>
                <div className={styles.download_loa}>
                  <div className={styles.add_billing}>
                    <div>
                      <input
                        type="checkbox"
                        onChange={() => setShowBillingPopup(!showBillingPopup)}
                      />
                    </div>
                    <div>Sign LOA</div>
                  </div>
                </div>
                <div className={styles.upload_loa_box}>
                  {errors.showBillingPopup && (
                    <div className="error_message">
                      {errors.showBillingPopup}
                    </div>
                  )}
                </div>
                <div className={styles.first_next_btn}>
                  <button
                    className={styles.back_btn}
                    onClick={() => setCurrentStep("create-account")}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                      >
                        <path
                          d="M8 0.808333L7.1375 0L0 6.66667L7.1375 13.3333L8 12.5292L1.72917 6.66667L8 0.808333Z"
                          fill="#409EEE"
                        />
                      </svg>
                    </div>
                    <span>Back</span>
                  </button>
                  <button
                    className={styles.next_btn}
                    onClick={handleAreadyHaveClinicNumber}
                  >
                    <span>Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                    >
                      <path
                        d="M0 0.808333L0.8625 0L8 6.66667L0.8625 13.3333L0 12.5292L6.27083 6.66667L0 0.808333Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <ClinicSetupInto />
      </div>
    </>
  );
};

export default ThirdStepFaxNumber;
