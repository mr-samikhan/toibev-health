import axios from 'axios'
import { auth, sendPasswordResetEmail } from '../../../firebase'

export const addAdmin = async (data) => {
  const { email, password, permissionLevel } = data
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`${process.env.REACT_APP_FIREBASE_URL}/createAdmin`, {
        email,
        password,
        permissionLevel,
        username: email.split('@')[0],
      })

      // console.log('Document written with ID: ', createdUser)
      resolve('Account created successfully')
    } catch (error) {
      console.log('Error adding document: ', error)
      const errorCode = error.code
      const errorMessage = error.message

      reject(error || errorCode || errorMessage)
    }
  })
}

export const updateAdmin = async ({ data, emailCheck }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (emailCheck) {
        return reject('auth/email-already-in-use')
      }
      await axios.post(`${process.env.REACT_APP_FIREBASE_URL}/updateAdmin`, {
        id: data.id,
        email: data.email,
        username: data.email.split('@')[0],
        permissionLevel: data.permissionLevel,
      })
      resolve('Account updated successfully')
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
        await axios.post(
          `${process.env.REACT_APP_FIREBASE_URL}/deleteAdmin`,
          null,
          { params: { id } }
        )
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
