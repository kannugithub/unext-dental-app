// export const validateInput = (
//   values,
//   validations,
//   selectedImage,
//   activePlan
// ) => {
//   let errors = {};

//   for (const field in validations) {
//     // Only validate the field if it's present in the values object
//     if (values[field] !== undefined) {
//       const rules = validations[field];

//       for (const rule of rules) {
//         switch (rule) {
//           case "required":
//             if (values[field].trim() === "") {
//               errors[field] = `${field} is required`;
//             }
//             break;
//           case "email":
//             if (!/\S+@\S+\.\S+/.test(values[field])) {
//               errors[field] = `${field} is invalid`;
//             }
//             break;
//           // Add more validation rules as needed
//           default:
//             break;
//         }
//       }
//     }
//   }
//   // name validation
//   if (values.name !== undefined && values.name.trim() === "") {
//     errors.name = "Name is required";
//   }
//   if (values.fullName === undefined || values.fullName === "") {
//     errors.fullName = "Name is required";
//   }
//   // phone no. validation
//   if (values.p_number === undefined || values.p_number === "") {
//     errors.p_number = "Phone number is required";
//   } else if (!/^\d+$/.test(values.p_number)) {
//     errors.p_number = "Phone number is invalid";
//   } else if (values?.p_number?.length < 10) {
//     errors.p_number = `Phone number should be 10 digit`;
//   } else if (values?.p_number?.length > 10) {
//     errors.p_number = "Phone number should be 10 digit";
//   }

//   // role validation
//   if (values.role === undefined || values.role === "") {
//     errors.role = "role is required";
//   }

//   if (values.first_name === undefined || values.first_name === "") {
//     errors.first_name = "first name is required";
//   }

//   if (values.last_name === undefined || values.last_name === "") {
//     errors.last_name = "last name is required";
//   }

//   if (values.date === undefined || values.date === "") {
//     errors.date = "date is required";
//   }

//   if (values.address === undefined || values.address === "") {
//     errors.address = "address is required";
//   }
//   if (activePlan === undefined || activePlan === "") {
//     errors.activePlan = "Please choose any plan";
//   }

//   // Email validation
//   if (values.email === undefined || values.email === "") {
//     errors.email = "Email is required";
//   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//     errors.email = "Email address is invalid";
//   }

//   // Password validation
//   if (values.password === undefined || values.password === "") {
//     errors.password = "Password is required";
//   } else if (values.password.length < 6) {
//     errors.password = "Password needs to be 6 characters or more";
//   }

//   // Confirm Password validation
//   if (values.confirmPassword === undefined || values.confirmPassword === "") {
//     errors.confirmPassword = "Please confirm your password";
//   } else if (values.confirmPassword !== values.password) {
//     errors.confirmPassword = "Passwords do not match";
//   }

//   if (values.zipCode === undefined || values.zipCode === "") {
//     errors.zipCode = "Zip code is required";
//   } else if (values.zipCode.length < 6) {
//     errors.zipCode = "Zip code needs to be 6 characters or more";
//   }

//   if (values.cardNumber === undefined || values.cardNumber === "") {
//     errors.cardNumber = "Card number is required";
//   }
//   if (values.expiryMonth === undefined || values.expiryMonth === "") {
//     errors.expiryMonth = "Expiry month is required";
//   }
//   if (values.expiryYear === undefined || values.expiryYear === "") {
//     errors.expiryYear = "Expiry year is required";
//   }
//   if (values.cvv === undefined || values.cvv === "") {
//     errors.cvv = "Cvv is required";
//   }

//   // Office Name validation
//   if (values.officeName === undefined || values.officeName === "") {
//     errors.officeName = "Office name is required";
//   }

//   // Office Number validation
//   if (values.mobileNumber === undefined || values.mobileNumber === "") {
//     errors.mobileNumber = "Office number is required";
//   } else if (!/^\d+$/.test(values.mobileNumber)) {
//     errors.mobileNumber = "Office number is invalid";
//   } else if (values?.mobileNumber?.length < 10) {
//     errors.mobileNumber = `Office number should be 10 digit`;
//   } else if (values?.mobileNumber?.length > 10) {
//     errors.mobileNumber = "Office number should be 10 digit";
//   }

//   // Office Address validation
//   if (values.officeAddress === undefined || values.officeAddress === "") {
//     errors.officeAddress = "Office address is required";
//   }

//   // Fax Number validation
//   if (!values.faxNumber && !/^\d+$/.test(values.faxNumber)) {
//     errors.faxNumber = "Fax number is invalid";
//   } else if (values?.faxNumber?.length < 10) {
//     errors.faxNumber = `fax number should be 10 digit`;
//   } else if (values?.faxNumber?.length > 10) {
//     errors.faxNumber = "fax number should be 10 digit";
//   }

//   // profile image
//   if (!selectedImage) {
//     errors.selectedImage = "Profile Image is Invalid";
//   }

//   // patient Name
//   if (!values.patientName) {
//     errors.patientName = "patient Name is required";
//   }

//   // patient DOB
//   if (!values.patientDob) {
//     errors.patientDob = "patient DOB is required";
//   }

//   // patient Gender
//   if (!values.patientGender) {
//     errors.patientGender = "patient gender is required";
//   }

//   // patient balance
//   if (!values.patientBalance) {
//     errors.patientBalance = "patient balance is required";
//   }

//   // appointment Date
//   if (!values.appointmentDate) {
//     errors.appointmentDate = "appointment Date  is required";
//   }

//   // next Appointment Date
//   if (!values.nextAppointment) {
//     errors.nextAppointment = "next Appointment Date  is required";
//   }

//   // patient Status
//   if (!values.patientStatus) {
//     errors.patientStatus = "patient Status  is required";
//   }
//   // patient Status
//   if (!values.clinic) {
//     errors.clinic = "clinic Status  is required";
//   }

//   // patient contect
//   if (!values.patientPhoneNumber && !/^\d+$/.test(values.patientPhoneNumber)) {
//     errors.patientPhoneNumber = "patient contect number is invalid";
//   } else if (values?.patientPhoneNumber?.length < 10) {
//     errors.patientPhoneNumber = `patient contect number should be 10 digit`;
//   } else if (values?.patientPhoneNumber?.length > 10) {
//     errors.patientPhoneNumber = "patient contect number should be 10 digit";
//   }

//   return errors;
// };

const fieldNames = {
  name: "Name",
  email: "Email",
  countryCode: "Country code",
  zipCode: "Zip code",
  cardNumber: "Card number",
  expiryMonth: "Expiry month",
  expiryYear: "Expiry year",
  cvv: "CVV",
  cardHolderName: "Card holder name",
  activePlan: "plan",
  checkbox: "Terms and conditions",
  officeName: "Office name",
  mobieAddress: "Office Address",
  companyName: "Company name",
  accountNumber: "Account number",
  authPersonName: "Auth person name",
  billingPhoneNumber: "Billing phone number",
  taxIdentifier: "Tax identifier",
  extendedAddress: "Extended address",
  carrierName: "Carrier name",
  postalCode: "Postal code",
  streetAddress: "Street address",
  numberPorted: "Ported number",
  authSign: "Authorized signature",
  business_identifier: "Business identifier",
  entity_name: "Entity name",
  pin_passcode: "Pin passcode",
  administrative_area: "Administrative area",
  loaCheck: "Terms and conditions",
  streetNumber: "Street number",
  businessName: "Business name",
  selectedSpecial: "Your specialty",
  patientName: " Patient Name",
  appointmentDate: "Appointment Date",
  patientStatus: "Patient Status",
  patientDob: "Dob",
  patientGender: "Gender",
  patientStatus: "Status",
  patientBalance: "Balance",
  nextAppointment: "Next Appointment",
  staffName: "Staff Name",
  dob: "Date of birth",
  username: "Name",
  officeAddress: "Office Address",
  image: "image",
  coupon_name: "Coupon name",
  expirayDate: "Expiry date",
  discount: "Discount",
  mobileNumber: "Mobile Number",
  faxNumber: "Fax Number",
  userPhoneNumer: "Phone Number",
  number: "Phone Number",
  patientFirstName: "First Name",
  patientLastName: "Last Name",
  role: "Role",
  p_number: "Mobile Number",
  day: "Date",
  start_time: "Time",
  end_time: "Time",
  card_number: "Card Number",
};

export const validateInput = (values, validations) => {
  let errors = {};

  for (const field in validations) {
    const rules = validations[field];

    for (const rule of rules) {
      switch (rule) {
        case "required":
          if (
            !values[field] ||
            (typeof values[field] === "string" && !values[field].trim())
          ) {
            if (field === "expiryMonth") {
              errors[field] = `Expiry date is required`;
            } else {
              errors[field] = `${fieldNames[field] || field} is required`;
            }
            break;
          }
          break;

        case "email":
          if (
            !values[field] ||
            (typeof values[field] === "string" && !values[field].trim())
          ) {
            errors[field] = `Email is required`;
          } else if (!/\S+@\S+\.\S+/.test(values[field] || "")) {
            errors[field] = `Invalid ${fieldNames[field] || field}`;
          }
          break;
        case "emailOrPhone":
          if (
            !values[field] ||
            (typeof values[field] === "string" && !values[field].trim())
          ) {
            errors[field] = `Email or Phone Number is required`;
          } else if (
            !/\S+@\S+\.\S+/.test(values[field] || "") &&
            !/^\d{10}$/.test(values[field])
          ) {
            errors[field] = `Invalid email or phone number`;
          }
          break;

        case "activePlan":
          if (
            !values[field] ||
            (typeof values[field] === "string" && !values[field].trim())
          ) {
            errors[field] = `Please select ${fieldNames[field] || field}`;
            break;
          }
          break;

        case "phone":
          if (
            !values[field] ||
            (typeof values[field] === "string" && !values[field].trim())
          ) {
            errors[field] = `Phone Number is required`;
          } else if (!/^\d+$/.test(values[field])) {
            errors[field] = `Phone number is invalid`;
          } else if (values[field]?.length !== 10) {
            errors[field] = `Phone number should be 10 digits`;
          }
          break;

        case "expiryMonth":
          if (!values[field] || !/^\d{2}\/\d{2}$/.test(values[field])) {
            errors[field] = `Invalid expiry date format (MM/YY)`;
          } else {
            const [month, year] = values[field].split("/").map(Number);
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            if (month < 1 || month > 12) {
              errors[field] = `Invalid expiry month`;
            } else if (
              year < currentYear ||
              (year === currentYear && month < currentMonth)
            ) {
              errors[field] = `This card has already expired`;
            }
          }
          break;
        default:
          break;
      }
      if (errors[field]) break;
    }
  }

  return errors;
};
