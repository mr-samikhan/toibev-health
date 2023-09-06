import { useState, useEffect } from "react";
import { useGetEvents } from "../../hooks/useGetEvents";
import { useGetReseliency } from "../../hooks/useGetReseliency";
import { useGetAssessments } from "../../hooks/useGetAssessments";
import { useGetAssessmentConditions } from "../../hooks/useGetAssessmentConditions";
import { useGetProviders } from "../../hooks/useGetProviders";

export const useDashboard = () => {
  const [tab, setTab] = useState(0);
  const [toggle, setToggle] = useState(true);

  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetching: isFetchingEvents,
  } = useGetEvents({});

  const { reseliency } = useGetReseliency({});
  const { assessmentOptions, assessments, isLoading } = useGetAssessments({});
  const [selectedAssessment, setSelectedAssessment] = useState({});
  const { conditions, isLoading: isLoadingConditions } =
    useGetAssessmentConditions({
      id: selectedAssessment?.id,
      enabled: !toggle ?? !!toggle,
    });

  const onTabClick = (newValue) => {
    setToggle(!toggle);
    const clickedItem = assessmentOptions?.find(
      (item, index) => index === newValue
    );
    const assessment = assessments?.find((item) => item.title === clickedItem);
    setSelectedAssessment(assessment);
  };
  useEffect(() => {
    if (!isLoading) setSelectedAssessment(assessments[0]);
  }, []);
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
  };
};
