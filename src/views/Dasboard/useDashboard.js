import { useState } from "react";
import { useGetEvents } from "../../hooks/useGetEvents";
import { useGetReseliency } from "../../hooks/useGetReseliency";
import { useGetAssessments } from "../../hooks/useGetAssessments";

export const useDashboard = () => {
  const [tab, setTab] = useState(0);
  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetching: isFetchingEvents,
  } = useGetEvents({});

  const { reseliency } = useGetReseliency({});
  const { assessmentOptions } = useGetAssessments({});

  return {
    tab,
    setTab,
    events,
    isLoadingEvents,
    isFetchingEvents,
    reseliency,
    assessmentOptions,
  };
};
