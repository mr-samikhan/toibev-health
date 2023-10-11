import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { addService, deleteService, updateService } from '../actions'

export default function useServiceForm({
  isEdit,
  clinics,
  setOpen,
  initialState,
}) {
  const clinicOptions = clinics.map((clinic) => ({
    label: clinic?.title,
    value: clinic?.title,
  }))

  const queryClient = useQueryClient()
  const [selectedImageOne, setSelectedImageOne] = useState({
    fileUrl: initialState?.images[0] || '',
  })
  const [selectedImageTwo, setSelectedImageTwo] = useState({
    fileUrl: initialState?.images[1] || '',
  })
  const [acheivements, setAcheivements] = useState(
    initialState?.acheivements ?? []
  )

  const [services, setServices] = useState(initialState?.services ?? [])
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...initialState } })

  const { isLoading, mutate } = useMutation(
    isEdit ? updateService : addService,
    {
      onSuccess: (success) => {
        setOpen(false)
        queryClient.invalidateQueries('get-all-services')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteService,
    {
      onSuccess: (success) => {
        setOpen(false)
        queryClient.invalidateQueries('get-all-services')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

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
      acheivements,
      services,
    }

    mutate(
      isEdit
        ? { ...body, id: initialState?.id, updatedAt: new Date() }
        : { ...body, createdAt: new Date() }
    )
  }

  const checkKeyDown = (e) => {
    // if (e.key === "Enter") e.preventDefault();
  }

  return {
    errors,
    control,
    onSubmit,
    services,
    isLoading,
    setServices,
    handleSubmit,
    acheivements,
    checkKeyDown,
    mutateDelete,
    clinicOptions,
    isLoadingDelete,
    setAcheivements,
    selectedImageTwo,
    selectedImageOne,
    setSelectedImageTwo,
    setSelectedImageOne,
  }
}
