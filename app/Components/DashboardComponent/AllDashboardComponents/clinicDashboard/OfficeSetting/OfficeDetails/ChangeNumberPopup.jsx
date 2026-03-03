import React, { useEffect, useState } from "react";
import styles from "./changenumber.module.scss";
import { stateAreaCodes } from "@/app/Components/common/stateCodeForNumber/StateCode";
import { useAppSelector } from "@/app/store/lib/hooks";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  alreadyPortFaxNumber,
  alreadyPortNumber,
  dentalStateNumberList,
  sendSelectedClinicPhoneNumber,
  sendSelectedFaxNumber,
  uploadLoaDocs,
} from "@/app/store/slices/authSlices";
import { toast } from "react-toastify";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";

const ChangeNumberPopup = ({ closePopup, clinic_phone }) => {
  const [activeTab, setActiveTab] = useState("newNumber");
  const [values, setValues] = useState({});
  const [selectedFile, setSelectedFile] = useState({
    loa: { file: null, error: "" },
    bill: { file: null, error: "" },
  });
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [newItems, setNewItems] = useState([]);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState("");
  const [showBillingPopup, setShowBillingPopup] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const getNumbersList = useAppSelector(
    (state) => state.authWeb.getStateNumbersList
  );
  const getAlreadyPortNumbers = useAppSelector(
    (state) => state.authWeb.getAlreadyPortNumber
  );
  const getUploadDocsData = useAppSelector(
    (state) => state.authWeb.getUploadDocsData
  );
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  // const [selectedOption, setSelectedOption] = useState(null);

  // const options = Object.keys(stateAreaCodes).flatMap((state) =>
  //   stateAreaCodes[state].map((areaCode) => ({
  //     value: areaCode,
  //     label: `+1(${areaCode}) ${state}`,
  //   }))
  // );

  // const handleChange = (option) => {
  //   setSelectedOption(option);
  // };
  const [selectedValue, setSelectedValue] = useState(
    "Please select state code"
  );

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (e.target.name === "clinicAlreadyPortPhoneNumber") {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length === 10) {
        const data = {
          phoneNumbers: ["+1" + newValue],
        };
        dispatch(alreadyPortNumber(data));
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
    setValues({ ...values, [e.target.name]: newValue });
  };

  const handleChangeTab = (type) => {
    setActiveTab(type);
  };

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
      dispatch(uploadLoaDocs(formData));
    } else {
      setSelectedFile((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          error:
            "File cannot be uploaded. Please select a PDF, PNG, or JPEG file.",
        },
      }));
    }
  };

  useEffect(() => {
    if (getNumbersList?.data) {
      setNewItems(getNumbersList.data.slice(-10));
    }
  }, [getNumbersList?.data]);

  useEffect(() => {
    if (selectedStateCode) {
      handleChange({ target: { value: `+1(${selectedStateCode})` } });
    }
  }, [limit]);
  const handleSendNumber = async () => {
    const cleanedPhoneNumber = "+" + selectedValue.replace(/\D/g, "");
    const data = {
      clinic_phone: cleanedPhoneNumber,
      clinicId: userInfoData?.user?.clinics?.[0]?._id,
      employeeId: userInfoData?.user?._id,
    };
    try {
      const actionResult = await dispatch(sendSelectedClinicPhoneNumber(data));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        onNext("setup-number");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAreadyHaveClickNumber = async () => {
    const data = {
      id: getAlreadyPortNumbers?.data?.portingOrderResponse?.data?.[0]?.id,
      phone_number: values?.clinicAlreadyPortPhoneNumber,
      uploadLoaId: getUploadDocsData?.data?.data?.id,
    };
    // try {
    //   const actionResult = await dispatch(saveClinicPortNumbersInfo(data));
    //   const { success, message } = unwrapResult(actionResult);
    //   if (success) {
    //     toast.success(message);
    //     onNext("setup-number");
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
    // dispatch(saveClinicPortNumbersInfo(data))
  };
  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.ChangeNumberPopup_wrapper}>
        {isDarkTheme === "dark" ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => closePopup(false)}
          >
            <path
              d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            onClick={() => closePopup(false)}
          >
            <path
              d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
              fill="black"
            />
          </svg>
        )}
        <div className={styles.main_wrapper}>
          <div className={styles.headline}>
            <h1>
              Pick A New Number
              <span> or Port Your Current One</span>{" "}
            </h1>
          </div>
          <div className={styles.card_wrapper}>
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
              <div className={styles.allMobile_numbers}>
                {newItems.map((item, key) => (
                  <div
                    className={styles.numbers_options}
                    key={key}
                    onClick={() => {
                      const formattedNumber = `+1(${item.phone_number.slice(
                        2,
                        5
                      )}) ${item.phone_number.slice(5)}`;
                      setSelectedValue(formattedNumber);
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
                  {/* <Image src={Images.viewMoreLoading} alt="" /> */}
                </div>
              )}
              <div className={styles.first_next_btn}>
                <button className={styles.next_btn} onClick={handleSendNumber}>
                  <span>Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeNumberPopup;
