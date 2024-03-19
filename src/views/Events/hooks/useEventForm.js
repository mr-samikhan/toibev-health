import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

//imports
import { Timestamp } from 'firebase/firestore'
import { getFormatedDate } from '../../../utils/dateFormats'
import { addEvent, updateEvent, deleteEvent } from '../actions'
import { useDispatch } from 'react-redux'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { getErrorMessage } from '../../Login/utils'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

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

export default function useEventForm({
  initialState,
  setOpen,
  isEdit,
  allData,
}) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

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
  const [isRecurring, setIsRecurring] = useState(
    initialState?.isRecurring || false
  )

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

  //success
  const onSuccess = ({ isDelete, message }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Event deleted successfully'
          : isEdit
          ? message || 'Event updated successfully'
          : 'Event added successfully',
        isOpen: true,
      })
    )

    setOpen(false)
    queryClient.invalidateQueries('get-all-events')
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

  const { isLoading, mutate } = useMutation(isEdit ? updateEvent : addEvent, {
    onSuccess: (success) => {
      onSuccess({ isDelete: false })
    },
    onError: (error) => {
      onError(error)
      console.log(error)
    },
  })

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteEvent,
    {
      onSuccess: (success) => {
        onSuccess({ isDelete: true, message: success })
      },
      onError: (error) => {
        onError(error)
        console.log(error)
      },
    }
  )

  const onChecked = (e, index) => {
    const newWeekdays = [...weekdays]
    newWeekdays[index].checked = e.target.checked
    setWeekdays(newWeekdays)
  }

  const getTimeString = (time) => {
    dayjs.extend(customParseFormat)
    dayjs.extend(utc)
    const parsedDate = dayjs(time)

    const timeOnly = parsedDate.format('h:mm')
    return timeOnly
  }

  const onSubmit = async (data) => {
    function getCurrentTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
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
      pdf: selectedPdf,
      title: data.title,
      video: selectedVideo,
      image: selectedImage,
      webLink: data.webLink,
      location: data.location,
      frequency: frequency || '',
      period: data.period || '',
      description: data.description,
      recurrence: isRecurring ? recurrence : '',

      startTime: isEdit
        ? isEdit && data?.startTime?.$d
          ? getTimeString(data?.startTime?.$d)
          : initialState?.startTime
        : getTimeString(data?.startTime?.$d) || getTimeString(startDate),
      endTime: isEdit
        ? isEdit && data?.endTime?.$d
          ? getTimeString(data?.endTime?.$d)
          : initialState?.endTime
        : getTimeString(data?.endTime?.$d) || getTimeString(endDate),
      startDate: isEdit
        ? isEdit && data?.startTime?.$d
          ? Timestamp.fromDate(
              new Date(
                getFormatedDate(
                  startDate,
                  getTimeString(data?.startTime?.$d) || currentTime
                )
              )
            )
          : initialState?.startDate
        : Timestamp.fromDate(
            new Date(
              getFormatedDate(
                startDate,
                getTimeString(data?.startTime?.$d) || currentTime
              )
            )
          ),
      endDate: isEdit
        ? isEdit && data?.endTime?.$d
          ? Timestamp.fromDate(
              new Date(
                getFormatedDate(
                  endDate,
                  getTimeString(data?.endTime?.$d) || currentTime
                )
              )
            )
          : initialState?.endDate
        : Timestamp.fromDate(
            new Date(
              getFormatedDate(
                endDate,
                getTimeString(data?.endTime?.$d) || currentTime
              )
            )
          ),
    }

    mutate(
      isEdit
        ? { ...body, id: initialState?.id, updatedAt: new Date() }
        : { data: { ...body, createdAt: new Date() }, allData }
    )
  }

  return {
    watch,
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
