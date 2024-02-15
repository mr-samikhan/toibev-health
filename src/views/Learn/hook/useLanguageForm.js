import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
//imports
import { getErrorMessage } from '../../Login/utils'
import { useGetEvents } from '../../../hooks/useGetEvents'
import { useGetCultures } from '../../../hooks/useGetCultures'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { addLanguage, deleteLanguage, updateLanguage } from '../actions'

export default function useLanguageForm({
  isEdit,
  setOpen,
  initialState,
  allLanguages,
}) {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...initialState },
  })

  const [selectedTribes, setSelectedTribes] = useState(
    initialState?.tribes || []
  )

  const [selectedVideos, setSelectedVideos] = useState(
    isEdit ? initialState?.videos : []
  )

  const [audioFile, setAudioFile] = useState(
    isEdit
      ? initialState?.audio
      : {
          fileUrl: '',
          fileName: '',
          fileSize: '',
          fileType: '',
        }
  )

  const [languages, setLanguages] = useState(initialState?.words || [])

  const [selectedCourses, setSelectedCourses] = useState(
    isEdit ? initialState?.courses : []
  )

  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.cover_img || '',
  })

  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Language deleted successfully'
          : isEdit
          ? 'Language updated successfully'
          : 'Language added successfully',
        isOpen: true,
      })
    )

    // setTimeout(() => {
    setOpen(false)
    queryClient.invalidateQueries('get-all-languages')
    // }, 3000)
  }

  //error
  const onError = (error) => {
    const err = getErrorMessage(error)
    dispatch(
      setAlertValues({
        type: 'error',
        isOpen: true,
        message: err || 'Something went wrong!',
      })
    )
  }

  const {
    cultures,
    isLoading: isLoadingCultures,
    isFetching: isFetchingCultures,
  } = useGetCultures({ enabled: false })

  const { data } = useGetEvents({ enabled: true })

  const { isLoading, mutate } = useMutation(
    isEdit ? updateLanguage : addLanguage,
    {
      onSuccess: (success) => onSuccess({ isDelete: false }),
      onError: (error) => onError(error),
    }
  )
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteLanguage,
    {
      onSuccess: (success) => onSuccess({ isDelete: true }),
      onError: (error) => onError(error),
    }
  )

  const onSelectCourses = (course) => {
    let index = selectedCourses.findIndex((item) => item.id === course.id)
    if (index === -1) {
      //set only few things
      setSelectedCourses([
        ...selectedCourses,
        {
          id: course.id,
          title: course.title,
          startDate: course.startDate,
          endDate: course.endDate,
          location: course.location,
          image: course.image,
        },
      ])
    } else {
      let temp = [...selectedCourses]
      temp.splice(index, 1)
      setSelectedCourses(temp)
    }
  }

  const handleDelete = () => {
    mutateDelete(initialState.id)
  }

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      words: languages,
      tribes: selectedTribes,
      videos: selectedVideos,
      courses: selectedCourses,
      //audio file
      // audio: audioFile,
      // cover_img: selectedImage,
    }
    isEdit
      ? mutate({
          data: { ...data, id: initialState.id },
          newTitle:
            watch('title') !== initialState.title ? watch('title') : null,
        })
      : mutate({ data, allLanguages: allLanguages })
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
    errors,
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
    languages,
    audioFile,
    setLanguages,
    setAudioFile,
    events: data,
    selectedVideos,
    selectedCourses,
    onSelectCourses,
    setSelectedVideos,
    setSelectedCourses,
  }
}
