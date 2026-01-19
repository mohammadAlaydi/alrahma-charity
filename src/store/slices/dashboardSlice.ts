import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DashboardState = {
  sidebarOpen: boolean;
  search: string;
};

const initialState: DashboardState = {
  sidebarOpen: false,
  search: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSidebarOpen, toggleSidebar, setSearch } = dashboardSlice.actions;
export default dashboardSlice.reducer;
