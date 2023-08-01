import {
  updateDoc,
  addDoc,
  doc,
  collection,
  firestore,
  deleteDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../../firebase";

const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const addCulture = async (data) => {
  try {
    let cover_img = "";
    if (data.cover_img?.file) {
      cover_img = await uploadFile(
        data.cover_img.file,
        `images/events/${data.cover_img?.fileName}`
      );
    }
    const culture = {
      ...data,
      cover_img,
    };
    const docRef = await addDoc(collection(firestore, "Culture"), culture);
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
    let cover_img = "";
    if (data.cover_img?.file) {
      cover_img = await uploadFile(
        data.cover_img.file,
        `images/events/${data.cover_img?.fileName}`
      );
    }
    const language = {
      ...data,
      cover_img,
    };
    const docRef = await addDoc(collection(firestore, "Languages"), language);
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
