// Import the functions you need from the SDKs you need
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
  const dispatch = useDispatch();
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
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
};
