import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
  addMedicationsList,
  deleteMedicationsList,
  updateMedicationsList,
} from '../actions'
import { getErrorMessage } from '../../Login/utils'
import { setAlertValues } from '../../../redux/actions/loginActions'

export default function useMedicationForm({
  isEdit,
  setOpen,
  medications,
  initialState,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Medication deleted successfully'
          : isEdit
          ? 'Medication updated successfully'
          : 'Medication added successfully',
        isOpen: true,
      })
    )

    setOpen(false)
    queryClient.invalidateQueries('get-all-medication')
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
    isEdit ? updateMedicationsList : addMedicationsList,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteMedicationsList,
    {
      onSuccess: (success) => onSuccess({ isDelete: true }),
      onError: (error) => onError(error),
    }
  )

  const onSubmit = (data) => {
    const body = {
      title: data?.title,
      url: data?.url,
    }
    isEdit
      ? mutate({ ...body, id: initialState.id })
      : mutate({ data: body, medications })
  }

  const onDelete = () => {
    mutateDelete(initialState?.id)
  }

  useEffect(() => {
    isEdit && reset({ ...initialState })
  }, isEdit)

  return {
    errors,
    control,
    isEdit,
    onSubmit,
    onDelete,
    isLoading,
    handleSubmit,
    isLoadingDelete,
  }
}
