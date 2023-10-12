import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

//imports
import { deleteAdmin } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { getErrorMessage } from '../../Login/utils'

export default function useDeleteAdmin({ data, setShowAlert }) {
  const queryClient = useQueryClient()
  const { handleSubmit } = useForm()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state?.Auth) ?? {}

  //success
  const onSuccess = () => {
    dispatch(
      setAlertValues({
        type: 'success',
        isOpen: true,
        message: 'Admin deleted successfully',
      })
    )

    setTimeout(() => {
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

  const { isLoading, mutate } = useMutation(deleteAdmin, {
    onSuccess: () => onSuccess(),
    onError: (error) => onError(error),
  })

  const onSubmit = () => {
    mutate({ id: data.id, role: data.permissionLevel, currentUser: user })
  }
  return { handleSubmit, onSubmit, isLoading }
}
