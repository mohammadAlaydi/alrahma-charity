import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/slices/authSlice";
import dashboardReducer from "@/store/slices/dashboardSlice";
import notificationsReducer from "@/store/slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
