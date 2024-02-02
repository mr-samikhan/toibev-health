import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//imports
import {
  auth,
  query,
  firestore,
  collection,
  signInWithEmailAndPassword,
} from '../../../firebase'
import { getErrorMessage } from '../utils'
import { getDocs, where } from 'firebase/firestore'
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

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const loginUser = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      let { user } = loginUser
      const q = query(
        collection(firestore, 'Admins'),
        where('uid', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        setIsLoading(false)
        setIsLoginError('Sorry, No matching documents.')
      } else {
        let userDetails = { ...user, ...querySnapshot.docs[0].data() }
        dispatch(setAuthValues(userDetails))
        navigate('/dashboard')
        setIsLoading(false)
        return userDetails
      }
    } catch (error) {
      console.log('Error adding document: ', error)
      setIsLoading(false)
      const err = getErrorMessage(error)
      setIsLoginError(err)
    }
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
