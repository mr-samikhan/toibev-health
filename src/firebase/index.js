import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  deleteUser,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  collectionGroup,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyDs771dG0s9SeCr5Sk-ef1HyaDCQxtSoqM",
  authDomain: "toiyabe-v2.firebaseapp.com",
  projectId: "toiyabe-v2",
  storageBucket: "toiyabe-v2.appspot.com",
  messagingSenderId: "943146264303",
  appId: "1:943146264303:web:3c6df8c34c1927feec9d1a",
  measurementId: "G-PELKG23W2Q",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore(app);

const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
  const dispatch = useDispatch();
  if (user) {
    const uid = user.uid;
  } else {
    dispatch({ type: "LOGOUT" });
  }
});

export {
  auth,
  firestore,
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  query,
  collectionGroup,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  deleteUser,
  setDoc,
  Timestamp,
};
