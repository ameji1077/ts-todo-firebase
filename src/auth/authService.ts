import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut
} from "firebase/auth";
import { auth, db } from "../firebase";
import  {doc, setDoc } from "firebase/firestore";
import { removeSessionItem, setSessionItem } from "../utils/sessionStorage";
import type { AuthFormInput, RegisterFormInput } from "../types";
import { fetchDisplayName } from "../user/userService";

export async function register({email, password, displayName}: RegisterFormInput) {
  await setPersistence(auth, browserSessionPersistence);
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, {
    displayName,
    email,
    createdAt: new Date(),
  });

  setSessionItem('displayName', displayName);

  return userCredential;
}

export async function login({email, password}: AuthFormInput) {
  await setPersistence(auth, browserSessionPersistence);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  const user = userCredential.user;
  if (user) {
    const displayName = await fetchDisplayName(user.uid);
    if (displayName) {
      setSessionItem("displayName", displayName);
    }
  }

  return userCredential;
}

export async function logout() {
  signOut(auth);
  removeSessionItem('todoAppInitialized');
  removeSessionItem('todos');
}