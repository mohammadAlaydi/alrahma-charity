import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, AuthTokens, AuthState } from "@/types/auth";
import { tokenStorage } from "@/lib/storage";

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
      // Persist tokens using storage service
      tokenStorage.setTokens(action.payload.tokens.accessToken, action.payload.tokens.refreshToken);
    },
    setTokens(state, action: PayloadAction<AuthTokens>) {
      state.tokens = action.payload;
      tokenStorage.setTokens(action.payload.accessToken, action.payload.refreshToken);
    },
    updateUserImage(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.image = action.payload;
      }
    },
    updateUserDetails(state, action: PayloadAction<Partial<AuthUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout(state) {
      state.status = "anonymous";
      state.user = null;
      state.tokens = null;
      tokenStorage.clearTokens();
    },
  },
});

export const { setAuthLoading, setAuthenticated, setTokens, logout, updateUserImage, updateUserDetails } = authSlice.actions;
export default authSlice.reducer;
