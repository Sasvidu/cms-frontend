import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";

export type User = {
  email: string;
  password: string;
};

export const createUser = async (user: User) => {
  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error registering user: " + error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const signin = async (user: User) => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error signing in: " + error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const signout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error signing out: " + error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const authenticated = (): boolean => {
  return !!auth.currentUser;
};

export const getUserId = (): string => {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  } else {
    throw new Error("User not authenticated");
  }
};
