// utils/firebase.js
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Ensure Firebase is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export {
  auth,
  firestore,
  storage,
  doc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  GoogleAuthProvider,
  GithubAuthProvider,
};
