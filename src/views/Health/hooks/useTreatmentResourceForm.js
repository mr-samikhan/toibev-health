import { useState } from 'react'
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
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { ...initialState },
  })
  const [treatDescription, setTreatDescription] = useState(
    initialState?.description
  )
  const queryClient = useQueryClient()

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
    }

    isEdit
      ? mutate({ ...body, id: initialState.id, dataId: data?.id })
      : mutate({ ...body, id: data?.id })
  }

  //update description
  const updateIt = (value, id) => {
    updateTreat({ ...data, id: id, description: value })
  }

  return {
    isEdit,
    control,
    onSubmit,
    onDelete,
    updateIt,
    isLoading,
    handleSubmit,
    isLoadingDelete,
    treatDescription,
    setTreatDescription,
  }
}
