import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useGetCultures } from '../../../hooks/useGetCultures'
import { addLanguage, deleteLanguage, updateLanguage } from '../actions'

export default function useLanguageForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { ...initialState },
  })

  const [selectedTribes, setSelectedTribes] = useState(
    initialState?.tribes || []
  )

  const [selectedVideos, setSelectedVideos] = useState(
    isEdit ? initialState?.videos : []
  )

  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.cover_img || '',
  })
  const queryClient = useQueryClient()
  const {
    cultures,
    isLoading: isLoadingCultures,
    isFetching: isFetchingCultures,
  } = useGetCultures({ enabled: false })

  const { isLoading, mutate } = useMutation(
    isEdit ? updateLanguage : addLanguage,
    {
      onSuccess: (success) => {
        setOpen(false)
        queryClient.invalidateQueries('get-all-languages')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteLanguage,
    {
      onSuccess: (success) => {
        setOpen(false)
        queryClient.invalidateQueries('get-all-languages')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const handleDelete = () => {
    mutateDelete(initialState.id)
  }

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      cover_img: selectedImage,
      tribes: selectedTribes,
      videos: selectedVideos,
    }
    isEdit ? mutate({ ...data, id: initialState.id }) : mutate(data)
  }

  //update language work
  const onSelectTribes = (record) => {
    const index = selectedTribes.findIndex(
      (item) => item.title === record.title
    )

    if (index === -1) {
      selectedTribes.push(record)
    } else {
      selectedTribes.splice(index, 1)
    }
    setSelectedTribes([...selectedTribes])
  }

  const onHandleDeleteTribe = (record) => {
    const deleteRec = selectedTribes.findIndex(
      (item) => item.title === record.title
    )
    if (deleteRec !== -1) {
      selectedTribes.splice(deleteRec, 1)
    }
    setSelectedTribes([...selectedTribes])
  }

  return {
    control,
    cultures,
    onSubmit,
    isLoading,
    handleSubmit,
    handleDelete,
    selectedImage,
    selectedTribes,
    onSelectTribes,
    isLoadingDelete,
    setSelectedImage,
    isLoadingCultures,
    setSelectedTribes,
    isFetchingCultures,
    onHandleDeleteTribe,
    //
    setSelectedVideos,
    selectedVideos,
  }
}
