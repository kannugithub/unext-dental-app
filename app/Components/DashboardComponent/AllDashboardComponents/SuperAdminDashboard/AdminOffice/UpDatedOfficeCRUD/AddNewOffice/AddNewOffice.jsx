import React, { useEffect, useState } from "react";
import styles from "./addNewOffice.module.scss";
import { useAppSelector } from "@/app/store/lib/hooks";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOfficeFromSuperAdmin,
  editNewOfficeFromSuperAdmin,
  fetchNumberList,
} from "@/app/store/slices/superAdminSlices";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import ButtonSpinnerLoader from "@/app/Components/common/SpinnerLoader/ButtonSpinnerLoader";

const AddNewOffice = ({
  setOpenNewOfficePopup,
  closeAddOfficePopup,
  setOpenThankuPopup,
  getOfficeId,
}) => {
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [selectedFax, setSelectedFax] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    clinic_name: "",
    clinic_address: "",
    dental_specialist: "",
    selectedPhone: null,
    selectedFax: null,
  });
  const [errors, setErrors] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const signupSubscriptionData = useAppSelector(
    (state) => state.authWeb.signupSubscriptionData
  );
  const getNumberListData = useAppSelector(
    (state) => state.admin.getNumberListData
  );
  const clinicListData = useAppSelector((state) => state.admin.clinicListData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkTheme === "dark" ? "rgb(55, 54, 54)" : "#fff",
      color: isDarkTheme === "dark" ? "#fff" : "#000",
      border:
        isDarkTheme === "dark"
          ? "1px solid rgba(255, 255, 255, 0.09)"
          : "1px solid rgba(44, 74, 91, 0.22)",
      padding: "2px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDarkTheme ? "rgb(55 54 54)" : "#fff",
      color: isDarkTheme ? "#fff" : "#1E3441",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDarkTheme ? "#fff" : "#1E3441",
    }),
    input: (provided) => ({
      ...provided,
      color: isDarkTheme ? "#fff" : "#1E3441",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDarkTheme ? "#fff" : "#1E3441",
      opacity: isDarkTheme ? 0.8 : 1,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? isDarkTheme
          ? "rgb(75 74 74)"
          : "#e6e6e6"
        : isDarkTheme
        ? "rgb(55 54 54)"
        : "#fff",
      color: isDarkTheme ? "#fff" : "#1E3441",
      cursor: "pointer",
    }),
  };

  useEffect(() => {
    if (getOfficeId) {
      const officeData = clinicListData?.data?.find(
        (clinic) => clinic._id === getOfficeId
      );
      console.log("officeData", officeData);
      if (officeData) {
        setValues({
          clinic_name: officeData.clinic_name,
          clinic_address: officeData.clinic_address,
          dental_specialist: officeData.dental_specialist,
          selectedPhone: {
            value: officeData.clinic_phone,
            label: officeData.clinic_phone,
          },
          selectedFax: {
            value: officeData.fax_phone,
            label: officeData.fax_phone,
          },
        });
        setSelectedPhone({
          value: officeData.clinic_phone,
          label: officeData.clinic_phone,
        });
        setSelectedFax({
          value: officeData.fax_phone,
          label: officeData.fax_phone,
        });
      }
    }
  }, [getOfficeId, clinicListData]);

  useEffect(() => {
    dispatch(fetchNumberList());
  }, [dispatch]);

  const phoneOptions = getNumberListData?.data?.map((number) => ({
    value: number,
    label: number,
  })) || [{ value: "", label: "None" }];

  const faxOptions = getNumberListData?.data?.map((number) => ({
    value: number,
    label: number,
  })) || [{ value: "", label: "None" }];

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleAddNewOffice = async (e) => {
    e.preventDefault();

    const validations = {
      clinic_name: ["required"],
      clinic_address: ["required"],
      dental_specialist: ["required"],
      selectedPhone: ["required"],
      selectedFax: ["required"],
    };

    const validationErrors = validateInput(values, validations);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      clinicId:
        signupSubscriptionData?.data?.userData?.clinics?.[0] || getOfficeId,
      clinic_name: values?.clinic_name,
      clinic_address: values?.clinic_address,
      dental_specialist: values?.dental_specialist,
      clinic_phone: values?.selectedPhone?.value,
      fax_phone: values?.selectedFax?.value,
    };

    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      let actionResult;
      if (getOfficeId) {
        data._id = getOfficeId;
        const officeId = getOfficeId;
        actionResult = await dispatch(
          editNewOfficeFromSuperAdmin({ officeId, data })
        );
      } else {
        actionResult = await dispatch(addNewOfficeFromSuperAdmin(data));
      }

      const { success, message } = unwrapResult(actionResult);
      if (success) {
        setOpenNewOfficePopup(false);
        closeAddOfficePopup();
        toast.success(message);
        setOpenThankuPopup(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || "Error adding/updating office");
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.new_office_control}>
          <div className={styles.popup_close_icon}>
            {isDarkTheme ? (
              <Image
                src={Images?.crossIcon}
                alt="cross icon"
                onClick={() => setOpenNewOfficePopup(false)}
              />
            ) : (
              <Image
                src={Images?.blackCrossIcon}
                alt="cross icon"
                onClick={() => setOpenNewOfficePopup(false)}
              />
            )}
          </div>
          <div className={styles.add_new_office_container}>
            <div className={styles.enter_office}>
              {" "}
              {getOfficeId ? "edit" : "enter"} office information
            </div>
            <div className={styles.fill_credentials}>
              Fill in your credentials and click on the Save button
            </div>
            <div className={styles.dental_form_container}>
              <div className={styles.form_inp_box}>
                <div className={styles.dental_inp_lebel}>
                  Dental Business Name
                </div>
                <input
                  type="text"
                  placeholder="Enter Business Name"
                  name="clinic_name"
                  value={values?.clinic_name}
                  onChange={onInputChange}
                />
                {errors.clinic_name && (
                  <div className="error_message">{errors.clinic_name}</div>
                )}
              </div>
              <div className={styles.form_inp_box}>
                <div className={styles.dental_inp_lebel}>Office Location</div>
                <input
                  type="text"
                  placeholder="Enter Office Location"
                  name="clinic_address"
                  value={values?.clinic_address}
                  onChange={onInputChange}
                />
                {errors.clinic_address && (
                  <div className="error_message">{errors.clinic_address}</div>
                )}
              </div>
              <div className={styles.form_inp_box}>
                <div className={styles.dental_inp_lebel}>Dental Specialty</div>
                <select
                  name="dental_specialist"
                  value={values?.dental_specialist}
                  onChange={onInputChange}
                >
                  <option value="">Select Specialty</option>
                  <option value="Orthodontist">Orthodontist</option>
                  <option value="Pedodontist">Pedodontist</option>
                  <option value="Sport">Sport</option>
                  <option value="Periodontist">Periodontist</option>
                  <option value="General Dentistry">General Dentistry</option>
                  <option value="Endodontist">Endodontist</option>
                  <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                </select>
                {errors.dental_specialist && (
                  <div className="error_message">
                    {errors.dental_specialist}
                  </div>
                )}
              </div>
              <div className={styles.form_inp_box}>
                <div className={styles.dental_inp_lebel}>
                  Select Phone Number
                </div>
                <Select
                  options={phoneOptions}
                  isSearchable
                  isClearable
                  styles={customStyles}
                  value={selectedPhone}
                  onChange={setSelectedPhone}
                  placeholder="Select phone number"
                />
                {errors.selectedPhone && (
                  <div className="error_message">{errors.selectedPhone}</div>
                )}
              </div>
              <div className={styles.form_inp_box}>
                <div className={styles.dental_inp_lebel}>Select Fax Number</div>
                <Select
                  options={faxOptions}
                  isSearchable
                  isClearable
                  styles={customStyles}
                  value={selectedFax}
                  onChange={setSelectedFax}
                  placeholder="Select fax number"
                />
                {errors.selectedFax && (
                  <div className="error_message">{errors.selectedFax}</div>
                )}
              </div>
              <div className={styles.add_office_buttons}>
                <button
                  className={styles.save_new_office}
                  onClick={handleAddNewOffice}
                  disabled={isLoading}
                >
                  <span>save</span>
                  {isLoading && <ButtonSpinnerLoader />}
                </button>
                <div
                  className={styles.skip_add_office}
                  onClick={() => setOpenNewOfficePopup(false)}
                >
                  skip
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewOffice;
