import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
//imports
import { getErrorMessage } from '../../Login/utils'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { addAssessment, deleteAssessment, updateAssessment } from '../actions'

export default function useAddAssessment({ isEdit, data, setOpen }) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? { ...data } : {},
  })

  //success
  const onSuccess = ({ isDelete, callBack }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Assessment deleted successfully'
          : isEdit
          ? 'Assessment updated successfully'
          : 'Assessment added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-assessments')
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
    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-assessments')
    }, 3000)
  }

  const { isLoading, mutate } = useMutation(
    isEdit ? updateAssessment : addAssessment,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteAssessment,
    {
      onSuccess: (success) => onSuccess({ isDelete: true }),
      onError: (error) => onError(error),
    }
  )

  const onSubmit = (data) => {
    isEdit
      ? mutate({ ...data, id: data.id, updatedAt: new Date() })
      : mutate({ ...data, createdAt: new Date() })
  }
  return {
    errors,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
    mutateDelete,
    isLoadingDelete,
  }
}
