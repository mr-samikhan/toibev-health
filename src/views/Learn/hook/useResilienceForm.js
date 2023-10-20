import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { getErrorMessage } from '../../Login/utils'
import { addResiliency, updateLanguage } from '../actions'
import { setAlertValues } from '../../../redux/actions/loginActions'

export default function useResilienceForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { title: initialState?.title },
  })
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Resilliency deleted successfully'
          : isEdit
          ? 'Resilliency updated successfully'
          : 'Resilliency added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-reseliency')
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

  const { isLoading, mutate } = useMutation(
    isEdit ? updateLanguage : addResiliency,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )

  const onSubmit = (formData) => {
    const data = {
      ...initialState,
      menu: [
        ...(initialState?.menu || []),
        {
          title: formData.title,
          value: formData.title?.split(' ').join('_').toLowerCase(),
        },
      ],
    }
    if (isEdit) {
      mutate({ ...data, id: initialState.id })
    } else {
      mutate(data)
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
  }
}
