import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstence";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

let token;
try {
  token = localStorage.getItem("token");
} catch (err) {
  token = "default value";
}

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
};

export const requestDemoTimeSlot = createAsyncThunk(
  "admin/requestDemoTimeSlot",
  async () => {
    const response = await axiosInstance.get("/auth/requestDemoSlots");
    return response.data;
  }
);

export const extensionPricing = createAsyncThunk(
  "admin/extensionPricing",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/calculatePrice", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const sendNumberForVerify = createAsyncThunk(
  "admin/sendNumberForVerify",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        "/auth/sendOtpToVerifyNumber",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const verifyNumberOtpForSignup = createAsyncThunk(
  "admin/verifyNumberOtpForSignup",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/verifyNumber", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const signupSubscription = createAsyncThunk(
  "admin/signupSubscription",
  async (data) => {
    return await axiosInstance
      .post("/auth/registerUser", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        throw err;
      });
  }
);

export const webLogin = createAsyncThunk("admin/webLogin", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/loginWeb", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const webLogout = createAsyncThunk("admin/webLogout", async (data) => {
  const response = await axiosInstance.get("/auth/signout", data, config);
  return response.data;
});

export const verifyOtp = createAsyncThunk("admin/verifyOtp", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/webUserVerify", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const verifyRegisterUser = createAsyncThunk(
  "admin/verifyRegisterUser",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/verfyNumber", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const resendOtpForNumberVerify = createAsyncThunk(
  "admin/resendOtpForNumberVerify",
  async (data) => {
    const response = await axiosInstance.post(
      "/auth/resendToVerifyNumber",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const onResendOtp = createAsyncThunk(
  "admin/onResendOtp",
  async (data) => {
    const response = await axiosInstance.post("/auth/resendOtp", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const forgetpasswords = createAsyncThunk(
  "admin/forgetpassword",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/sendOTPPassword", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const forgotPasswordVerifyOtp = createAsyncThunk(
  "admin/forgotPasswordVerifyOtp",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/otpVerify", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const ResetPassword = createAsyncThunk(
  "admin/ResetPassword",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/resetPassword", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "clinics/fetchUserInfo",
  async () => {
    const response = await axiosInstance.get(`/auth/getUser`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

// onboarding process

export const dentalPracticeDetails = createAsyncThunk(
  "clinics/dentalPracticeDetails",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/addClinicDetails",
      data,
      config
    );
    return response.data;
  }
);

export const updateDentalClinic = createAsyncThunk(
  "clinics/updateDentalClinic",
  async ({ data, clinicId }) => {
    const response = await axiosInstance.patch(
      `auth/update-clinic-data/${clinicId}`,
      data,
      config
    );
    return response.data;
  }
);

export const dentalStateNumberList = createAsyncThunk(
  "clinics/dentalStateNumberList",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/getNumberOfList",
      data,
      config
    );
    return response.data;
  }
);

export const sendSelectedClinicPhoneNumber = createAsyncThunk(
  "clinics/sendSelectedClinicPhoneNumber",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/saveSelectedClinicNumber",
      data,
      config
    );
    return response.data;
  }
);

export const alreadyPortNumber = createAsyncThunk(
  "clinics/alreadyPortNumber",
  async (data) => {
    return await axiosInstance
      .post("auth/portClinicNumber", data, config)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        throw err;
      });
  }
);

export const uploadLoaDocs = createAsyncThunk(
  "clinics/uploadLoaDocs",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/uploadClinicLOA",
      data,
      config
    );
    return response.data;
  }
);

export const sendBillingInfo = createAsyncThunk(
  "clinics/sendBillingInfo",
  async (data) => {
    const response = await axiosInstance.patch(
      "auth/updateClinicPortNumber",
      data,
      config
    );
    return response.data;
  }
);

export const saveClinicPortNumbersInfo = createAsyncThunk(
  "clinics/saveClinicPortNumbersInfo",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/saveClinicPortNumber",
      data,
      config
    );
    return response.data;
  }
);

export const sendSelectedFaxNumber = createAsyncThunk(
  "clinics/sendSelectedFaxNumber",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/saveSelectedFaxNumber",
      data,
      config
    );
    return response.data;
  }
);

export const alreadyPortFaxNumber = createAsyncThunk(
  "clinics/alreadyPortFaxNumber",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/portFaxNumber",
      data,
      config
    );
    return response.data;
  }
);

export const uploadFaxLoaDocs = createAsyncThunk(
  "clinics/uploadFaxLoaDocs",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/uploadFaxLOA",
      data,
      config
    );
    return response.data;
  }
);

export const sendFaxBillingInfo = createAsyncThunk(
  "clinics/sendFaxBillingInfo",
  async (data) => {
    const response = await axiosInstance.post(
      "auth/updateFaxPortNumber",
      data,
      config
    );
    return response.data;
  }
);

//demo api

export const sendRequestDemo = createAsyncThunk(
  "demo/sendRequestDemo",
  async ({ data }) => {
    try {
      const response = await axiosInstance.post("/auth/requestDemo", data);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const authAdminReducer = createSlice({
  name: "authWeb",
  initialState: { token: "" },
  reducers: {
    setAuthState: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestDemoTimeSlot.fulfilled, (state, action) => {
      state.getRequestDemoTimeSlots = action.payload;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(extensionPricing.fulfilled, (state, action) => {
      state.extensionPrice = action.payload;
    });
    builder.addCase(dentalPracticeDetails.fulfilled, (state, action) => {
      state.getDentalPracticeDetails = action.payload;
    });
    builder.addCase(updateDentalClinic.fulfilled, (state, action) => {
      state.getUpdateDentalClinic = action.payload;
    });
    builder.addCase(
      sendSelectedClinicPhoneNumber.fulfilled,
      (state, action) => {
        state.getSelectedClinicPhoneNumber = action.payload;
      }
    );
    builder.addCase(dentalStateNumberList.fulfilled, (state, action) => {
      state.getStateNumbersList = action.payload;
    });
    builder.addCase(alreadyPortNumber.fulfilled, (state, action) => {
      state.getAlreadyPortNumber = action.payload;
    });
    builder.addCase(uploadLoaDocs.fulfilled, (state, action) => {
      state.getUploadDocsData = action.payload;
    });
    builder.addCase(sendSelectedFaxNumber.fulfilled, (state, action) => {
      state.getFaxNumberData = action.payload;
    });
    builder.addCase(verifyRegisterUser.fulfilled, (state, action) => {
      state.verifyRegisterUserData = action.payload;
    });
    builder.addCase(signupSubscription.fulfilled, (state, action) => {
      state.signupSubscriptionData = action.payload;
    });
  },
});

export const { setAuthState } = authAdminReducer.actions;
export const authAdminReducers = authAdminReducer.reducer;
