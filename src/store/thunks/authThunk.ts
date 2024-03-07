import { Dispatch } from "@reduxjs/toolkit";
import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  singInWithGoogle,
  logoutFirebase,
  signInWithGoogleRedirect,
} from "../../firebase/providers";
import { checkingCredentials, logout, login, User } from "../slices/authSlice";
import { clearNotesLogout } from "../slices/journalSlice";

export const checkingAuthentication = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleRedirectSignIn = () => {
  return (dispatch: Dispatch) => {
    const result = signInWithGoogleRedirect();
    if (!result.ok) return dispatch(logout(result.errorMessage));
  };
};
export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    const { ok, errorMessage, user } = await singInWithGoogle();
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(
      login({
        errorMessage,
        ...(user as User),
      })
    );
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    const { ok, errorMessage, user } = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ errorMessage, ...(user as User) }));
  };
};

export const startLoginWithEmailPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    const { ok, errorMessage, user } = await loginWithEmailPassword({
      email,
      password,
    });

    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ errorMessage, ...(user as User) }));
  };
};

export const startLogout = () => {
  return async (dispatch: Dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout({ errorMessage: undefined }));
  };
};
