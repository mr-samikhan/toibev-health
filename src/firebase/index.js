import { initializeApp } from 'firebase/app'
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
} from 'firebase/auth'

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
} from 'firebase/firestore'

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useDispatch } from 'react-redux'

const firebaseConfig = {
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  measurementId: process.env.REACT_APP_FIREBASE_MESUREMENT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const firestore = getFirestore(app)

const storage = getStorage(app)

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
}
