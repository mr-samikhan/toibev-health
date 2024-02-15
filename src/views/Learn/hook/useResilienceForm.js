import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { getErrorMessage } from '../../Login/utils'
import { addResiliency, deleteResiliency, updateResiliency } from '../actions'
import { setAlertValues } from '../../../redux/actions/loginActions'

export default function useResilienceForm({
  isEdit,
  initialState,
  setOpen,
  title,
  setOpenTitleModal,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: isEdit ? title : '' },
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
    isEdit ? updateResiliency : addResiliency,
    {
      onSuccess: (success) => {
        onSuccess({ isDelete: false })
        isEdit && setOpenTitleModal(false)
      },
      onError: (error) => onError(error),
    }
  )
  const { isLoading: isDeleteLoading, mutate: onDelete } = useMutation(
    deleteResiliency,
    {
      onSuccess: (success) => {
        onSuccess({ isDelete: true })
        isEdit && setOpenTitleModal(false)
      },
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
      mutate({
        data: { ...initialState, id: initialState.id },
        newCollectionName: formData.title,
        oldCollectionName: title,
      })
    } else {
      mutate({ data, title: formData.title })
    }
  }

  const handleDelete = async () => {
    onDelete({
      data: initialState,
      collectionName: title,
    })
  }

  return {
    errors,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
    isDeleteLoading,
    onDelete: handleDelete,
  }
}
