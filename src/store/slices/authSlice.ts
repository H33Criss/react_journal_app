import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated" | null;
  user: User;
}

export interface User {
  uid: string | undefined;
  email: string | undefined;
  displayName: string | undefined;
  photoURL: string | undefined;
  errorMessage?: string | undefined;
}

const initialState: AuthState = {
  status: "checking",
  user: {
    uid: undefined,
    email: undefined,
    displayName: undefined,
    photoURL: undefined,
    errorMessage: undefined,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
      state.user.displayName = action.payload.displayName;
      state.user.photoURL = action.payload.photoURL;
      state.user.errorMessage = action.payload.errorMessage;
    },
    logout: (state, action: PayloadAction<{ errorMessage?: string }>) => {
      state.status = "not-authenticated";
      state.user.uid = undefined;
      state.user.email = undefined;
      state.user.displayName = undefined;
      state.user.photoURL = undefined;
      state.user.errorMessage = action.payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
