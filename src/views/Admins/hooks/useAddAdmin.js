import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { addAdmin, updateAdmin, sendResetPasswordEmail } from '../actions'

const radioOptions = [
  { value: 'administrator', label: 'Administrator' },
  { value: 'moderator', label: 'Moderator' },
]

export default function useAddAdmin({ isEdit, data, setOpen, setShowAlert }) {
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: data?.email,
      permissionLevel: data?.permissionLevel?.value ?? 'administrator',
      ...data,
    },
  })

  const { email } = watch()

  const { isLoading, mutate } = useMutation(isEdit ? updateAdmin : addAdmin, {
    onSuccess: (success) => {
      setOpen(false)
      setShowAlert({
        open: true,
        message: isEdit
          ? 'Admin updated successfully'
          : 'Admin added successfully',
      })
      setTimeout(() => {
        queryClient.invalidateQueries('get-all-admins')
      }, 2000)
    },
    onError: (error) => {
      if (error === 'auth/email-already-in-use') {
        setError('email', { message: 'Email already in use' })
      }
      setShowAlert({
        open: true,
        isError: true,
        message:
          error === 'auth/email-already-in-use'
            ? 'Email already in use'
            : 'Something went wrong',
      })
    },
  })

  const { isLoading: isLoadingResetPassword, mutate: mutateResetPassword } =
    useMutation(sendResetPasswordEmail, {
      onSuccess: (success) => {
        setOpen(false)
        setShowAlert({
          open: true,
          message: 'Password reset email sent successfully',
        })
        setTimeout(() => {
          queryClient.invalidateQueries('get-all-admins')
        }, 2000)
      },
      onError: (error) => {
        setShowAlert({
          open: true,
          isError: true,
          message: 'Something went wrong',
        })
        console.log(error)
      },
    })

  const onSubmit = (data) => {
    const passwordsMatch = data.password === data.confirmPassword
    if (!passwordsMatch) {
      setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }
    isEdit ? mutate({ ...data, id: data.id }) : mutate({ ...data })
  }

  return {
    email,
    errors,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
    radioOptions,
    mutateResetPassword,
    isLoadingResetPassword,
  }
}
