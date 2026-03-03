import React, { useEffect, useState } from "react";
import styles from "./billingForm.module.scss";
import { useDispatch } from "react-redux";
import {
  sendBillingInfo,
  sendFaxBillingInfo,
} from "@/app/store/slices/authSlices";
import Link from "next/link";
import { useAppSelector } from "@/app/store/lib/hooks";
import { validateInput } from "@/app/Components/common/ValidateInput/validateInput";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { Router } from "next/router";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const BillingForm = ({
  setIsAlldataField,
  faxPortNumber,
  setCurrentStep,
  currentStep,
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loaCheck, setLoaCheck] = useState(false);
  const getAlreadyPortNumber = useAppSelector(
    (state) => state.authWeb.getAlreadyPortNumber
  );

  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  // const isDarkTheme = localStorage.getItem("theme");
  const getUploadDocsData = useAppSelector(
    (state) => state.authWeb.getUploadDocsData
  );
  const userInfo = useAppSelector((state) => state.authWeb.userInfo);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    const trimmedValue = newValue.trim();
    if (
      e.target.name === "postalCode" ||
      e.target.name === "billingPhoneNumber" ||
      e.target.name === "numberPorted" ||
      e.target.name === "accountNumber" ||
      e.target.name === "pin_passcode" ||
      e.target.name === "streetNumber"
    ) {
      newValue = trimmedValue.replace(/\D/g, "");
    } else {
      newValue = trimmedValue;
    }
    if (e.target.name === "loaCheck") {
      setLoaCheck(e.target.checked);
    }
    setValues({ ...values, [e.target.name]: newValue });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleBillingData = async () => {
    const validations = {
      companyName: ["required"],
      accountNumber: ["required"],
      authPersonName: ["required"],
      billingPhoneNumber: ["required"],
      taxIdentifier: ["required"],
      extendedAddress: ["required"],
      locality: ["required"],
      carrierName: ["required"],
      postalCode: ["required"],
      streetAddress: ["required"],
      numberPorted: ["required"],
      authSign: ["required"],
      printName: ["required"],
      loaDate: ["required"],
      business_identifier: ["required"],
      entity_name: ["required"],
      pin_passcode: ["required"],
      administrative_area: ["required"],
      loaCheck: ["required"],
      state: ["required"],
      city: ["required"],
      streetNumber: ["required"],
    };

    const allValues = { ...values, loaCheck };

    const errors = validateInput(allValues, validations);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("Validation errors:", errors);
      return;
    }
    const data = {
      account_number: values.accountNumber,
      auth_person_name: values.authPersonName,
      billing_telephone_number: values.billingPhoneNumber,
      business_identifier: values.business_identifier,
      country_code: values.countryCode || "+1",
      tax_identifier: values.taxIdentifier,
      extended_address: values.extendedAddress,
      locality: values.locality,
      postal_code: values.postalCode,
      street_address: values.streetAddress,
      entity_name: values.entity_name,
      pin_passcode: values.pin_passcode,
      administrative_area: values.administrative_area,
      print_name: values.printName,
      authorization_signature: values.authSign,
      carrier_name: values.carrierName,
      ported_numbers: values.numberPorted,
      state: values.state,
      city: values.city,
      street_number: values.streetNumber,
      portingOrderId:
        getAlreadyPortNumber?.data?.portingOrderResponse?.data?.[0]?.id,
      invoice: getUploadDocsData?.data?.data?.id,
      clinicId: userInfo?.user?.clinics?.[0]?._id,
      setup: currentStep === "setup-number" ? "setup-fax" : currentStep,
    };

    if (userInfo?.user?.clinics?.[0]?.setup === "setup-number") {
      try {
        const actionResult = await dispatch(sendBillingInfo(data));
        const { success, message } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const actionResult = await dispatch(sendBillingInfo(data));
        const { success, message } = unwrapResult(actionResult);
        if (success) {
          toast.success(message);
          setCurrentStep("setup-number");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div
        className={
          isDarkTheme ? styles.darkHeader : styles.billing_form_container
        }
        id="billingForm"
      >
        <div className={styles.billing_title}>Letter of Agency (LOA)</div>
        <div className={styles.loa_instruction}>
          This letter authorizes UNEXTCOMM LLC to initiate a port request. All
          information must be entered exactly as shown on the customer service
          record (CSR) of the current carrier. In addition to completing this
          form, you will need to provide a copy of your latest bill/invoice.
        </div>
        <div className={styles.all_inp_fields}>
          <div className={styles.account_name}>
            <div className={styles.account_name_label}>
              Account or Company Name
            </div>

            <input
              className={styles.input_texts}
              type="text"
              name="companyName"
              placeholder="company name"
              onChange={handleInputChange}
            />
            {errors?.companyName && (
              <div className="error_message">{errors?.companyName}</div>
            )}
          </div>
          <div className={styles.csr_txt}>
            From The Customer Service Record (CSR)
          </div>
          <div className={styles.useService}>
            Use the Service Address, not the Billing Address (unless they are
            the same)
          </div>
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>account number</label>
              <div>
                <input
                  className={styles.input_texts}
                  type="text"
                  placeholder="Enter your Account Number"
                  name="accountNumber"
                  value={values?.accountNumber}
                  onChange={handleInputChange}
                  maxLength={16}
                />
                {errors?.accountNumber && (
                  <div className="error_message">{errors?.accountNumber}</div>
                )}
              </div>
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>auth person name</label>
              <div>
                <input
                  className={styles.input_texts}
                  type="text"
                  placeholder="Enter your Person Name"
                  name="authPersonName"
                  onChange={handleInputChange}
                />
                {errors?.authPersonName && (
                  <div className="error_message">{errors?.authPersonName}</div>
                )}
              </div>
            </div>
          </div>
          {/* <div className={styles.error_forms}>
            {errors?.accountNumber && (
              <div className={styles.errors_web_form}>
                <div className="error_message">{errors?.accountNumber}</div>
              </div>
            )}
            {errors?.authPersonName && (
              <div className={styles.errors_web_form}>
                <div className="error_message">{errors?.authPersonName}</div>
              </div>
            )}
          </div> */}
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>billing phone number</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter your Billing Number"
                name="billingPhoneNumber"
                value={values.billingPhoneNumber}
                onChange={handleInputChange}
                maxLength={10}
              />
              {errors?.billingPhoneNumber && (
                <div className="error_message">
                  {errors?.billingPhoneNumber}
                </div>
              )}
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>tax identifier</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter tax identifier"
                name="taxIdentifier"
                onChange={handleInputChange}
              />
              {errors?.taxIdentifier && (
                <div className="error_message">{errors?.taxIdentifier}</div>
              )}
            </div>
          </div>
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>business identifier</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter your business identifier"
                name="business_identifier"
                value={values.business_identifier}
                onChange={handleInputChange}
              />
              {errors?.business_identifier && (
                <div className="error_message">
                  {errors?.business_identifier}
                </div>
              )}
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>Entity name</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter entity name"
                name="entity_name"
                onChange={handleInputChange}
              />
              {errors?.entity_name && (
                <div className="error_message">{errors?.entity_name}</div>
              )}
            </div>
          </div>
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>pin passcode</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter your pin passcode"
                name="pin_passcode"
                value={values.pin_passcode}
                onChange={handleInputChange}
                maxLength={6}
              />
              {errors?.pin_passcode && (
                <div className="error_message">{errors?.pin_passcode}</div>
              )}
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>administrative area</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter administrative area"
                name="administrative_area"
                onChange={handleInputChange}
              />
              {errors?.administrative_area && (
                <div className="error_message">
                  {errors?.administrative_area}
                </div>
              )}
            </div>
          </div>
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>Carrier Name</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter carrier name"
                name="carrierName"
                onChange={handleInputChange}
              />
              {errors?.carrierName && (
                <div className="error_message">{errors?.carrierName}</div>
              )}
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>extended address</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter extended address"
                name="extendedAddress"
                onChange={handleInputChange}
              />
              {errors?.extendedAddress && (
                <div className="error_message">{errors?.extendedAddress}</div>
              )}
            </div>
          </div>
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>locality</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter locality"
                name="locality"
                onChange={handleInputChange}
              />
              {errors?.locality && (
                <div className="error_message">{errors?.locality}</div>
              )}
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>country code</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter country code"
                name="countryCode"
                value="+1"
                readOnly
              />
            </div>
          </div>
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>postal code</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter  postal code"
                name="postalCode"
                maxLength={6}
                value={values.postalCode}
                onChange={handleInputChange}
              />
              {errors?.postalCode && (
                <div className="error_message">{errors?.postalCode}</div>
              )}
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>State</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter state"
                name="state"
                onChange={handleInputChange}
              />
              {errors?.state && (
                <div className="error_message">{errors?.state}</div>
              )}
            </div>
          </div>
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>city</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter city"
                name="city"
                value={values.city}
                onChange={handleInputChange}
              />
              {errors?.city && (
                <div className="error_message">{errors?.city}</div>
              )}
            </div>
            <div className={styles.input_box}>
              <label className={styles.label}>street number</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter street number"
                name="streetNumber"
                value={values.streetNumber}
                onChange={handleInputChange}
              />
              {errors?.streetNumber && (
                <div className="error_message">{errors?.streetNumber}</div>
              )}
            </div>
          </div>
          <div className={styles.inputs_forms}>
            <div className={styles.input_box}>
              <label className={styles.label}>street address</label>
              <input
                className={styles.input_texts}
                type="text"
                placeholder="Enter street address"
                name="streetAddress"
                onChange={handleInputChange}
              />
              {errors?.streetAddress && (
                <div className="error_message">{errors?.streetAddress}</div>
              )}
            </div>
          </div>
          <div className={styles.csr_txt} style={{ marginTop: "15px" }}>
            Numbers to Be Ported:
          </div>
          <div className={styles.useService} style={{ marginTop: "5px" }}>
            Separate with commas. For ranges, use a dash (i.e.
            2163215000-2163215999). Please make a note below if you are
            attaching a separate list of numbers.
          </div>
          <div className={styles.number_ported}>
            <input
              className={styles.input_texts}
              type="text"
              name="numberPorted"
              value={values.numberPorted}
              onChange={handleInputChange}
              maxLength={10}
            />
          </div>
          {errors?.numberPorted && (
            <div className="error_message">{errors?.numberPorted}</div>
          )}
          <div className={styles.csr_txt} style={{ marginTop: "15px" }}>
            Authorized Signature
          </div>
          <div className={styles.number_ported}>
            <input
              className={styles.input_texts}
              type="text"
              name="authSign"
              value={values.authSign}
              onChange={handleInputChange}
            />
          </div>
          {errors?.authSign && (
            <div className="error_message">{errors?.authSign}</div>
          )}
          <div className={styles.printedDate}>
            <div className={styles.printName}>
              <span className={styles.label}>Print Name:</span>
              <input
                className={styles.input_texts}
                type="text"
                name="printName"
                value={values.printName}
                onChange={handleInputChange}
              />
              {errors?.printName && (
                <span className="error_message">{errors?.printName}</span>
              )}
            </div>
            <div className={styles.printName}>
              <label className={styles.label}>Date:</label>
              <input
                className={styles.input_texts}
                type="date"
                name="loaDate"
                value={values.loaDate}
                onChange={handleInputChange}
              />
              {errors?.loaDate && (
                <span className="error_message">{errors?.loaDate}</span>
              )}
            </div>
          </div>
          <div className={styles.warningInform}>
            All fields must be completed. Any invalid or missing information
            will result in delays and/or rejected orders.
          </div>
          <div className={styles.loa_contact_info}>
            <div>Letter of Agency</div>
            <div>(877) 392 - 0652</div>
            <div>
              This form can be emailed to:{" "}
              <a href="mailto:support@unextcomm.com">support@unextcomm.com</a>
            </div>
          </div>
          <div className={styles.terms_check}>
            <input
              className={styles.input_texts}
              type="checkbox"
              name="loaCheck"
              id="loaTermsCheck"
              onChange={handleInputChange}
            />{" "}
            <span htmlFor="loaTermsCheck" className={styles.label}>
              {" "}
              I Accept this <Link href="#">Terms and Conditions</Link>{" "}
            </span>
          </div>
          {errors?.loaCheck && (
            <div className="error_message">{errors?.loaCheck}</div>
          )}
        </div>
        <div className={styles.billing_buttons}>
          <button className={styles.billing_save} onClick={handleBillingData}>
            Save
          </button>
          <button
            className={styles.billing_back}
            onClick={() => setIsAlldataField(false)}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default BillingForm;
