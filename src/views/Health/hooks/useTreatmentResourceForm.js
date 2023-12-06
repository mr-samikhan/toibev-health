import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
  updateTreatment,
  addTreatmentResource,
  updateTreatmentResource,
  deleteTreatmentResource,
} from '../actions'

export default function useTreatmentResourceForm({
  data,
  isEdit,
  setOpen,
  initialState,
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
      : null
  )

  const [image, setImage] = useState({
    fileUrl: initialState?.cover_img || '',
  })

  const queryClient = useQueryClient()
  const pdfInputRef = useRef(null)

  const { isLoading, mutate } = useMutation(
    isEdit ? updateTreatmentResource : addTreatmentResource,
    {
      onSuccess: (success) => {
        setOpen(false)
        queryClient.invalidateQueries('get-all-treatments')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const { mutate: updateTreat } = useMutation(updateTreatment, {
    onSuccess: (success) => {},
    onError: (error) => {
      console.log(error)
    },
  })

  const { isLoading: isLoadingDelete, mutate: mutateDeelete } = useMutation(
    deleteTreatmentResource,
    {
      onSuccess: (success) => {
        setOpen(false)
        queryClient.invalidateQueries('get-all-treatments')
      },
      onError: (error) => {
        console.log(error)
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
      : mutate({ ...body, id: data?.id, updatedAt: new Date() })
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
    setTreatDescription,
  }
}
