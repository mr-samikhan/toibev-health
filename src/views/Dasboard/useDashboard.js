import React, { useState } from "react";
import { useGetEvents } from "../../hooks/useGetEvents";

export const useDashboard = () => {
  const [tab, setTab] = useState(0);
  const {
    data: events,
    isLoading: isLoadingEvents,
    isFetching: isFetchingEvents,
  } = useGetEvents({});
  return { tab, setTab, events, isLoadingEvents, isFetchingEvents };
};
