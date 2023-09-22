import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

//imports
import { deleteAdmin } from '../actions'
import { useSelector } from 'react-redux'

export default function useDeleteAdmin({ data, setShowAlert }) {
  const queryClient = useQueryClient()
  const { handleSubmit } = useForm()

  const { user } = useSelector((state) => state?.Auth) ?? {}

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
    onError: (error) =>
      setShowAlert({
        open: true,
        isError: true,
        message:
          error === 'permission-error'
            ? 'You don`t have permission to delete Adminsitrator!'
            : 'Something went wrong',
      }),
  })

  const onSubmit = () => {
    mutate({ id: data.id, role: data.permissionLevel, currentUser: user })
  }
  return { handleSubmit, onSubmit, isLoading }
}
