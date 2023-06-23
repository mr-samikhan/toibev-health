import {
  updateDoc,
  addDoc,
  doc,
  collection,
  firestore,
  deleteDoc,
} from "../../../firebase";

export const addCulture = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "Culture"), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateCulture = async (data) => {
  try {
    const docRef = await updateDoc(doc(firestore, "Culture", data.id), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const deleteCulture = async (id) => {
  try {
    const docRef = await deleteDoc(doc(firestore, "Culture", id));
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const addLanguage = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "Languages"), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const updateLanguage = async (data) => {
  try {
    const docRef = await updateDoc(doc(firestore, "Languages", data.id), data);
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};

export const deleteLanguage = async (id) => {
  try {
    const docRef = await deleteDoc(doc(firestore, "Languages", id));
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw errorCode;
  }
};
