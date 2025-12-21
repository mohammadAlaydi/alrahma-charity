import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type ToastType = "success" | "info" | "warning" | "error";

export type Toast = {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  durationMs?: number;
  createdAt: number;
};

export type NotificationsState = {
  toasts: Toast[];
};

const initialState: NotificationsState = {
  toasts: [],
};

type AddToastPayload = Omit<Toast, "id" | "createdAt"> & {
  id?: string;
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addToast: {
      reducer(state, action: PayloadAction<Toast>) {
        state.toasts.unshift(action.payload);
        state.toasts = state.toasts.slice(0, 5);
      },
      prepare(payload: AddToastPayload) {
        return {
          payload: {
            id: payload.id ?? nanoid(),
            type: payload.type,
            title: payload.title,
            message: payload.message,
            durationMs: payload.durationMs ?? 3500,
            createdAt: Date.now(),
          } satisfies Toast,
        };
      },
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearToasts(state) {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = notificationsSlice.actions;
export default notificationsSlice.reducer;
