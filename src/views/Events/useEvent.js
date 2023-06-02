import React, { useState } from "react";
import { useGetEvents } from "../../hooks/useGetEvents";

export default function useEvent() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isFetching } = useGetEvents({});
  return {
    open,
    setOpen,
    data,
    isLoading,
    isFetching,
  };
}
