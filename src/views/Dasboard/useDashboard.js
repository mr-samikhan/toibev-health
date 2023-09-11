import { useState, useEffect } from "react";
import { useGetEvents } from "../../hooks/useGetEvents";
import { useGetReseliency } from "../../hooks/useGetReseliency";
import { useGetAssessments } from "../../hooks/useGetAssessments";
import { useGetAssessmentConditions } from "../../hooks/useGetAssessmentConditions";
import { useGetProviders } from "../../hooks/useGetProviders";
import { useGetUsers } from "../../hooks/useGetUsers";

export const useDashboard = () => {
  const [tab, setTab] = useState(0);
  const [toggle, setToggle] = useState(false);

  const {
    assessmentOptions,
    assessments,
    isLoading: isLoadingAssessments,
    isFetching: isFetchingAssessments,
  } = useGetAssessments({});

  const [selectedAssessment, setSelectedAssessment] = useState(
    assessments?.length ? assessments[0] : {}
  );

  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetching: isFetchingEvents,
  } = useGetEvents({});

  const {
    users,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useGetUsers({});

  const {
    groupedProvidersByLocation,
    isLoading: isLoadingGeography,
    isFetching: isFetchingGeography,
  } = useGetProviders({});

  const {
    reseliency,
    isLoading: isLoadingResources,
    isFetching: isFechingResources,
  } = useGetReseliency({});

  const {
    conditions,
    isLoading: isLoadingConditions,
    isFetching: isFechingConditions,
  } = useGetAssessmentConditions({
    id: selectedAssessment?.id,
    enabled: !!toggle,
  });

  const {
    conditions: surveyConditions,
    isLoading: isLoadingSurveyConditions,
    isFetching: isFetchingSurveyConditions,
  } = useGetAssessmentConditions({
    id: selectedAssessment?.id,
    enabled: !toggle,
  });

  const onTabClick = (newValue) => {
    setToggle(!toggle);
    const clickedItem = assessmentOptions?.find(
      (item, index) => index === newValue
    );
    const assessment = assessments?.find((item) => item.title === clickedItem);
    setSelectedAssessment(assessment);
  };

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
  };
};
