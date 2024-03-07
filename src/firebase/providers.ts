import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export interface AuthResponse {
  ok: boolean;
  errorMessage?: string;
  user: {
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
}
export const signInWithGoogleRedirect = () => {
  try {
    signInWithRedirect(FirebaseAuth, googleProvider);
    return {
      ok: true,
    };
  } catch (error: any) {
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const singInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      user: {
        displayName,
        email,
        photoURL,
        uid,
      },
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      user: null,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}): Promise<AuthResponse> => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    return {
      ok: true,
      user: {
        displayName,
        email,
        photoURL,
        uid,
      },
    };
  } catch (error: any) {
    return { ok: false, errorMessage: error.message, user: null };
  }
};

export const loginWithEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      user: {
        displayName,
        email,
        photoURL,
        uid,
      },
    };
  } catch (error: any) {
    return { ok: false, errorMessage: error.message, user: null };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
