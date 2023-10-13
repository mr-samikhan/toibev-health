import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { addCondition, updateCondition } from '../actions'
import { useDispatch } from 'react-redux'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { getErrorMessage } from '../../Login/utils'

const correctPercentageOptions = [
  { label: '% Range', value: 'range' },
  { label: 'Under Certain %', value: 'lesser' },
  { label: 'Above Certain %', value: 'greater' },
]

const displayInfo = [
  { label: 'Show Url', value: 'Show Url' },
  { label: 'Show Phone Number', value: 'Show Phone Number' },
  { label: 'Show Nothing', value: 'Show Nothing' },
]

export default function useConditionForm({ isEdit, setOpen, initialState }) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { state: assessment } = useLocation()

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      conditionType: 'range',
      ...initialState,
    },
  })
  const conditionType = watch('conditionType')

  //success
  const onSuccess = ({ isDelete, callBack }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Condition deleted successfully'
          : isEdit
          ? 'Condition updated successfully'
          : 'Condition added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-assessment-conditions')
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
      queryClient.invalidateQueries('get-assessment-conditions')
    }, 3000)
  }

  const { isLoading, mutate } = useMutation(
    isEdit ? updateCondition : addCondition,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )

  const onSubmit = (data) => {
    let body = {}
    if (conditionType === 'range')
      body = {
        display: data?.display,
        conditionType: data?.conditionType,
        startRange: data?.startRange,
        endRange: data?.endRange,
        assessmentId: assessment?.id,
      }
    else if (conditionType === 'lesser')
      body = {
        display: data?.display,
        conditionType: data?.conditionType,
        lesserThan: data?.lesserThan,
        assessmentId: assessment?.id,
      }
    else
      body = {
        display: data?.display,
        conditionType: data?.conditionType,
        greaterThan: data?.greaterThan,
        assessmentId: assessment?.id,
      }

    mutate(
      isEdit
        ? { ...body, conditionId: initialState?.id, updatedAt: new Date() }
        : { ...body, createdAt: new Date() }
    )
  }

  return {
    control,
    onSubmit,
    isLoading,
    handleSubmit,
    conditionType,
    correctPercentageOptions,
    displayInfoOptions: displayInfo,
  }
}
