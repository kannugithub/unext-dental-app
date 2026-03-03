import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstence";
import { toast } from "react-toastify";

// export const fetchTransctionsData = createAsyncThunk(
//   "patients/fetchTransctionsData",

//   async (queryParams) => {
//     const response = await axiosInstance.get(
//       `/auth/allTransactionHistory?${queryParams}`
//     );

//     return response.data;
//   }
// );

export const fetchClinicsList = createAsyncThunk(
  "clinics/fetchClinicsList",
  async (queryParams) => {
    const response = await axiosInstance.get(`/auth/clinic?${queryParams}`);
    return response.data;
  }
);

export const getSingleOfficeDetails = createAsyncThunk(
  "clinics/getSingleOfficeDetails",
  async (singleOfficeView) => {
    const response = await axiosInstance.get(
      `/auth/clinic?clinicId=${singleOfficeView}`
    );
    return response.data;
  }
);

export const deActivateOfficeFromSuperAdmin = createAsyncThunk(
  "office/deActivateOfficeFromSuperAdmin",
  async (id) => {
    const response = await axiosInstance.put(`/auth/deactivateOffice/${id}`);
    return response.data;
  }
);

export const addClinic = createAsyncThunk(
  "clinics/addClinic",
  async (formData) => {
    const response = await axiosInstance.post("/auth/addClinic", formData);
    return response.data;
  }
);

export const fetchSingleClinic = createAsyncThunk(
  "clinics/fetchSingleClinic",
  async (clinicId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auth/clinic/${clinicId}`);
      localStorage.setItem("clinicId", clinicId);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateClinic = createAsyncThunk(
  "admin/updateClinic",
  async ({ dataFormData, clinicId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/update-clinic/${clinicId}`,
        dataFormData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSingleClinic = createAsyncThunk(
  "clinics/deleteSingleClinic",
  async (clinicId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/delete-clinic/${clinicId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// all clicnic section api

export const changeClinic = createAsyncThunk(
  "clinics/changeClinic",
  async (id) => {
    try {
      const response = await axiosInstance.get(`/auth/allClinicStaff/${id}`);
      return response.data;
    } catch (err) {
      toast.err;
    }
  }
);

// patient section api
export const fetchPatientList = createAsyncThunk(
  "patients/fetchPatientList",
  async ({ currentPage, limit }) => {
    const response = await axiosInstance.get(
      `/auth/getPatientList?page=${currentPage}&limit=${limit}`
    );
    return response.data;
  }
);

export const addPatient = createAsyncThunk(
  "clinics/addPatient",
  async (formData) => {
    const response = await axiosInstance.post("/auth/add-patient", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const updatePatientData = createAsyncThunk(
  "clinics/updatePatientData",
  async ({ formData, id }) => {
    const response = await axiosInstance.patch(
      `/auth/update-patient/${id}`,
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

export const fetchSinglePatient = createAsyncThunk(
  "clinics/fetchSinglePatient",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/auth/get-patient-by-id/${patientId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePatientFromList = createAsyncThunk(
  "clinics/deletePatientFromList",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/auth/delete-patient/${patientId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const sendAddPatientNote = createAsyncThunk(
  "clinics/sendAddPatientNote",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/notes/`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchPatientNotes = createAsyncThunk(
  "clinics/fetchPatientNotes",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auth/get-notes/${patientId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const sendRequestPayment = createAsyncThunk(
  "clinics/sendRequestPayment",
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

// clinic
export const getClinicsDetails = createAsyncThunk(
  "clinics/getClinicsDetails",
  async (clinicId) => {
    try {
      const response = await axiosInstance.get(`/auth/clinic/${clinicId}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching clinics:", error);
      toast.error(error);
    }
  }
);

// clinic staff list api

export const fetchClinicsStaffList = createAsyncThunk(
  "clinics/fetchClinicsStaffList",
  async ({ currentPage, limit, data }) => {
    const response = await axiosInstance.get(
      `/auth/getStaffList?page=${currentPage}&limit=${limit}`,
      data
    );
    return response.data;
  }
);

export const fetchSingleClinicStaff = createAsyncThunk(
  "clinics/fetchSingleClinicStaff",
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

export const addClinicStaff = createAsyncThunk(
  "clinics/addClinicStaff",
  async (data) => {
    const response = await axiosInstance.post("/auth/add-employee", data);
    return response.data;
  }
);
export const updateClinicStaff = createAsyncThunk(
  "clinics/updateClinicStaff",
  async ({ clinicId, data }) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/update-employee/${clinicId}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error updating clinic staff:", error);
      throw error;
    }
  }
);

export const deleteSingleClinicStaff = createAsyncThunk(
  "clinics/deleteSingleClinicStaff",
  async (clinicStaffId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/auth/deleteEmployee/${clinicStaffId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// user section api

export const fetchAllUserData = createAsyncThunk(
  "patients/fetchAllUserData",
  async ({ currentPage, limit, search }) => {
    let url = `/auth/get-all-emp?page=${currentPage}&limit=${limit}`;
    if (search) {
      url += `&email=${search}`;
    }
    const response = await axiosInstance.get(url);
    return response.data;
  }
);

export const getAllUserList = createAsyncThunk(
  "patients/getAllUserList",
  async (data, search) => {
    const { currentPage, limit, role } = data;

    let url = `/auth/users`;

    if (data?.search) {
      url += `?role=${data?.role}&email=${data?.search}`;
    } else {
      if (role !== false) {
        url += `?page=${currentPage}&limit=${limit}&role=${role}`;
      } else {
        url += `?page=${currentPage}&limit=${limit}`;
      }
    }

    const response = await axiosInstance.get(url);
    return response.data;
  }
);

export const getSingleUserDetails = createAsyncThunk(
  "users/getSingleUserDetails",
  async (clinicId) => {
    const response = await axiosInstance.get(`/auth/users/${clinicId}`);
    return response.data;
  }
);
// export const getAllUserList = createAsyncThunk(
//   "patients/getAllUserList",
//   async ({ currentPage, limit, search, filter }) => {
//     let url = `/auth/users?page=${currentPage}&limit=${limit}`;
//     if (search) {
//       url += `&email=${search}`;
//     } else {
//       let url = `/auth/users?role=${filter}`;
//       const response = await axiosInstance.get(url);
//       console.log(response);
//       return response.data;
//     }
//     const response = await axiosInstance.get(url);
//     console.log(response);
//     return response.data;
//   }
// );

export const fetchtransactionHistory = createAsyncThunk(
  "clinics/fetchtransactionHistory",
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

export const updateUser = createAsyncThunk(
  "patients/updateUser",
  async ({ id, formData }, { rejectWithValue }) => {
    const response = await axiosInstance.patch(
      `/auth/update-employee/${id}`,
      formData
    );
    return response.data;
  }
);

export const deleteUserStaff = createAsyncThunk(
  "patients/deleteUserStaff",
  async (staffId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/auth/deleteEmployee/${staffId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// transctions

export const fetchTransctionsData = createAsyncThunk(
  "patients/fetchTransctionsData",
  async (queryParams) => {
    const response = await axiosInstance.get(
      `/auth/allTransactionHistory?${queryParams}`
    );

    return response.data;
  }
);

export const fetchDemoRequestData = createAsyncThunk(
  "patients/fetchDemoRequestData",
  async ({ currentPage, limit }) => {
    const response = await axiosInstance.get(
      `/auth/getRequestDemo?page=${currentPage}&limit=${limit}`
    );

    return response.data;
  }
);

// coupon section

export const addCoupons = createAsyncThunk(
  "admin/addCoupons",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/createCoupon`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCouponDetails = createAsyncThunk(
  "admin/updateCouponDetails",
  async ({ data, valueId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/updateCoupon/${valueId}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCouponList = createAsyncThunk(
  "admin/fetchCouponList",
  async () => {
    const response = await axiosInstance.get("auth/getCoupon");
    return response.data;
  }
);

export const fetchDataforDisable = createAsyncThunk(
  "admin/fetchDataforDisable",
  async (data) => {
    const newData = data?.disable;
    const response = await axiosInstance.patch(
      `/auth/disableCoupon/${data.id}`,
      { disable: newData }
    );
    console.log("response.data", response.data);
    return response.data;
  }
);

export const getSingleCoupon = createAsyncThunk(
  "admin/getSingleCoupon",
  async (dataId) => {
    const response = await axiosInstance.get(`auth/getCouponById/${dataId}`);
    return response.data;
  }
);

export const deleteCouponFromWeb = createAsyncThunk(
  "patients/deleteCouponFromWeb",
  async (selectedCouponId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/auth/deleteCoupon/${selectedCouponId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Support for Ticket , Report , Request Features

export const fetchSupportTicket = createAsyncThunk(
  "patients/fetchSupportTicket",
  async ({ currentPage, limit }) => {
    const response = await axiosInstance.get(
      currentPage || limit
        ? `/auth/features_get?type=ticket`
        : `/auth/features_get?type=ticket&page=${currentPage}&limit=${limit}`
    );

    return response.data;
  }
);

export const fetchSupportReport = createAsyncThunk(
  "patients/fetchSupportReport",
  async ({ currentPage, limit }) => {
    const response = await axiosInstance.get(
      currentPage || limit
        ? `/auth/features_get?type=issue`
        : `/auth/features_get?type=issue&page=${currentPage}&limit=${limit}`
    );

    return response.data;
  }
);

export const fetchSupportRequestFeatures = createAsyncThunk(
  "patients/fetchSupportRequestFeatures",
  async ({ currentPage, limit }) => {
    const response = await axiosInstance.get(
      currentPage || limit
        ? `/auth/features_get?type=features`
        : `/auth/features_get?type=features&page=${currentPage}&limit=${limit}`
    );

    return response.data;
  }
);
export const fetchDeleteSupportdata = createAsyncThunk(
  "patients/fetchDeleteSupportdata",
  async (id) => {
    if (typeof id !== "string") {
      throw new Error("Invalid ID format");
    }
    const response = await axiosInstance.delete(`/auth/features_delete/${id}`);
    console.log("response.data", response.data);
    return response.data;
  }
);

export const fetchNumberList = createAsyncThunk(
  "clinic/fetchNumberList",
  async () => {
    const response = await axiosInstance.get(`/auth/getOrderedNumberList`);
    return response.data;
  }
);

export const addNewOfficeFromSuperAdmin = createAsyncThunk(
  "clinic/addNewOfficeFromSuperAdmin",
  async (data) => {
    const response = await axiosInstance.post(
      `/auth/adminAddOfficeDetails`,
      data
    );
    return response.data;
  }
);

export const editNewOfficeFromSuperAdmin = createAsyncThunk(
  "clinic/editNewOfficeFromSuperAdmin",
  async ({ officeId, data }) => {
    const response = await axiosInstance.patch(
      `/auth/adminUpdateOfficeDetails/${officeId}`,
      data
    );
    return response.data;
  }
);

export const superAdminSlice = createSlice({
  name: "admin",
  initialState: {
    clinicListData: null,
    patientListData: null,
    singleClinicData: null,
    fetchClinicsStaffList: null,
    fetchSingleClinicStaff: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClinicsList.fulfilled, (state, action) => {
      state.clinicListData = action.payload;
    });
    builder.addCase(fetchSingleClinic.fulfilled, (state, action) => {
      state.singleClinicData = action.payload;
    });
    builder.addCase(
      deActivateOfficeFromSuperAdmin.fulfilled,
      (state, action) => {
        state.deActivateOfficeFromSuperAdminData = action.payload;
      }
    );
    builder.addCase(updateClinic.fulfilled, (state, action) => {
      state.singleClinicData = action.payload.dataResponse;
    });
    builder.addCase(deleteSingleClinic.fulfilled, (state, action) => {
      state.getDeleteSingleClinic = action.payload;
    });
    builder.addCase(deleteSingleClinicStaff.fulfilled, (state, action) => {
      state.getDeleteSingleClinicStaff = action.payload;
    });
    builder.addCase(fetchPatientList.fulfilled, (state, action) => {
      state.patientListData = action.payload;
    });
    builder.addCase(fetchSinglePatient.fulfilled, (state, action) => {
      state.singlePatientData = action.payload;
    });
    builder.addCase(fetchClinicsStaffList.fulfilled, (state, action) => {
      state.clinicStaffList = action.payload;
    });
    builder.addCase(fetchSingleClinicStaff.fulfilled, (state, action) => {
      state.singleClinicStaffInfo = action.payload;
    });
    builder.addCase(fetchAllUserData.fulfilled, (state, action) => {
      state.allUserData = action.payload;
    });
    builder.addCase(fetchtransactionHistory.fulfilled, (state, action) => {
      state.transactionHistoryList = action.payload;
    });
    builder.addCase(deleteUserStaff.fulfilled, (state, action) => {
      state.deleteUserData = action.payload;
    });
    builder.addCase(fetchTransctionsData.fulfilled, (state, action) => {
      state.getTransactionHistory = action.payload;
    });
    builder.addCase(fetchDemoRequestData.fulfilled, (state, action) => {
      state.getDemoRequestData = action.payload;
    });
    builder.addCase(changeClinic.fulfilled, (state, action) => {
      state.changeClinicdata = action.payload;
    });
    builder.addCase(getClinicsDetails.fulfilled, (state, action) => {
      state.getClinicsDetailsData = action.payload;
    });
    builder.addCase(addCoupons.fulfilled, (state, action) => {
      state.addCouponsData = action.payload;
    });
    builder.addCase(fetchCouponList.fulfilled, (state, action) => {
      state.fetchCouponListData = action.payload;
    });
    builder.addCase(fetchDataforDisable.fulfilled, (state, action) => {
      state.getDataforCoupon = action.payload;
    });
    builder.addCase(getSingleCoupon.fulfilled, (state, action) => {
      state.getSingleCouponData = action.payload;
    });
    builder.addCase(deleteCouponFromWeb.fulfilled, (state, action) => {
      state.deleteCouponFromWebData = action.payload;
    });
    builder.addCase(fetchSupportTicket.fulfilled, (state, action) => {
      state.getTicketdata = action.payload;
    });
    builder.addCase(fetchSupportReport.fulfilled, (state, action) => {
      state.getReportdata = action.payload;
    });
    builder.addCase(fetchSupportRequestFeatures.fulfilled, (state, action) => {
      state.getRequestFeaturesdata = action.payload;
    });
    builder.addCase(fetchDeleteSupportdata.fulfilled, (state, action) => {
      state.getDeleteData = action.payload;
    });
    builder.addCase(sendAddPatientNote.fulfilled, (state, action) => {
      state.getAddPatientNoteData = action.payload;
    });
    builder.addCase(fetchPatientNotes.fulfilled, (state, action) => {
      state.getPatientNotes = action.payload;
    });
    builder.addCase(sendRequestPayment.fulfilled, (state, action) => {
      state.getRequestPaymentData = action.payload;
    });
    builder.addCase(deletePatientFromList.fulfilled, (state, action) => {
      state.getDeletePatientData = action.payload;
    });
    builder.addCase(updatePatientData.fulfilled, (state, action) => {
      state.getUpdatedPatientData = action.payload;
    });
    builder.addCase(getAllUserList.fulfilled, (state, action) => {
      state.getAllUserListData = action.payload;
    });
    builder.addCase(fetchNumberList.fulfilled, (state, action) => {
      state.getNumberListData = action.payload;
    });
    builder.addCase(addNewOfficeFromSuperAdmin.fulfilled, (state, action) => {
      state.addNewOfficeFromSuperAdminData = action.payload;
    });
    builder.addCase(editNewOfficeFromSuperAdmin.fulfilled, (state, action) => {
      state.editNewOfficeFromSuperAdminData = action.payload;
    });
    builder.addCase(getSingleUserDetails.fulfilled, (state, action) => {
      state.getSingleUserDetailsData = action.payload;
    });
    builder.addCase(getSingleOfficeDetails.fulfilled, (state, action) => {
      state.getSingleOfficeDetailsData = action.payload;
    });
  },
});

export const superAdminReducer = superAdminSlice.reducer;
