import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
  addTreatmentResource,
  updateTreatmentResource,
  deleteTreatmentResource,
} from '../actions'

export default function useTreatmentResourceForm({
  isEdit,
  data,
  setOpen,
  initialState,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { ...initialState },
  })
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

  return {
    isEdit,
    control,
    onDelete,
    onSubmit,
    isLoading,
    handleSubmit,
    isLoadingDelete,
  }
}
