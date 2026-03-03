import { configureStore } from "@reduxjs/toolkit";
import { superAdminReducer } from "./slices/superAdminSlices";
import { authAdminReducers } from "./slices/authSlices";
import clinicAdminReducer, {
  setConnectedClinicId,
  initializeClinicId,
} from "./slices/clinicAdminSlices";
import { socketReducer } from "./slices/socketSlice";
import darkThemeReducer from "./slices/darkThemeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      admin: superAdminReducer,
      authWeb: authAdminReducers,
      clinic: clinicAdminReducer,
      socket: socketReducer,
      darkTheme: darkThemeReducer,
    },
  });
};
