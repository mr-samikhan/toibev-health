import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addProvider, updateProvider } from '../actions'
import { useMutation, useQueryClient } from 'react-query'

export default function useProviderForm(props) {
  const { isEdit, initialState, setOpen } = props
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const queryClient = useQueryClient()

  const { isLoading, mutate } = useMutation(
    isEdit ? updateProvider : addProvider,
    {
      onSuccess: (success) => {
        setOpen(false)
        queryClient.invalidateQueries('get-all-providers')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const onSubmit = (data) => {
    const body = {
      name: data?.name,
      address: data?.address,
      position: data?.position,
      socialLinks: data?.socialLinks,
    }
    isEdit
      ? mutate({ ...body, id: initialState.id, updatedAt: new Date() })
      : mutate({ ...body, createdAt: new Date() })
  }

  useEffect(() => {
    isEdit && reset({ ...initialState })
  }, isEdit)

  return {
    errors,
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    ...props,
  }
}
