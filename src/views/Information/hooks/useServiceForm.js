import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
//imports
import { getErrorMessage } from '../../Login/utils'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { addService, deleteService, updateService } from '../actions'

export default function useServiceForm({
  isEdit,
  clinics,
  setOpen,
  services_,
  initialState,
}) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const clinicOptions = clinics.map((clinic) => ({
    label: clinic?.title,
    value: clinic?.title,
  }))

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
        dispatch(
          setAlertValues({
            type: 'success',
            message: isEdit
              ? 'Service updated successfully'
              : 'Service added successfully',
            isOpen: true,
          })
        )

        setOpen(false)
        queryClient.invalidateQueries('get-all-services')
      },
      onError: (error) => {
        const err = getErrorMessage(error)
        dispatch(
          setAlertValues({
            type: 'error',
            isOpen: true,
            message: err || 'Something went wrong!',
          })
        )
      },
    }
  )

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteService,
    {
      onSuccess: (success) => {
        dispatch(
          setAlertValues({
            type: 'success',
            isOpen: true,
            message: 'Service deleted successfully',
          })
        )
        queryClient.invalidateQueries('get-all-services')
      },
      onError: (error) => {
        const err = getErrorMessage(error)
        return dispatch(
          setAlertValues({
            type: 'error',
            message: err || 'Something went wrong!',
            isOpen: true,
          })
        )
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
        : { data: { ...body, createdAt: new Date() }, services_ }
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
