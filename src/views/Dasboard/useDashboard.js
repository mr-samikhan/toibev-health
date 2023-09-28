import { useState } from 'react'
// import { useSelector } from 'react-redux'

import { useGetUsers } from '../../hooks/useGetUsers'
import { useGetEvents } from '../../hooks/useGetEvents'
import { useGetProviders } from '../../hooks/useGetProviders'
import { useGetReseliency } from '../../hooks/useGetReseliency'
import { useGetAssessments } from '../../hooks/useGetAssessments'
import { useGetAssessmentConditions } from '../../hooks/useGetAssessmentConditions'

export const useDashboard = () => {
  const [tab, setTab] = useState(0)
  const [toggle, setToggle] = useState(false)

  // const { startDate, endDate } = useSelector((state) => state?.Dashboard) ?? {}

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     return alert('date-found')
  //   }
  // }, [startDate, endDate])

  const {
    assessments,
    assessmentOptions,
    isLoading: isLoadingAssessments,
    isFetching: isFetchingAssessments,
  } = useGetAssessments({})

  const [selectedAssessment, setSelectedAssessment] = useState(
    assessments?.length ? assessments[0] : {}
  )

  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetching: isFetchingEvents,
  } = useGetEvents({})

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

  const {
    conditions,
    isLoading: isLoadingConditions,
    isFetching: isFechingConditions,
  } = useGetAssessmentConditions({
    id: selectedAssessment?.id,
    enabled: !!toggle,
  })

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
    const assessment = assessments?.find((item) => item.title === clickedItem)
    setSelectedAssessment(assessment)
  }

  return {
    tab,
    setTab,
    events,
    isLoadingEvents,
    isFetchingEvents,
    reseliency,
    assessmentOptions,
    onTabClick,
    conditions,
    isLoadingConditions,
    groupedProvidersByLocation,
    isLoadingGeography,
    surveyConditions,
    isLoadingSurveyConditions,
    users,
    isFechingConditions,
    isFetchingSurveyConditions,
    isLoadingUsers,
    isFetchingUsers,
    isFetchingGeography,
    isLoadingResources,
    isFechingResources,
    isLoadingAssessments,
    isFetchingAssessments,
    totalScheduledAppointments,
  }
}
