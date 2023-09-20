import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//imports
import { getErrorMessage } from '../utils'
import { auth, signInWithEmailAndPassword } from '../../../firebase'
import { setAuthValues } from '../../../redux/actions/loginActions'

export default function useLoginForm({ isEdit, data }) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoginError, setIsLoginError] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((data) => {
        dispatch(setAuthValues(data))
        navigate('/dashboard')
        setIsLoading(false)
        return data
      })
      .catch((error) => {
        //Alert Error Message
        setIsLoading(false)
        const err = getErrorMessage(error)
        setIsLoginError(err)
      })
  }

  useEffect(() => {
    isEdit && reset({ ...data })
  }, isEdit)

  return {
    errors,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
    isLoginError,
  }
}
