import moment from 'moment'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { updateProvider } from '../actions'
import { defaultAvailableTimes, myCustomLocale } from '../../../constants'

export const useProviderAvailabilityForm = (props) => {
  const { isEdit, initialState, setOpen } = props

  const queryClient = useQueryClient()
  const { control, handleSubmit, reset } = useForm()

  const [selectedDays, setSelectedDays] = useState(
    initialState?.availabilities?.map(({ date }) => {
      return {
        year: Number(date.split('-')[0]),
        month: Number(date.split('-')[1]),
        day: Number(date.split('-')[2]),
      }
    }) ?? []
  )

  const [availableTimes, setAvailableTimes] = useState(
    defaultAvailableTimes?.map((timeSlot) => {
      const isSelected = initialState?.availabilities?.some((selectedTime) => {
        return timeSlot.value === selectedTime.time
      })

      return { ...timeSlot, isSelected }
    })
  )

  const { isLoading, mutate } = useMutation(updateProvider, {
    onSuccess: (success) => {
      setOpen(false)
      queryClient.invalidateQueries('get-all-providers')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleAvailableTime = (selectedTime) => {
    const times = availableTimes
    const updatedTimes = times.map((time) =>
      selectedTime.value === time.value
        ? { ...selectedTime, isSelected: !selectedTime?.isSelected }
        : time
    )
    setAvailableTimes(updatedTimes)
  }

  const onSubmit = () => {
    const days = selectedDays.map((day) =>
      moment(`${day.year}-${day.month}-${day.day}`).format('YYYY-MM-DD')
    )

    const hours = availableTimes
      .filter((time) => time.isSelected)
      .map((hour) => hour.value)

    const availabilities = [].concat(
      ...days.map((date) => {
        return hours.map((time) => {
          return { date, time }
        })
      })
    )
    const uniqueSet = new Set(
      availabilities.map((item) => JSON.stringify(item))
    )

    const uniqueArray = Array.from(uniqueSet).map((item) => JSON.parse(item))

    mutate({
      data: {
        availabilities: uniqueArray,
        id: initialState.id,
        updatedAt: new Date(),
      },
    })
  }

  useEffect(() => {
    isEdit && reset({ ...initialState })
  }, isEdit)

  return {
    control,
    onSubmit,
    isLoading,
    selectedDays,
    handleSubmit,
    availableTimes,
    setSelectedDays,
    handleAvailableTime,
    myCustomLocale: myCustomLocale,
    ...props,
  }
}
