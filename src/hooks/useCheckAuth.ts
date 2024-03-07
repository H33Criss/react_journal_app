import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { User, login, logout } from "../store/slices/authSlice";
import { startLoadingNotes } from "../store/thunks/journalThunk";
import { useAppDispatch, useAppSelector } from "../store";

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log({ status });
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout({}));

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL } as User));
      dispatch(startLoadingNotes());
    });
  }, []);

  return status;
};
