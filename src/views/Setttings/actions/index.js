import {
  getAuth,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { auth } from '../../../firebase'

export const updateUserEmailAndPassword = async (
  values = {
    id: '',
    oldEmail: '',
    newEmail: '',
    oldPassword: '',
    newPassword: '',
  }
) => {
  const { currentUser } = auth
  const authentication = getAuth()

  const { id, newEmail, newPassword, oldPassword } = values

  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        currentUser.email,
        oldPassword
      )
      const user = userCredential.user

      await updateEmail(user, newEmail)

      await updatePassword(user, newPassword)

      const firestore = getFirestore()
      await updateDoc(doc(firestore, 'Admins', id), { email: newEmail })

      //   console.log('Account updated successfully!')
      resolve('Account updated successfully!')
    } catch (error) {
      //   console.error('Error>>>>', error.code)
      reject(error)
    }
  })
}
