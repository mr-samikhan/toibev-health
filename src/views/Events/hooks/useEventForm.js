import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

//imports
import { addEvent, updateEvent, deleteEvent } from '../actions'
import {
  ADD_TIME_TO_TIMESTAMP,
  convertToObjectToTimestamp,
} from '../../../utils/dateFormats'

const recurrenceOptions = [
  { label: 'Hourly', value: 'hourly' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekdays', value: 'weekdays' },
  { label: 'Weekends', value: 'weekends' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Every 3 Months', value: 'every_3_months' },
  { label: 'Every 6 Months', value: 'every_6_months' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Custom', value: 'custom' },
]

const days = [
  { label: 'Monday', value: 'monday', checked: false },
  { label: 'Tuesday', value: 'tuesday', checked: false },
  { label: 'Wednesday', value: 'wednesday', checked: false },
  { label: 'Thursday', value: 'thursday', checked: false },
  { label: 'Friday', value: 'friday', checked: false },
  { label: 'Saturday', value: 'saturday', checked: false },
  { label: 'Sunday', value: 'sunday', checked: false },
]

export default function useEventForm({ initialState, setOpen, isEdit }) {
  const queryClient = useQueryClient()
  const [selectedVideo, setSelectedVideo] = useState({
    fileUrl: initialState?.video || '',
  })
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [weekdays, setWeekdays] = useState(days)
  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.image || '',
  })
  const [selectedPdf, setSelectedPdf] = useState({
    ...(initialState?.pdf || {}),
  })
  const [isRecurring, setIsRecurring] = useState(false)

  // function getDate() {
  //   if (!initialState?.datetime?.seconds) return ''
  //   const date = new Date(initialState.datetime.seconds * 1000)
  //     .toLocaleDateString()
  //     .split('/')

  //   const day = date[0]
  //   const month = date[1]
  //   const year = date[2]
  //   return { day, month, year }
  // }

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...initialState,
      title: initialState?.title || '',
      description: initialState?.description || '',
      location: initialState?.location || '',
      webLink: initialState?.webLink || '',
      // startTime: initialState?.startTime || '',
      // endTime: initialState?.endTime || '',
      // time: !!initialState?.datetime?.seconds
      //   ? new Date(initialState?.datetime?.seconds * 1000)?.toLocaleTimeString()
      //   : '',
    },
  })

  const { recurrence, frequency } = watch()

  const { isLoading, mutate } = useMutation(isEdit ? updateEvent : addEvent, {
    onSuccess: (success) => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-events')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteEvent,
    {
      onSuccess: (success) => {
        setOpen(false)
        queryClient.invalidateQueries('get-all-events')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const onChecked = (e, index) => {
    const newWeekdays = [...weekdays]
    newWeekdays[index].checked = e.target.checked
    setWeekdays(newWeekdays)
  }

  const onSubmit = (data) => {
    // console.log(data)
    // const dateString = moment(
    //   `${startDate.year}-${startDate.month}-${startDate.day}`
    // ).format('YYYY-MM-DD')
    // const dateTimeString = `${dateString} ${data.time}`
    // const dateTime = moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss')
    // const isoStartDate = moment(dateTime).toISOString()
    // const dateString2 = moment(
    //   `${startDate.year}-${startDate.month}-${startDate.day}`
    // ).format('YYYY-MM-DD')
    // const dateTimeString2 = `${dateString2} ${data.time}`
    // const dateTime2 = moment(dateTimeString2).format('YYYY-MM-DD HH:mm:ss')
    // const isoEndDate = moment(dateTime2).toISOString()

    const body = {
      isRecurring,
      pdf: selectedPdf,
      title: data.title,
      video: selectedVideo,
      image: selectedImage,
      webLink: data.webLink,
      location: data.location,
      description: data.description,
      startDate:
        isEdit && startDate !== null
          ? convertToObjectToTimestamp(startDate)
          : isEdit && startDate === null
          ? initialState.startDate
          : ADD_TIME_TO_TIMESTAMP(startDate, data.startEnd),
      endDate:
        isEdit && endDate !== null
          ? convertToObjectToTimestamp(endDate)
          : isEdit && endDate === null
          ? initialState.endDate
          : ADD_TIME_TO_TIMESTAMP(endDate, data.endTime),
    }
    console.log(body)
    mutate(
      isEdit
        ? { ...body, id: initialState?.id, updatedAt: new Date() }
        : { ...body, createdAt: new Date() }
    )
  }

  return {
    errors,
    control,
    onSubmit,
    endDate,
    weekdays,
    isLoading,
    frequency,
    startDate,
    recurrence,
    selectedPdf,
    onChecked,
    setEndDate,
    isRecurring,
    handleSubmit,
    setStartDate,
    mutateDelete,
    selectedVideo,
    selectedImage,
    setIsRecurring,
    setSelectedPdf,
    isLoadingDelete,
    setSelectedImage,
    setSelectedVideo,
    recurrenceOptions,
  }
}
