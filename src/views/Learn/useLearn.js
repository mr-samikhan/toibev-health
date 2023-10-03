import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useGetReseliency } from '../../hooks/useGetReseliency'

//imports
import { updateDescription } from './actions'
import { useBreakpints } from '../../common/helpers'
import { useGetCultures } from '../../hooks/useGetCultures'
import { useGetLanguages } from '../../hooks/useGetLanguages'

export const useLearn = () => {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const { mobileMode } = useBreakpints()

  const {
    cultures,
    isLoading: isLoadingCultures,
    isFetching: isFetchingCultures,
  } = useGetCultures({ enabled: tab === 0 })

  const {
    languages,
    isLoading: isLoadingLanguages,
    isFetching: isFetchingLanguages,
  } = useGetLanguages({ enabled: tab === 1 })

  const {
    reseliency,
    isLoading: isLoadingReseliency,
    isFetching: isFetchingReseliency,
  } = useGetReseliency({ enabled: tab === 2 })

  const queryClient = useQueryClient()

  const { isLoading, mutate } = useMutation(updateDescription, {
    onSuccess: (success) => {},
    onError: (error) => {
      console.log(error)
    },
  })

  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const handleChange = (e) => {
    mutate({ description: e.target.value })
  }

  const onRowClick = (item) => {
    console.log('>>>>>', item)
  }

  return {
    tab,
    open,
    setTab,
    setOpen,
    anchorEl,
    cultures,
    languages,
    reseliency,
    isLoading,
    mobileMode,
    onRowClick,
    setAnchorEl,
    handleClose,
    handleClick,
    handleChange,
    isLoadingCultures,
    isFetchingCultures,
    isLoadingLanguages,
    isFetchingLanguages,
    isLoadingReseliency,
    isFetchingReseliency,
  }
}
