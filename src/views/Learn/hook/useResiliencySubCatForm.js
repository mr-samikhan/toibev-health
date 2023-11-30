import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { getErrorMessage } from '../../Login/utils'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { addResiliencySubCat, updateResiliencySubCat } from '../actions'

export default function useResiliencySubCatForm({
  cat,
  isEdit,
  setOpen,
  initialState,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: initialState?.title },
  })

  const [pdf, setPdf] = React.useState(
    isEdit
      ? {
          fileUrl: initialState?.pdf?.fileUrl || '',
          fileName: initialState?.pdf?.fileName || '',
          fileSize: initialState?.pdf?.fileSize || '',
        }
      : null
  )

  const [image, setImage] = React.useState({
    fileUrl: initialState?.cover_img || '',
  })
  const pdfInputRef = useRef(null)
  const queryClient = useQueryClient()

  const dispatch = useDispatch()

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Resilliency Cat deleted successfully'
          : isEdit
          ? 'Resilliency Cat updated successfully'
          : 'Resilliency Cat added successfully',
        isOpen: true,
      })
    )

    setTimeout(() => {
      setOpen(false)
      queryClient.invalidateQueries('get-reseliency')
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
    isEdit ? updateResiliencySubCat : addResiliencySubCat,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const fileUrl = URL.createObjectURL(file)

    setPdf({
      file,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
      fileType: file.type,
      fileUrl,
    })
  }

  const handleFileUpload = () => {
    pdfInputRef.current.click()
  }

  const handleRemoveFile = () => {
    setPdf(null)
  }

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      pdf,
      cover_img: image,
      cat: cat || '',
    }
    isEdit
      ? mutate({ data: { ...data, id: initialState?.id }, collectionName: cat })
      : mutate(data)
  }

  return {
    pdf,
    image,
    errors,
    setPdf,
    control,
    setImage,
    onSubmit,
    isLoading,
    pdfInputRef,
    handleSubmit,
    handleFileUpload,
    handleRemoveFile,
    handleFileChange,
  }
}
