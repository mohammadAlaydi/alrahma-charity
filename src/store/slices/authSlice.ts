import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type AuthState = {
  status: "anonymous" | "authenticated" | "loading";
  user: AuthUser | null;
  tokens: AuthTokens | null;
};

const initialState: AuthState = {
  status: "anonymous",
  user: null,
  tokens: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state) {
      state.status = "loading";
    },
    setAuthenticated(state, action: PayloadAction<{ user: AuthUser; tokens: AuthTokens }>) {
      state.status = "authenticated";
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      // Persist tokens to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", action.payload.tokens.access_token);
        localStorage.setItem("refresh_token", action.payload.tokens.refresh_token);
      }
    },
    setTokens(state, action: PayloadAction<AuthTokens>) {
      state.tokens = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
      }
    },
    logout(state) {
      state.status = "anonymous";
      state.user = null;
      state.tokens = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    },
  },
});

export const { setAuthLoading, setAuthenticated, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
