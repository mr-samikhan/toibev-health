import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'

import { getErrorMessage } from '../../Login/utils'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { addAdmin, updateAdmin, sendResetPasswordEmail } from '../actions'

const radioOptions = [
  { value: 'administrator', label: 'Administrator' },
  { value: 'moderator', label: 'Moderator' },
]

export default function useAddAdmin({ isEdit, data, setOpen, admins }) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: data?.email,
      permissionLevel: data?.permissionLevel?.value ?? 'administrator',
      ...data,
    },
  })

  //success
  const onSuccess = ({ isDelete, message }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Admin deleted successfully'
          : isEdit
          ? message || 'Admin updated successfully'
          : 'Admin added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-admins')
    }, 3000)
  }

  //error
  const onError = (error) => {
    const err = getErrorMessage(error)
    dispatch(
      setAlertValues({
        type: 'error',
        isOpen: true,
        message: err || 'Something went wrong!',
      })
    )
  }

  const { email } = watch()
  let emailCheck =
    isEdit &&
    admins?.some((admin) => admin?.id !== data?.id && admin?.email === email)

  const { isLoading, mutate } = useMutation(isEdit ? updateAdmin : addAdmin, {
    onSuccess: (success) => {
      onSuccess({ isDelete: false })
    },
    onError: (error) => {
      if (
        error === 'auth/email-already-in-use' ||
        error.code === 'ERR_BAD_RESPONSE'
      ) {
        setError('email', { message: 'Email already in use' })
      }
      onError(error)
    },
  })

  const { isLoading: isLoadingResetPassword, mutate: mutateResetPassword } =
    useMutation(sendResetPasswordEmail, {
      onSuccess: (success) => {
        onSuccess({
          isDelete: false,
          message: 'Reset password email sent successfully',
        })
      },
      onError: (error) => {
        onError(error)
      },
    })

  const onSubmit = (data) => {
    const passwordsMatch = data.password === data.confirmPassword
    if (!passwordsMatch) {
      setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }
    isEdit
      ? mutate({
          data: { ...data, id: data.id, updatedAt: new Date() },
          emailCheck,
        })
      : mutate({ ...data, createdAt: new Date() })
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
