import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
//imports
import {
  addGroupSession,
  deleteGroupSession,
  updateGroupSession,
} from '../actions'
import { Timestamp } from '../../../firebase'
import { useMutation, useQueryClient } from 'react-query'
import { getFormatedDate } from '../../../utils/dateFormats'
import { useDispatch } from 'react-redux'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { getErrorMessage } from '../../Login/utils'

export default function useGroupSessionForm({
  data,
  isEdit,
  setOpen,
  initialState,
}) {
  const [endDate, setEndDate] = useState(isEdit ? getDate('endDate') : null)
  const [startDate, setStartDate] = useState(
    isEdit ? getDate('startDate') : null
  )
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const {
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialState,
    },
  })

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Group Session deleted successfully'
          : isEdit
          ? 'Group Session updated successfully'
          : 'Group Session added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-group-sessions')
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

  function getDate(value) {
    if (!initialState[value].seconds) return ''
    const date = new Date(initialState[value].seconds * 1000)
      .toLocaleDateString()
      .split('/')

    const day = Number(date[0])
    const month = Number(date[1])
    const year = Number(date[2])
    return { day, month, year }
  }

  const { isLoading, mutate } = useMutation(
    isEdit ? updateGroupSession : addGroupSession,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteGroupSession,
    {
      onSuccess: (success) => onSuccess({ isDelete: true }),
      onError: (error) => onError(error),
    }
  )

  const onSubmit = (data) => {
    const body = {
      title: data?.title,
      endTime: data?.endTime,
      location: data?.location,
      startTime: data?.startTime,
      description: data?.description,
      startDate: Timestamp.fromDate(
        new Date(getFormatedDate(startDate, data.startTime))
      ),
      endDate: Timestamp.fromDate(
        new Date(getFormatedDate(endDate, data.endTime))
      ),
    }

    isEdit
      ? mutate({ ...body, id: initialState.id, updatedAt: new Date() })
      : mutate({ ...body, createdAt: new Date() })
  }

  const onDelete = () => {
    mutateDelete(initialState?.id)
  }

  useEffect(() => {
    isEdit && reset({ ...data })
  }, isEdit)

  return {
    errors,
    isEdit,
    control,
    endDate,
    onSubmit,
    onDelete,
    isLoading,
    startDate,
    setEndDate,
    handleSubmit,
    setStartDate,
    isLoadingDelete,
  }
}
