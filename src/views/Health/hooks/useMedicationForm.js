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

export default function useMedicationForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit, reset } = useForm()

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

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-medication')
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
    isEdit ? mutate({ ...body, id: initialState.id }) : mutate(body)
  }

  const onDelete = () => {
    mutateDelete(initialState?.id)
  }

  useEffect(() => {
    isEdit && reset({ ...initialState })
  }, isEdit)

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    onDelete,
    isEdit,
    isLoadingDelete,
  }
}
