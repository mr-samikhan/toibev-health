import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { addQuestion, updateQuestion } from '../actions'
import { useDispatch } from 'react-redux'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { getErrorMessage } from '../../Login/utils'
import { useGetAssessmentQuestions } from '../../../hooks/useGetAssessmentQuestions'

export default function useQuestionForm({ isEdit, setOpen, initialState }) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { state: assessment } = useLocation()

  //get id from the url
  const { state } = useLocation()

  const { questions } = useGetAssessmentQuestions({
    id: state?.id,
    enabled: false,
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...initialState } })
  const [answers, setAnswers] = useState(initialState?.answers ?? [])

  //success
  const onSuccess = ({ isDelete, callBack }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Question deleted successfully'
          : isEdit
          ? 'Question updated successfully'
          : 'Question added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-assessment-questions')
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
      queryClient.invalidateQueries('get-assessment-questions')
    }, 3000)
  }

  const handleAddAnswer = () => {
    setAnswers([
      ...answers,
      { id: ++answers.length, isCorrect: false, description: '' },
    ])
  }

  const handleChangeAnswer = (idx, value) => {
    setAnswers(
      answers.map((answer, index) =>
        index === idx ? { ...answer, value, description: value } : { ...answer }
      )
    )
  }

  const handleRemove = (idx) => {
    let updatedAnswers = answers
    updatedAnswers = updatedAnswers.filter((item, index) => index !== idx)
    setAnswers(updatedAnswers)
  }

  const handleCheck = (idx) => {
    let updatedAnswers = answers
    updatedAnswers = updatedAnswers.map((item, index) =>
      index === idx
        ? { ...item, checked: !item.checked, isCorrect: !item.checked }
        : item
    )
    setAnswers(updatedAnswers)
  }

  const { isLoading, mutate } = useMutation(
    isEdit ? updateQuestion : addQuestion,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )

  const onSubmit = (data) => {
    const body = {
      data: {
        question: data.question,
        answers,
        docId: assessment?.id,
      },
      id: assessment?.id,
    }

    mutate(
      isEdit
        ? { ...body, questionId: initialState?.id, updatedAt: new Date() }
        : {
            ...body,
            createdAt: new Date(),
            index: questions?.length === 0 ? 0 : questions?.length + 1,
          }
    )
  }

  return {
    errors,
    control,
    answers,
    onSubmit,
    setAnswers,
    isLoading,
    handleCheck,
    initialState,
    handleSubmit,
    handleRemove,
    handleAddAnswer,
    handleChangeAnswer,
  }
}
