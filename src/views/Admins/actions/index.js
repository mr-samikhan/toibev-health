import {
  addDoc,
  updateDoc,
  collection,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import {
  firestore,
  auth,
  createUserWithEmailAndPassword,
} from "../../../firebase";

export const addAdmin = async (data) => {
  const { email, password, permissionLevel } = data;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const docRef = await addDoc(collection(firestore, "Admins"), {
      email,
      permissionLevel,
    });
    return docRef;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    throw errorCode;
  }
};

export const updateAdmin = async (data) => {
  try {
    const docRef = await updateDoc(doc(firestore, "Admins", data.id), data);
    // console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    // console.error("Error adding document: ", e);
    return e;
  }
};

export const deleteAdmin = async (id) => {
  try {
    const docRef = await deleteDoc(doc(firestore, "Admins", id));
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
};
