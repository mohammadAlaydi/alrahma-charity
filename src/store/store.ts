import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/slices/authSlice";
import dashboardReducer from "@/store/slices/dashboardSlice";
import notificationsReducer from "@/store/slices/notificationsSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    notifications: notificationsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
