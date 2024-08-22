import {
  getAuth,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";

export const updateUserEmailAndPassword = async (
  values = {
    id: "",
    oldEmail: "",
    newEmail: "",
    oldPassword: "",
    newPassword: "",
    username: "",
  }
) => {
  const { currentUser } = auth;
  const authentication = getAuth();

  const { id, newEmail, newPassword, oldPassword, username } = values;

  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        currentUser.email,
        oldPassword
      );
      const user = userCredential.user;

      await updateEmail(user, newEmail);

      await updatePassword(user, newPassword);

      const firestore = getFirestore();
      await updateDoc(doc(firestore, "admins", id), {
        email: newEmail,
        username: username,
        updatedAt: new Date(),
      });

      //   console.log('Account updated successfully!')
      resolve("Account updated successfully!");
    } catch (error) {
      console.error("Error>>>>", error);
      reject(error);
    }
  });
};

export const getCurrentUser = async (values = { id: "" }) => {
  const { id } = values || {};
  return new Promise(async (resolve, reject) => {
    try {
      const currentUserUid = id;

      const userDocRef = doc(firestore, "admins", currentUserUid);
      const unsubscribe = onSnapshot(
        userDocRef,
        (userDocSnapshot) => {
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            resolve(userData);
          } else {
            reject("User document does not exist.");
          }
          return unsubscribe;
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
