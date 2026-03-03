import React, { useEffect, useState } from "react";
import styles from "./clinicFirst.module.scss";
import ClinicSetupInto from "../CommonComponent/ClinicSetupInto";
import SideProgressBar from "../CommonComponent/SideProgressBar";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  dentalPracticeDetails,
  updateDentalClinic,
} from "@/app/store/slices/authSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useAppSelector } from "@/app/store/lib/hooks";
import { fetchAllUserData } from "@/app/store/slices/clinicAdminSlices";
import Images from "@/app/Components/Images/Images";
import Image from "next/image";
import { fetchSingleClinic } from "@/app/store/slices/superAdminSlices";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import SetupLater from "../SetupLater";

const ClinicFirstSetup = ({ onNext, setCurrentStep, currentStep }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [clinicId, setClinicId] = useState(null);
  const [isValueChanged, setIsValueChanged] = useState({
    businessName: false,
    officeAddress: false,
  });
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const userInfo = useAppSelector((state) => state.authWeb.userInfo);
  const singleClinicData = useAppSelector(
    (state) => state.admin.singleClinicData
  );
  const [selectedSpecial, setSelectedSpecial] = useState(
    singleClinicData?.data?.dental_specialist || null
  );
  const [values, setValues] = useState({
    businessName: singleClinicData?.data?.clinic_name || null,
    officeAddress: singleClinicData?.data?.clinic_address || null,
  });
  const dispatch = useDispatch();

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
    }
  }, []);

  const speciality = [
    {
      name: "Orthodontist",
    },
    {
      name: "Pedodontist",
    },
    {
      name: "Sport",
    },
    {
      name: "Periodontist",
    },
    {
      name: "General Dentistry",
    },
    {
      name: "Endodontist",
    },
    {
      name: "Cosmetic Dentistry",
    },
  ];

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    if (e.target.name === "businessName") {
      if (e.target.value === singleClinicData?.data?.clinic_name) {
        setIsValueChanged({ businessName: false });
      } else {
        setIsValueChanged({ businessName: true });
      }
    }
    if (e.target.name === "officeAddress") {
      if (e.target.value === singleClinicData?.data?.clinic_address) {
        setIsValueChanged({ officeAddress: false });
      } else {
        setIsValueChanged({ officeAddress: true });
      }
    }
  };

  useEffect(() => {
    if (userInfo?.user?.clinics?.length > 0) {
      const fetchData = async () => {
        if (clinicId) {
          await dispatch(fetchSingleClinic(clinicId));
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [userInfo, currentStep, clinicId]);

  useEffect(() => {
    if (!loading) {
      setValues({
        businessName: singleClinicData?.data?.clinic_name || null,
        officeAddress: singleClinicData?.data?.clinic_address || null,
      });
      setSelectedSpecial(singleClinicData?.data?.dental_specialist);
    }
  }, [loading, singleClinicData]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!values.businessName.trim()) {
      newErrors.businessName = "Business name is required";
      isValid = false;
    }

    if (!values.officeAddress.trim()) {
      newErrors.officeAddress = "Office address is required";
      isValid = false;
    }

    if (selectedSpecial === null) {
      newErrors.selectedSpecial = "Please select your specialty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onboardingDentalPracticeDetails = async (e) => {
    e.preventDefault();
    const validations = {
      businessName: ["required"],
      officeAddress: ["required"],
      selectedSpecial: ["required"],
    };

    const allValues = { ...values, selectedSpecial };

    const errors = validateInput(allValues, validations);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const data = {
      clinic_name: values?.businessName,
      clinic_address: values?.officeAddress,
      dental_specialist: selectedSpecial,
      clinicId: clinicId,
    };
    const clinic = userInfo?.user?.clinics.find(
      (clinic) => clinic?._id === clinicId
    );

    if (clinic?.setup === "create-account") {
      if (
        isValueChanged.businessName === true ||
        isValueChanged.officeAddress === true ||
        selectedSpecial !== singleClinicData?.data?.dental_specialist
      ) {
        try {
          const actionResult = await dispatch(
            updateDentalClinic({ data: data, clinicId: clinicId })
          );
          const { success, message } = unwrapResult(actionResult);
          if (success) {
            toast.success(message);
            setCurrentStep("create-account");
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        setCurrentStep("create-account");
      }
    } else {
      try {
        const actionResult = await dispatch(dentalPracticeDetails(data));
        const { success, message } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
          setCurrentStep("create-account");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSelectData = (name) => {
    setSelectedSpecial(name);
  };

  const goBackToWelcome = () => {
    setCurrentStep("welcome");
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        {userInfo?.user?.clinics?.length > 1 && <SetupLater />}
        <div className={styles.first_step_container}>
          <SideProgressBar currentStep={currentStep} />
          <div className={styles.dental_practice}>
            <div className={styles.dental_practice_txt}>
              <span>Dental</span> Practice Details
            </div>
            <div className={styles.first_input_div}>
              <div className={styles.office_loc}>Dental Business Name</div>
              <div className={styles.ino_with_img}>
                <input
                  className={styles.input_text}
                  type="text"
                  placeholder="Enter your Business Name"
                  name="businessName"
                  value={values?.businessName}
                  onChange={handleInputChange}
                />
              </div>
              {errors.businessName && (
                <div className="error_message">{errors.businessName}</div>
              )}
            </div>
            <div className={styles.first_input_div}>
              <div className={styles.office_loc}>Office Location</div>
              <div className={styles.ino_with_img}>
                <input
                  className={styles.input_text}
                  type="text"
                  placeholder="Enter your Office Location"
                  name="officeAddress"
                  value={values?.officeAddress}
                  onChange={handleInputChange}
                />
                <div className={styles.img_loc}>
                  <Image src={Images.locationIcon2} alt="" />
                </div>
              </div>
              {errors.officeAddress && (
                <div className="error_message">{errors.officeAddress}</div>
              )}
            </div>
            <div className={styles.speciality_with_btns}>
              <div className={styles.choose_dental_box}>
                <div className={styles.choose_speciality}>
                  Choose Your Dental Specialty
                </div>
                <div className={styles.specility_boxes}>
                  {speciality.map((item, key) => (
                    <div
                      className={
                        selectedSpecial === item.name
                          ? styles.activeSpeciality
                          : styles.speciality_btn
                      }
                      key={key}
                      onClick={() => handleSelectData(item.name)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
                {selectedSpecial === undefined && errors.selectedSpecial && (
                  <div className="error_message">{errors.selectedSpecial}</div>
                )}
              </div>
              <div className={styles.first_next_btn}>
                <button className={styles.back_btn} onClick={goBackToWelcome}>
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
                  onClick={onboardingDentalPracticeDetails}
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
          </div>
          <ClinicSetupInto />
        </div>
      </div>
    </>
  );
};

export default ClinicFirstSetup;
