import { useForm } from 'react-hook-form'
import {
  auth,
  confirmPasswordReset,
  sendPasswordResetEmail,
} from '../../firebase'
import queryString from 'query-string'
import { getAuth } from 'firebase/auth'
import { useLocation } from 'react-router-dom'

export default function useResetPassword() {
  const { search } = useLocation()
  const { oobCode } = queryString.parse(search)
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm()

  const newPassword = watch('password')

  const handleResetPassword = () => {
    confirmPasswordReset(auth, oobCode, newPassword)
      .then(() => {
        console.log('Password reset successful')
      })
      .catch((error) => {
        console.log('Error resetting password:', error)
      })
  }

  const handleForgotPassword = async (email) => {
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      console.log('Password reset email sent successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = (data) => {
    // const passwordsMatch = data.password === data.confirmPassword
    // if (!passwordsMatch) {
    //   setError('confirmPassword', { message: 'Passwords do not match' })
    //   return
    // }
    // handleResetPassword()
    handleForgotPassword(data.email)
  }

  return {
    errors,
    control,
    onSubmit,
    handleSubmit,
  }
}
