import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { addTreatment, updateTreatment } from '../actions'
import { useDispatch } from 'react-redux'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { getErrorMessage } from '../../Login/utils'

export default function useGroupSessionForm({
  isEdit,
  data,
  setOpen,
  initialState,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ...initialState },
  })

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Treatment deleted successfully'
          : isEdit
          ? 'Treatment updated successfully'
          : 'Treatment added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-treatments')
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
    isEdit ? updateTreatment : addTreatment,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )

  const onSubmit = (data) => {
    const body = {
      title: data?.title,
    }
    isEdit ? mutate({ ...body, id: initialState.id }) : mutate(body)
  }

  useEffect(() => {
    isEdit && reset({ ...data })
  }, isEdit)

  return {
    errors,
    isEdit,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
  }
}
