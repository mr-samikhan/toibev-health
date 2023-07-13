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
  sendPasswordResetEmail,
  deleteUser,
  setDoc,
} from "../../../firebase";

export const addAdmin = async (data) => {
  const { email, password, permissionLevel } = data;
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = {
      email: createdUser.user.email,
      uid: createdUser.user.uid,
      permissionLevel,
      ...createdUser.user,
    };

    const docRef = await setDoc(
      doc(firestore, "Admins", createdUser?.user?.uid),
      user
    );
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
  console.log(id);
  try {
    const del = await deleteUser(auth, id);
    const docRef = await deleteDoc(doc(firestore, "Admins", id));
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
};

export const sendResetPasswordEmail = async (email) => {
  try {
    const docRef = await sendPasswordResetEmail(auth, email);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
};
