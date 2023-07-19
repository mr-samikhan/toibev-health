import {
  updateDoc,
  addDoc,
  doc,
  collection,
  firestore,
  deleteDoc,
} from "../../../firebase";

export const addProvider = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "Providers"), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateProvider = async (data) => {
  try {
    const docRef = await updateDoc(doc(firestore, "Providers", data?.id), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};
