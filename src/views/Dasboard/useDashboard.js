import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useGetUsers } from '../../hooks/useGetUsers'
import { useGetEvents } from '../../hooks/useGetEvents'
import { fetchAvailablilites } from '../Health/actions'
import { useGetProviders } from '../../hooks/useGetProviders'
import { useGetReseliency } from '../../hooks/useGetReseliency'
import { useGetAssessments } from '../../hooks/useGetAssessments'
import { useGetAssessmentConditions } from '../../hooks/useGetAssessmentConditions'

export const useDashboard = () => {
  const [tab, setTab] = useState(0)
  const [toggle, setToggle] = useState(false)

  const { startDate, endDate } = useSelector((state) => state?.Dashboard) ?? {}

  const [filterData, setFilterData] = useState({
    events: [],
    assessments: [],
    assessmentOptions: [],
    users: [],
    reseliency: [],
    conditions: [],
    surveyConditions: [],
    groupedProvidersByLocation: [],
    totalScheduledAppointments: null,
  })

  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetching: isFetchingEvents,
  } = useGetEvents({})

  const {
    assessments,
    assessmentOptions,
    isLoading: isLoadingAssessments,
    isFetching: isFetchingAssessments,
  } = useGetAssessments({})

  const {
    users,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useGetUsers({})

  const {
    groupedProvidersByLocation,
    isLoading: isLoadingGeography,
    isFetching: isFetchingGeography,
    totalScheduledAppointments,
  } = useGetProviders({})

  const {
    reseliency,
    isLoading: isLoadingResources,
    isFetching: isFechingResources,
  } = useGetReseliency({})

  let eventCheck = startDate && endDate ? filterData.events : events
  let assessmentCheck =
    startDate && endDate ? filterData.assessments : assessments
  let usersCheck = startDate && endDate ? filterData.users : users
  let reseliencyCheck =
    startDate && endDate ? filterData.reseliency : reseliency
  let groupProviders =
    startDate && endDate
      ? filterData.groupedProvidersByLocation
      : groupedProvidersByLocation

  const [selectedAssessment, setSelectedAssessment] = useState(
    assessmentCheck?.length ? assessmentCheck[0] : {}
  )

  function filterDataBetweenDates(data_, startDate, endDate) {
    return data_?.filter((item) => {
      const itemDate = new Date(item?.createdAt?.seconds * 1000)
      const applystartDate = new Date(startDate).getTime()
      const applyendDate = new Date(endDate).getTime()

      return itemDate >= applystartDate && itemDate <= applyendDate
    })
  }

  const {
    conditions,
    isLoading: isLoadingConditions,
    isFetching: isFechingConditions,
  } = useGetAssessmentConditions({
    id: selectedAssessment?.id,
    enabled: !!toggle,
  })

  let conditionsCheck =
    startDate && endDate ? filterData.conditions : conditions

  useEffect(() => {
    if (startDate && endDate) {
      const eventsFilter = filterDataBetweenDates(events, startDate, endDate)
      const assessmentsFilter = filterDataBetweenDates(
        assessments,
        startDate,
        endDate
      )
      const usersFilter = filterDataBetweenDates(users, startDate, endDate)
      const groupedProvidersByLocationFilter = filterDataBetweenDates(
        groupedProvidersByLocation,
        startDate,
        endDate
      )
      const reseliencyFilter = filterDataBetweenDates(
        reseliency,
        startDate,
        endDate
      )
      const conditionsFilter = filterDataBetweenDates(
        conditions,
        startDate,
        endDate
      )
      fetchAvailablilites(startDate, endDate).then((res) =>
        setFilterData((prev) => ({
          ...prev,
          totalScheduledAppointments: res,
        }))
      )

      return setFilterData((prev) => ({
        ...prev,
        users: usersFilter,
        events: eventsFilter,
        reseliency: reseliencyFilter,
        conditions: conditionsFilter,
        assessments: assessmentsFilter,
        groupedProvidersByLocation: groupedProvidersByLocationFilter,
      }))
    }
  }, [startDate, endDate, events, assessments])

  const {
    conditions: surveyConditions,
    isLoading: isLoadingSurveyConditions,
    isFetching: isFetchingSurveyConditions,
  } = useGetAssessmentConditions({
    id: selectedAssessment?.id,
    enabled: !toggle,
  })

  const onTabClick = (newValue) => {
    setToggle(!toggle)
    const clickedItem = assessmentOptions?.find(
      (item, index) => index === newValue
    )
    const assessment = assessmentCheck?.find(
      (item) => item.title === clickedItem
    )
    setSelectedAssessment(assessment)
  }

  return {
    tab,
    users: usersCheck,
    setTab,
    reseliency: reseliencyCheck,
    onTabClick,
    conditions: conditionsCheck,
    isLoadingUsers,
    isFetchingUsers,
    isLoadingEvents,
    surveyConditions,
    isFetchingEvents,
    assessmentOptions,
    events: eventCheck,
    isLoadingGeography,
    isLoadingConditions,
    isLoadingResources,
    isFechingResources,
    isFetchingGeography,
    isFechingConditions,
    isLoadingAssessments,
    isFetchingAssessments,
    isLoadingSurveyConditions,
    groupedProvidersByLocation: groupProviders,
    isFetchingSurveyConditions,
    totalScheduledAppointments:
      startDate && endDate
        ? filterData?.totalScheduledAppointments
        : totalScheduledAppointments,
  }
}
