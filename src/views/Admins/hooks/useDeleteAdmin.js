import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

//imports
import { deleteAdmin } from '../actions'

export default function useDeleteAdmin({ data, setShowAlert }) {
  const queryClient = useQueryClient()
  const { handleSubmit } = useForm()

  const { isLoading, mutate } = useMutation(deleteAdmin, {
    onSuccess: () => {
      setShowAlert({
        open: true,
        message: 'Admin deleted successfully',
      })
      setTimeout(() => {
        queryClient.invalidateQueries('get-all-admins')
      }, 2000)
    },
    onError: () =>
      setShowAlert({
        open: true,
        isError: true,
        message: 'Something went wrong',
      }),
  })

  const onSubmit = () => {
    mutate({ id: data.id })
  }
  return { handleSubmit, onSubmit, isLoading }
}
