import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
  updateTreatment,
  addTreatmentResource,
  updateTreatmentResource,
  deleteTreatmentResource,
} from '../actions'
import { useDispatch } from 'react-redux'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { getErrorMessage } from '../../Login/utils'

export default function useTreatmentResourceForm({
  data,
  isEdit,
  setOpen,
  initialState,
  allResources,
  treatmentOptions,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...initialState },
  })
  const [treatDescription, setTreatDescription] = useState(
    initialState?.description
  )

  const [pdf, setPdf] = useState(
    isEdit
      ? {
          fileUrl: initialState?.pdf?.fileUrl || '',
          fileName: initialState?.pdf?.fileName || '',
          fileSize: initialState?.pdf?.fileSize || '',
        }
      : {
          fileUrl: '',
          fileName: '',
          fileSize: '',
        }
  )

  const [image, setImage] = useState({
    fileUrl: initialState?.cover_img || '',
  })

  const queryClient = useQueryClient()
  const pdfInputRef = useRef(null)
  const dispatch = useDispatch()

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Treatment Resource deleted successfully'
          : isEdit
          ? 'Treatment Resource updated successfully'
          : 'Treatment Resource added successfully',
        isOpen: true,
      })
    )

    setOpen(false)
    queryClient.invalidateQueries('get-all-treatments')
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
    isEdit ? updateTreatmentResource : addTreatmentResource,
    {
      onSuccess: (success) => {
        onSuccess({ isDelete: false })
      },
      onError: (error) => {
        console.log(error)
        onError(error)
      },
    }
  )

  const { isLoading: updateTreatLoading, mutate: updateTreat } = useMutation(
    updateTreatment,
    {
      onSuccess: (success) => {
        queryClient.invalidateQueries('get-all-treatments')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const { isLoading: isLoadingDelete, mutate: mutateDeelete } = useMutation(
    deleteTreatmentResource,
    {
      onSuccess: (success) => {
        onSuccess({
          isDelete: true,
        })
      },
      onError: (error) => {
        console.log(error)
        onError(error)
      },
    }
  )

  const onDelete = () => {
    // console.log('>>>>>id', data.id)
    mutateDeelete({ id: initialState.id, dataId: data?.id })
  }

  const onSubmit = (formData) => {
    const body = {
      title: formData?.title,
      pdf,
      cover_img: image,
    }

    console.log(body)

    isEdit
      ? mutate({
          ...body,
          id: initialState.id,
          dataId: data?.id,
          createdAt: new Date(),
        })
      : mutate({
          data: { ...body, id: data?.id, updatedAt: new Date() },
          treatmentOptions,
        })
  }

  //update description
  const updateIt = (value, id) => {
    updateTreat({ ...data, id: id, description: value })
  }

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
    setPdf({
      fileName: '',
      fileSize: '',
      fileType: '',
    })
  }

  return {
    pdf,
    image,
    errors,
    isEdit,
    control,
    setImage,
    onSubmit,
    onDelete,
    updateIt,
    isLoading,
    pdfInputRef,
    handleSubmit,
    isLoadingDelete,
    treatDescription,
    handleFileChange,
    handleFileUpload,
    handleRemoveFile,
    updateTreatLoading,
    setTreatDescription,
  }
}
