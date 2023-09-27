import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
//imports
import { getErrorMessage } from '../Login/utils'
import { updateUserEmailAndPassword } from './actions'

export default function useSettings() {
  const queryClient = useQueryClient()

  const { user } = useSelector((state) => state?.Auth) ?? {}

  const [showAlert, setShowAlert] = React.useState({
    open: false,
    message: '',
    isError: false,
  })

  //open snackbar
  const onShowSnackBar = () =>
    setShowAlert((prev) => ({
      ...prev,
      open: true,
      isError: false,
      message: 'Account updated successfully!',
    }))

  //close snackbar
  const onCloseSnackBar = () =>
    setShowAlert((prev) => ({ ...prev, open: false }))

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //mutate
  const { isLoading, mutate } = useMutation(updateUserEmailAndPassword, {
    onSuccess: (success) => {
      onShowSnackBar()
      queryClient.invalidateQueries('update-user-credentails')
      // console.log(success, '>>>>success')
    },
    onError: (error) => {
      const err = getErrorMessage(error)
      setShowAlert((prev) => ({
        ...prev,
        open: true,
        isError: true,
        message: err,
      }))
      return err
      // console.log(err, '>>>>error')
    },
  })

  const onSubmit = (data) => {
    const passwordsMatch = data.password === data.confirmPassword
    if (!passwordsMatch) {
      setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }
    mutate({
      oldEmail: '',
      newEmail: data.email,
      newPassword: 'Abcd@123',
      oldPassword: data.password,
      id: user.id,
    })
  }

  return {
    user,
    mutate,
    errors,
    control,
    onSubmit,
    isLoading,
    showAlert,
    handleSubmit,
    setShowAlert,
    onCloseSnackBar,
  }
}
