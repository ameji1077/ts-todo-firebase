import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut
} from "firebase/auth";
import { auth } from "../firebase";
import { removeSessionItem } from "../utils/sessionStorage";
import type { AuthFormInput } from "../types";

export async function register({email, password}: AuthFormInput) {
  await setPersistence(auth, browserSessionPersistence);
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function login({email, password}: AuthFormInput) {
  await setPersistence(auth, browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  signOut(auth);
  removeSessionItem('todoAppInitialized');
  removeSessionItem('todos');
}