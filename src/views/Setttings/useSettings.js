import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
//imports
import { getErrorMessage } from '../Login/utils'
import { updateUserEmailAndPassword } from './actions'
import { setAlertValues } from '../../redux/actions/loginActions'

export default function useSettings() {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state?.Auth) ?? {}

  //success
  const onSuccess = () => {
    dispatch(
      setAlertValues({
        type: 'success',
        isOpen: true,
        message: 'Account updated successfully',
      })
    )
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

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { ...user, fullname: user?.username },
  })

  const fullname = watch('fullname')
  const email = watch('email')

  //mutate
  const { isLoading, mutate } = useMutation(updateUserEmailAndPassword, {
    onSuccess: (success) => {
      onSuccess()
      dispatch({
        type: 'UPDATE_USER',
        payload: { username: fullname, email: email },
      })
    },
    onError: (error) => {
      onError(error)
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
      id: user.uid,
      oldEmail: '',
      newEmail: data.email,
      newPassword: data.password,
      username: data.fullname,
      oldPassword: data.oldPassword,
    })
  }

  return {
    user,
    mutate,
    errors,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
  }
}
