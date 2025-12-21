import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  status: "anonymous" | "authenticated" | "loading";
  user: AuthUser | null;
};

const initialState: AuthState = {
  status: "anonymous",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state) {
      state.status = "loading";
    },
    setAuthenticated(state, action: PayloadAction<AuthUser>) {
      state.status = "authenticated";
      state.user = action.payload;
    },
    logout(state) {
      state.status = "anonymous";
      state.user = null;
    },
  },
});

export const { setAuthLoading, setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;
