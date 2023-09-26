import { updateDoc, doc, deleteDoc } from '@firebase/firestore'
import {
  auth,
  setDoc,
  firestore,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from '../../../firebase'

export const addAdmin = async (data) => {
  const { email, password, permissionLevel } = data
  return new Promise(async (resolve, reject) => {
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = {
        email: createdUser.user.email,
        uid: createdUser.user.uid,
        permissionLevel,
        username: createdUser.user.email.split('@')[0],
      }

      const docRef = await setDoc(
        doc(firestore, 'Admins', createdUser?.user?.uid),
        { ...user }
      )
      resolve(docRef)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message

      reject(errorCode || errorMessage)
    }
  })
}

export const updateAdmin = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await updateDoc(doc(firestore, 'Admins', data.id), data)
      // console.log("Document written with ID: ", docRef.id);
      resolve(docRef)
    } catch (e) {
      // console.error("Error adding document: ", e);
      reject(e)
    }
  })
}

export const deleteAdmin = async (
  values = { id: '', role: '', currentUser: '' }
) => {
  const { id, role, currentUser } = values
  return new Promise(async (resolve, reject) => {
    try {
      if (
        currentUser.permissionLevel === 'moderator' &&
        role === 'administrator'
      ) {
        reject('permission-error')
      } else {
        // const del = await deleteUser(auth, id)
        const docRef = doc(firestore, 'Admins', id)
        await deleteDoc(docRef)
        resolve('user deleted successfully')
      }
    } catch (e) {
      console.error('Error adding document: ', e)
      reject(e)
    }
  })
}

export const sendResetPasswordEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sendPasswordResetEmail(auth, email)
      resolve('Password reset email sent successfully')
    } catch (e) {
      console.error('Error adding document: ', e)
      reject(e)
    }
  })
}
