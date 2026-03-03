import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstence";
import { toast } from "react-toastify";

// clinic staff list api

export const getClinicsStaffList = createAsyncThunk(
  "clinic/getClinicsStaffList",
  async (id) => {
    const response = await axiosInstance.get(`/auth/allClinicStaff/${id}`);
    return response.data;
  }
);

export const addStaffData = createAsyncThunk(
  "clinic/addStaffData",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/add-employee", data);

      return response.data;
    } catch (error) {
      toast.error(error);
    }
  }
);

export const editStaffData = createAsyncThunk(
  "clinic/editStaffData",
  async ({ getStaffId, data }) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/update-employee/${getStaffId}`,
        data
      );
      return response.data;
    } catch (error) {
      toast.error(error);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "clinic/deleteStaff",
  async (staffAdminId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/auth/deleteEmployee/${staffAdminId}`
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const assignStaffOnClinic = createAsyncThunk(
  "clinic/assignStaffOnClinic",
  async ({ clinicId, data }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/assignOfficeStaff/${clinicId}`,
        data
      );
      return response.data;
    } catch (error) {
      toast.error(error);
      throw error;
    }
  }
);

export const sendInviteStaffMember = createAsyncThunk(
  "clinic/sendInviteStaffMember",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/inviteStaff", data);

      return response.data;
    } catch (error) {
      toast.error(error);
    }
  }
);

export const getSingleClinicdetails = createAsyncThunk(
  "clinic/getSingleClinicdetails",
  async (clinicStaffId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/auth/getSingleEmp/${clinicStaffId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "clinic/updateUserDetails",
  async ({ userId, formData }, { rejectWithValue }) => {
    const response = await axiosInstance.patch(
      `/auth/update-employee/${userId}`,
      formData
    );
    return response.data;
  }
);

export const updateOfficeHoursdata = createAsyncThunk(
  "clinic/updateOfficeHoursdata",
  async ({ clinicId, data }) => {
    const response = await axiosInstance.patch(
      `/auth/updateOfficeHours/${clinicId}`,
      data
    );
    return response.data;
  }
);

// E-fax api

export const recivefaxlist = createAsyncThunk(
  "clinic/recivefaxlist",
  async ({ efaxData, currentPage, limit }) => {
    const response = await axiosInstance.post("/auth/receiveFaxList", efaxData);
    return response.data;
  }
);

export const sentfaxlist = createAsyncThunk(
  "clinic/sentfaxlist",
  async ({ efaxData, currentPage, limit }) => {
    const response = await axiosInstance.post(`/auth/sendFaxList`, efaxData);
    return response.data;
  }
);

export const getFexapi = createAsyncThunk("efax/getFexapi", async (data) => {
  const response = await axiosInstance.post("/auth/telnyx-faxes", data);
  return response.data;
});

export const addEfax = createAsyncThunk("clinic/addEfax", async (data) => {
  "fac/addEfax";
  const response = await axiosInstance.post("/auth/fax-send", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
});

// voice mail apis

export const fetchGetVioceMail = createAsyncThunk(
  "voicemail/fetchGetVioceMail",
  async ({ clinicId, from }) => {
    const response = await axiosInstance.post(`/auth/getVoiceMailData/`, {
      clinicId,
      from,
    });
    return response.data;
  }
);

// Sms apis

export const fetchGetmessages = createAsyncThunk(
  "msg/fetchGetmessages",
  async (formData) => {
    const response = await axiosInstance.post(
      "/auth/getReceiverNumber",
      formData
    );
    return response.data;
  }
);

export const fetechGetSMS = createAsyncThunk(
  "msg/fetechGetSMS",
  async (data) => {
    const response = await axiosInstance.post("/auth/getSMS", data);
    return response.data;
  }
);

export const sendMessages = createAsyncThunk(
  "msg/sendMessages",
  async (data) => {
    const response = await axiosInstance.post("/auth/send-message", data);
    return response.data;
  }
);

export const searchMessages = createAsyncThunk(
  "msg/searchMessages",
  async ({ patient_name, clinicId }) => {
    const response = await axiosInstance.get("/auth/search-patient", {
      params: { patient_name, clinicId },
    });
    return response.data;
  }
);
// Device api
export const fetchGetDevice = createAsyncThunk(
  "device/fetchGetDevice",
  async ({ userId, currentPage, limit }) => {
    const response = await axiosInstance.get(
      `/auth/getDeviceData/${userId}?page=${currentPage}&limit=${limit}`
    );
    return response.data;
  }
);

export const logoutDevice = createAsyncThunk(
  "device/logoutDevice",
  async (data) => {
    const response = await axiosInstance.post("/auth/singleDeviceLogout", data);
    return response.data;
  }
);

// Clinic
export const fetchGetClinicListByUser = createAsyncThunk(
  "clinic/fetchGetClinicListByUser",
  async (id) => {
    const response = await axiosInstance.get(`/auth/getEmpClinicAdmin/${id}`);
    return response.data;
  }
);

export const AddNewOffice = createAsyncThunk(
  "clinic/AddNewOffice",
  async (data) => {
    const response = await axiosInstance.post(`/auth/addNewOffice`, data);
    return response.data;
  }
);

export const addAdminClinic = createAsyncThunk(
  "clinic/addAdminClinic",
  async (formData) => {
    const response = await axiosInstance.post("/auth/addClinic", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

// Billing apis
export const fetchgetSavedPayments = createAsyncThunk(
  "billing/fetchgetSavedPayments",
  async (clinicId) => {
    const response = await axiosInstance.get(
      `/auth/getSavedPayments/${clinicId}`
    );
    return response.data;
  }
);

export const fetchtransactionHistory = createAsyncThunk(
  "billing/fetchtransactionHistory",
  async (clinicId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/auth/transactionHistory/${clinicId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const cancelSubscriptionPlan = createAsyncThunk(
  "billing/cancelSubscriptionPlan",
  async (data) => {
    const response = await axiosInstance.post(`/auth/cancelSubscription`, data);
    return response.data;
  }
);

export const activeSubscriptionPlan = createAsyncThunk(
  "billing/activeSubscriptionPlan",
  async (data) => {
    const response = await axiosInstance.post(`/auth/activeSubscription`, data);
    return response.data;
  }
);

// add card

export const addCardDetails = createAsyncThunk(
  "card/addCardDetails",
  async (data) => {
    const response = await axiosInstance.post("/auth/addNewCard", data);
    return response.data;
  }
);
// export const fetcgDeleteCard = createAsyncThunk(
//   "card/fetcgDeleteCard",
//   async ({ cardId, clinicId }) => {
//     const response = await axiosInstance.delete(
//       `/auth/deleteCard/${cardId}/${clinicId}`
//     );
//     return response.data;
//   }
// );

export const fetcgDeleteCard = createAsyncThunk(
  "card/fetcgDeleteCard",
  async ({ cardId, clinicId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/auth/deleteCard/${cardId}/${clinicId}`
      );
      return response.data;
    } catch (error) {
      // Return the error message as payload if available
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Something went wrong",
      });
    }
  }
);

export const updatePrimaryCard = createAsyncThunk(
  "card/updatePrimaryCard",
  async (data) => {
    const response = await axiosInstance.post(
      "/auth/updatePrimaryMethodCard",
      data
    );
    return response.data;
  }
);

export const changeSubscriptionPlanType = createAsyncThunk(
  "billing/changeSubscriptionPlanType",
  async (data) => {
    const response = await axiosInstance.post(
      "/auth/changeSubscriptionPlan",
      data
    );
    return response.data;
  }
);

export const upgradeExtension = createAsyncThunk(
  "billing/upgradeExtension",
  async (data) => {
    const response = await axiosInstance.post("/auth/upgradelocpricing", data);
    return response.data;
  }
);

export const sendUpgradeExtesnion = createAsyncThunk(
  "billing/sendUpgradeExtesnion",
  async (data) => {
    const response = await axiosInstance.post(
      "/auth/upgradeExtensionPricing",
      data
    );
    return response.data;
  }
);

export const updateSubscription = createAsyncThunk(
  "billing/updateSubscription",
  async (data) => {
    const response = await axiosInstance.patch(
      "/auth/changePlanAndExtension",
      data
    );
    return response.data;
  }
);

// call farward
export const fetchGetCllfarward = createAsyncThunk(
  "call/fetchGetCllfarward",
  async (clincId) => {
    const response = await axiosInstance.get(`auth/callForwardList/${clincId}`);
    return response.data;
  }
);

//call logs
export const fetchAllCalllogData = createAsyncThunk(
  "call/fetchAllCalllogData",
  async ({ clinicId, number }) => {
    const response = await axiosInstance.get(
      `auth/getCallsHistory?clinicId=${clinicId}&number=${number}`
    );
    return response.data;
  }
);

//missed call
export const fetchMissedcallData = createAsyncThunk(
  "call/fetchMissedcallData",
  async ({ clinicId, number }) => {
    const response = await axiosInstance.get(
      `auth/misscalls?clinicId=${clinicId}&number=${number}`
    );
    return response.data;
  }
);

export const DownloadTranscript = createAsyncThunk(
  "call/DownloadTranscript",
  async (call_control_id) => {
    const response = await axiosInstance.get(
      `auth/downloadTranscriptions/${call_control_id}`
    );
    return response.data;
  }
);

// clinic patient
export const getClinicPatient = createAsyncThunk(
  "patients/getClinicPatient",
  async ({
    clinicId,
    currentPage,
    limit,
    search,
    newpatient,
    cancelled,
    negativeBalance,
    recalls,
  }) => {
    if (newpatient) {
      let url = `/auth/get-patient/${clinicId}?filter=${newpatient}&page=${currentPage}&search=${search}`;
      if (limit) {
        url += `&limit=${limit}`;
      }
      const response = await axiosInstance.get(url);
      return response.data;
    } else if (recalls) {
      search = search || "";
      cancelled = cancelled || "";
      let url = `/auth/get-patient/${clinicId}?page=${currentPage}&search=${search}&recalls=${recalls}`;
      if (limit) {
        url += `&limit=${limit}`;
      }

      const response = await axiosInstance.get(url);

      return response.data;
    } else if (negativeBalance) {
      search = search || "";
      cancelled = cancelled || "";
      let url = `/auth/get-patient/${clinicId}?filter=${newpatient}&page=${currentPage}&negativeBalance=${negativeBalance}&search=${search}`;
      if (limit) {
        url += `&limit=${limit}`;
      }

      const response = await axiosInstance.get(url);

      return response.data;
    } else {
      search = search || "";
      cancelled = cancelled || "";
      let url = `/auth/get-patient/${clinicId}?page=${currentPage}&search=${search}&cancelledAppointment=${cancelled}`;
      if (limit) {
        url += `&limit=${limit}`;
      }

      const response = await axiosInstance.get(url);

      return response.data;
    }
  }
);

export const getPatientFamilyMemberNumber = createAsyncThunk(
  "patients/getPatientFamilyMemberNumber",
  async ({ clinicId, search }) => {
    const response = await axiosInstance.get(
      `/auth/search-patient?clinicId=${clinicId}&parent_phone_number=${search}`
    );
    return response.data;
  }
);

export const importPatientCsv = createAsyncThunk(
  "patients/importPatientCsv",
  async (formData) => {
    const response = await axiosInstance.post(
      `/auth/importPatientData`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const getAppointmentList = createAsyncThunk(
  "patients/getAppointmentList",
  async ({ clinicId, currentPage, limit, date = "" }) => {
    const response = await axiosInstance.get(
      `/auth/getLatestAppointment/${clinicId}?page=${currentPage}&limit=${limit}&date=${date}`
    );
    return response.data;
  }
);

export const getAppointmentTimeSlot = createAsyncThunk(
  "clinics/getAppointmentTimeSlot",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/auth/getPatientAppointmentTime/${data?.clinicId}?date=${data?.date}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const sendAppointmentTimeSlot = createAsyncThunk(
  "clinics/sendAppointmentTimeSlot",
  async ({ data, selectedPatient, showData }, { rejectWithValue }) => {
    if (showData) {
      try {
        const response = await axiosInstance.patch(
          `/auth/update-patient`,
          data
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    } else {
      try {
        const response = await axiosInstance.patch(
          `/auth/update-patient/${selectedPatient}`,
          data
        );
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  }
);

export const Submitticket = createAsyncThunk(
  "clinics/Submitticket",
  async (data) => {
    const response = await axiosInstance.post("/auth/features_add", data);
    return response.data;
  }
);

export const OutsideVoicemailsetting = createAsyncThunk(
  "clinics/OutsideVoicemailsetting",
  async (data) => {
    const response = await axiosInstance.post("/auth/voice-mail", data);
    return response.data;
  }
);

export const Faxsetting = createAsyncThunk(
  "clinics/Faxsetting",
  async ({ data, clinicId }) => {
    const response = await axiosInstance.post(
      `/auth/clinicSetting/${clinicId}`,
      data
    );
    return response.data;
  }
);

export const Marketingsetting = createAsyncThunk(
  "clinics/Marketingsetting",
  async (data) => {
    const response = await axiosInstance.post(`/auth/addReviewLink`, data);
    return response.data;
  }
);

export const Ringgroup = createAsyncThunk(
  "clinics/Ringgroup",
  async (clinicId) => {
    const response = await axiosInstance.get(`/auth/ringingGroup/${clinicId}`);
    return response.data;
  }
);

export const SwitchRinggroup = createAsyncThunk(
  "clinic/SwitchRinggroup",
  async ({ data, employee_id }) => {
    const response = await axiosInstance.patch(
      `/auth/update-employee/${employee_id}`,
      data
    );
    return response.data;
  }
);

export const fetchNotification = createAsyncThunk(
  "clinic/fetchNotification",
  async (clinicId) => {
    const response = await axiosInstance.get(`/auth/notification/${clinicId}`);
    return response.data;
  }
);

export const clearNotification = createAsyncThunk(
  "clinic/clearNotification",
  async ({ number, clinicId }) => {
    const response = await axiosInstance.get(
      `/auth/readnotification/${number}?clinicId=${clinicId}`
    );
    return response.data;
  }
);
export const Archivefax = createAsyncThunk(
  "clinic/Archivefax",
  async ({ faxId, data }) => {
    const response = await axiosInstance.patch(
      `/auth/archivefax/${faxId}`,
      data
    );
    return response.data;
  }
);

export const FetchArchivefax = createAsyncThunk(
  "clinic/FetchArchivefax",
  async ({ faxNum, archive }) => {
    const response = await axiosInstance.get(
      `/auth/archivefaxList?to=${faxNum}&archive=${archive}`
    );
    return response.data;
  }
);

export const Cancelappointment = createAsyncThunk(
  "patients/Cancelappointment",
  async ({ clinicId, sort, cancelled }) => {
    if (!sort) {
      search = search || "";
      let url = `/auth/get-patient/${clinicId}?cancelledAppointment=${cancelled}`;
      if (limit) {
        url += `&limit=${limit}`;
      }

      const response = await axiosInstance.get(url);

      return response.data;
    } else {
      let url = `/auth/get-patient/${clinicId}?filter=${sort}`;
      if (limit) {
        url += `&limit=${limit}`;
      }
      const response = await axiosInstance.get(url);
      return response.data;
    }
  }
);

export const SendrequestPaymentLink = createAsyncThunk(
  "clinics/SendrequestPaymentLink",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/requestPaymentLinkSend`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const DeleteVoicemail = createAsyncThunk(
  "clinic/DeleteVoicemail",
  async (voicemailId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/auth/deleteVoiceMail/${voicemailId}`
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeleteVoicemail = createAsyncThunk(
  "voicemail/fetchDeleteVoicemail",
  async ({ clinicId, from }) => {
    const response = await axiosInstance.post(`/auth/deletedVoiceMailList/`, {
      clinicId,
      from,
    });
    return response.data;
  }
);

export const fetchHolidaysList = createAsyncThunk(
  "setting/fetchHolidaysList",
  async () => {
    const response = await axiosInstance.get(`/auth/holidaysList`);
    return response.data;
  }
);

export const sendCustomizeHoliday = createAsyncThunk(
  "setting/sendCustomizeHoliday",
  async (data) => {
    const response = await axiosInstance.post(`/auth/selectHoliday/`, {
      data,
    });
    return response.data;
  }
);

export const forwardByMail = createAsyncThunk(
  "fax/forwardByMail",
  async ({ data, clinicID }) => {
    const response = await axiosInstance.post(`/auth/forwardMail/${clinicID}`, {
      data,
    });
    return response.data;
  }
);

export const clinicAdminSlice = createSlice({
  name: "clinic",
  initialState: {
    clinicListData: null,
    patientListData: null,
    singleClinicData: null,
    fetchClinicsStaffList: null,
    fetchSingleClinicStaff: null,
    clinicId: null,
    getClinicListData: {
      clinic_data: [],
    },
  },
  reducers: {
    setConnectedClinicId: (state, action) => {
      state.clinicId = action.payload;
      localStorage.setItem("clinicId", action.payload);
    },
    initializeClinicId: (state) => {
      const storedClinicId = localStorage.getItem("clinicId");
      if (storedClinicId) {
        state.clinicId = storedClinicId;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClinicsStaffList.fulfilled, (state, action) => {
      state.staffListData = action.payload;
    });
    builder.addCase(deleteStaff.fulfilled, (state, action) => {
      state.deleteUserStaffData = action.payload;
    });
    builder.addCase(addStaffData.fulfilled, (state, action) => {
      state.getAddStaffData = action.payload;
    });
    builder.addCase(editStaffData.fulfilled, (state, action) => {
      state.getEditStaffData = action.payload;
    });
    builder.addCase(getSingleClinicdetails.fulfilled, (state, action) => {
      state.getSingleClinicdetailsdata = action.payload;
    });
    builder.addCase(getFexapi.fulfilled, (state, action) => {
      state.faxList = action.payload;
    });
    builder.addCase(fetchGetVioceMail.fulfilled, (state, action) => {
      state.voicemailList = action.payload;
    });
    builder.addCase(fetchGetmessages.fulfilled, (state, action) => {
      state.messageList = action.payload;
    });
    builder.addCase(fetechGetSMS.fulfilled, (state, action) => {
      state.fetechGetSMSList = action.payload;
    });
    builder.addCase(fetchGetDevice.fulfilled, (state, action) => {
      state.getDeviceList = action.payload;
    });
    builder.addCase(fetchGetClinicListByUser.fulfilled, (state, action) => {
      state.getClinicListData = action.payload;
    });
    builder.addCase(fetchgetSavedPayments.fulfilled, (state, action) => {
      state.savedPaymentList = action.payload;
    });
    builder.addCase(fetchtransactionHistory.fulfilled, (state, action) => {
      state.transactionHistoryList = action.payload;
    });
    builder.addCase(fetcgDeleteCard.fulfilled, (state, action) => {
      state.fetcgDeleteCardDetails = action.payload;
    });
    builder.addCase(addCardDetails.fulfilled, (state, action) => {
      state.fetchAddCardDetails = action.payload;
    });
    builder.addCase(updatePrimaryCard.fulfilled, (state, action) => {
      state.getPrimaryCardData = action.payload;
    });
    builder.addCase(addEfax.fulfilled, (state, action) => {
      state.addEfaxList = action.payload;
    });
    builder.addCase(fetchGetCllfarward.fulfilled, (state, action) => {
      state.getCallfarwardList = action.payload;
    });
    builder.addCase(fetchAllCalllogData.fulfilled, (state, action) => {
      state.getCalllogList = action.payload;
    });
    builder.addCase(fetchMissedcallData.fulfilled, (state, action) => {
      state.getMissedcallList = action.payload;
    });

    builder.addCase(sendMessages.fulfilled, (state, action) => {
      state.sendMessagesDetails = action.payload;
    });
    builder.addCase(sentfaxlist.fulfilled, (state, action) => {
      state.sentfaxlistdata = action.payload;
    });
    builder.addCase(recivefaxlist.fulfilled, (state, action) => {
      state.recivefaxlistdata = action.payload;
    });
    builder.addCase(AddNewOffice.fulfilled, (state, action) => {
      state.AddNewOfficedata = action.payload;
    });
    builder.addCase(cancelSubscriptionPlan.fulfilled, (state, action) => {
      state.cancelSubscriptionPlanData = action.payload;
    });
    builder.addCase(activeSubscriptionPlan.fulfilled, (state, action) => {
      state.activeSubscriptionPlanData = action.payload;
    });
    builder.addCase(upgradeExtension.fulfilled, (state, action) => {
      state.upgradeExtensionData = action.payload;
    });
    builder.addCase(sendUpgradeExtesnion.fulfilled, (state, action) => {
      state.sendUpgradeExtesnionData = action.payload;
    });
    builder.addCase(updateSubscription.fulfilled, (state, action) => {
      state.updateSubscriptionData = action.payload;
    });
    builder.addCase(logoutDevice.fulfilled, (state, action) => {
      state.logoutDeviceData = action.payload;
    });
    builder.addCase(getClinicPatient.fulfilled, (state, action) => {
      state.getClinicPatientData = action.payload;
    });
    builder.addCase(getPatientFamilyMemberNumber.fulfilled, (state, action) => {
      state.getPatientFamilyMemberNumberData = action.payload;
    });
    builder.addCase(getAppointmentTimeSlot.fulfilled, (state, action) => {
      state.getAppointmentTimeSlotData = action.payload;
    });
    builder.addCase(sendAppointmentTimeSlot.fulfilled, (state, action) => {
      state.getAppointmentTimeSlotResponse = action.payload;
    });
    builder.addCase(getAppointmentList.fulfilled, (state, action) => {
      state.getAppointmentListData = action.payload;
    });
    builder.addCase(Ringgroup.fulfilled, (state, action) => {
      state.RinggroupData = action.payload;
    });
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      state.NotificationData = action.payload;
    });

    builder.addCase(FetchArchivefax.fulfilled, (state, action) => {
      state.FetchArchivefaxData = action.payload;
    });

    builder.addCase(fetchDeleteVoicemail.fulfilled, (state, action) => {
      state.fetchDeleteVoicemailData = action.payload;
    });
    builder.addCase(fetchHolidaysList.fulfilled, (state, action) => {
      state.fetchHolidaysListData = action.payload;
    });
    builder.addCase(sendCustomizeHoliday.fulfilled, (state, action) => {
      state.getCustomizeHolidayData = action.payload;
    });
    builder.addCase(SendrequestPaymentLink.fulfilled, (state, action) => {
      state.SendrequestPaymentLinkData = action.payload;
    });
  },
});

// export const clinicAdminReducer = clinicAdminSlice.reducer;
export const { setConnectedClinicId, initializeClinicId } =
  clinicAdminSlice.actions;
export default clinicAdminSlice.reducer;
