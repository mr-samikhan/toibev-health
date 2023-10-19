import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

//imports
import { Timestamp } from 'firebase/firestore'
import { addEvent, updateEvent, deleteEvent } from '../actions'
import { getFormatedDate } from '../../../utils/dateFormats'

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
  const [startDate, setStartDate] = useState(
    isEdit ? getDate('startDate') : null
  )
  const [endDate, setEndDate] = useState(isEdit ? getDate('endDate') : null)
  const [weekdays, setWeekdays] = useState(days)
  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.image || '',
  })
  const [selectedPdf, setSelectedPdf] = useState({
    ...(initialState?.pdf || {}),
  })
  const [isRecurring, setIsRecurring] = useState(false)

  function getDate(value) {
    if (!initialState[value]?.seconds) return ''
    const date = new Date(initialState[value]?.seconds * 1000)
      .toLocaleDateString()
      .split('/')

    const day = Number(date[0])
    const month = Number(date[1])
    const year = Number(date[2])
    return { day, month, year }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...initialState,
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
    function getCurrentTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0') // Get hours and pad with leading zero if necessary
      const minutes = now.getMinutes().toString().padStart(2, '0') // Get minutes and pad with leading zero if necessary
      return `${hours}:${minutes}`
    }

    //get day month and year
    const currentDate = {
      day: new Date().getDay(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }

    let currentTime = getCurrentTime()
    const body = {
      isRecurring,
      isActive: false,
      pdf: selectedPdf,
      title: data.title,
      video: selectedVideo,
      image: selectedImage,
      webLink: data.webLink,
      location: data.location,
      endTime: data.endTime || currentTime,
      startTime: data.startTime || currentTime,
      description: data.description,
      startDate: Timestamp.fromDate(
        new Date(
          getFormatedDate(
            startDate || currentDate,
            data.startTime || currentTime
          )
        )
      ),
      endDate: Timestamp.fromDate(
        new Date(
          getFormatedDate(endDate || currentDate, data.endTime || currentTime)
        )
      ),
    }

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
