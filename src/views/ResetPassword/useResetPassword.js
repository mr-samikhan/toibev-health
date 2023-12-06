import queryString from 'query-string'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { useLocation } from 'react-router-dom'

import {
  auth,
  confirmPasswordReset,
  sendPasswordResetEmail,
} from '../../firebase'
import { fetchSignInMethodsForEmail, getAuth } from 'firebase/auth'
import { setAlertValues } from '../../redux/actions/loginActions'

export default function useResetPassword() {
  const { search } = useLocation()
  const { oobCode } = queryString.parse(search)
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const newPassword = watch('password')

  const dispatch = useDispatch()

  //success
  const onSuccess = ({ message, type }) => {
    dispatch(
      setAlertValues({
        type: type || 'success',
        message: message,
        isOpen: true,
      })
    )
  }

  //error
  const onError = (error) => {
    dispatch(
      setAlertValues({
        type: 'error',
        isOpen: true,
        message: error,
      })
    )
  }

  const handleResetPassword = async (email) => {
    confirmPasswordReset(auth, oobCode, newPassword)
      .then(() => {
        console.log('Password reset successful')
      })
      .catch((error) => {
        console.log('Error resetting password:', error)
      })

    // try {
    //   const auth = getAuth()
    //   const actionCodeSettings = {
    //     url: 'https://toiyabe-v2.web.app/reset-password',
    //     handleCodeInApp: true,
    //   }
    //   await sendPasswordResetEmail(auth, email, actionCodeSettings)
    //   console.log('Password reset email sent successfully')
    // } catch (error) {
    //   console.log(error.message)
    // }
  }

  const checkEmail = async (email) => {
    const auth = getAuth()

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email)
      if (methods.length === 0) {
        // onError('Email does not exist')
        return { message: 'Email does not exist', type: 'error' }
      } else {
        // await handleForgotPassword(email)
        await handleResetPassword(email)
        return { message: 'Email sent successfully' }
        // onSuccess({ message: 'Email sent successfully' })
      }
    } catch (error) {
      // onError(error.message)
      return { message: error.message }
    }
  }

  const handleForgotPassword = async (email) => {
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      console.log('Password reset email sent successfully')
    } catch (error) {
      console.log(error.message)
    }
  }

  const { isLoading, mutate } = useMutation(checkEmail, {
    onSuccess: (success) => {
      onSuccess({ message: success.message, type: success.type })
    },
    onError: (error) => onError(error.message),
  })

  const onSubmit = (data) => {
    // const passwordsMatch = data.password === data.confirmPassword
    // if (!passwordsMatch) {
    //   setError('confirmPassword', { message: 'Passwords do not match' })
    //   return
    // }
    // handleResetPassword()
    mutate(data.email)
  }

  return {
    errors,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
  }
}
