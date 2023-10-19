import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
//imports
import { updateEvent } from './actions'
import { useGetEvents } from '../../hooks/useGetEvents'

export default function useEvent() {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const { data, isLoading, isFetching } = useGetEvents({})

  const { mutate: updateEventDoc } = useMutation(updateEvent, {
    onSuccess: (success) => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-events')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return {
    open,
    setOpen,
    data,
    isLoading,
    isFetching,
    updateEventDoc,
  }
}
