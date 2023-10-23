import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { addCulture, deleteCulture, updateCulture } from '../actions'
import { getErrorMessage } from '../../Login/utils'
import { setAlertValues } from '../../../redux/actions/loginActions'

export default function useTribeForm({ isEdit, initialState, setOpen }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { ...initialState },
  })
  const title = watch('title')
  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.cover_img || '',
  })

  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Culture deleted successfully'
          : isEdit
          ? 'Culture updated successfully'
          : 'Culture added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-cultures')
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
    isEdit ? (data) => updateCulture({ ...data, title }) : addCulture,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteCulture,
    {
      onSuccess: (success) => onSuccess({ isDelete: true }),
      onError: (error) => onError(error),
    }
  )

  const handleDelete = () => {
    mutateDelete(initialState.id)
  }

  const onDelete = () => {
    handleDelete()
  }

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      cover_img: selectedImage,
    }

    isEdit ? mutate({ ...data, id: initialState.id }) : mutate(data)
  }

  return {
    errors,
    control,
    isLoading,
    onSubmit,
    onDelete,
    handleSubmit,
    handleDelete,
    selectedImage,
    isLoadingDelete,
    setSelectedImage,
  }
}
