import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
//imports
import { getErrorMessage } from '../../Login/utils'
import { addClinic, deleteClinic, updateClinic } from '../actions'
import { setAlertValues } from '../../../redux/actions/loginActions'

export default function useClinicForm({ initialState, isEdit, setOpen }) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [selectedImageOne, setSelectedImageOne] = useState({
    fileUrl: initialState?.images[0] || '',
  })
  const [selectedImageTwo, setSelectedImageTwo] = useState({
    fileUrl: initialState?.images[1] || '',
  })
  const [departments, setDepartments] = useState(
    initialState?.departments ?? [{ name: '', phone1: '', phone2: '' }]
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...initialState } })

  //success
  const onSuccess = ({ isDelete, callBack }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Clinic deleted successfully'
          : isEdit
          ? 'Clinic updated successfully'
          : 'Clinic added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-clinics')
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

  const { isLoading, mutate } = useMutation(isEdit ? updateClinic : addClinic, {
    onSuccess: (success) => {
      onSuccess({ isDelete: false })
    },
    onError: (error) => {
      const err = getErrorMessage(error)
      onError(err)
    },
  })

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteClinic,
    {
      onSuccess: (success) => {
        onSuccess({ isDelete: true })
      },
      onError: (error) => {
        const err = getErrorMessage(error)
        onError(err)
      },
    }
  )

  const addDepartment = () => {
    setDepartments([...departments, { name: '', phone1: '', phone2: '' }])
  }

  const handleChange = (e, index, name) => {
    const values = [...departments]
    values[index][name] = e.target.value
    setDepartments(values)
  }

  const onSubmit = (data) => {
    const body = {
      ...data,
      images: [
        isEdit
          ? selectedImageOne === null
            ? { fileUrl: '' }
            : selectedImageOne
          : selectedImageOne,
        isEdit
          ? selectedImageTwo === null
            ? { fileUrl: '' }
            : selectedImageTwo
          : selectedImageTwo,
      ],
      departments,
    }

    mutate(
      isEdit
        ? { ...body, id: initialState?.id, updatedAt: new Date() }
        : { ...body, createdAt: new Date() }
    )
  }

  return {
    errors,
    control,
    onSubmit,
    isLoading,
    departments,
    mutateDelete,
    handleSubmit,
    handleChange,
    addDepartment,
    setDepartments,
    isLoadingDelete,
    selectedImageTwo,
    selectedImageOne,
    setSelectedImageTwo,
    setSelectedImageOne,
  }
}
