import { useState } from "react";
import { useGetCultures } from "../../hooks/useGetCultures";
import { useGetLanguages } from "../../hooks/useGetLanguages";
import { useGetReseliency } from "../../hooks/useGetReseliency";
import { useMutation, useQueryClient } from "react-query";
import { updateDescription } from "./actions";

export const useLearn = () => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    cultures,
    isLoading: isLoadingCultures,
    isFetching: isFetchingCultures,
  } = useGetCultures({ enabled: tab === 0 });

  const {
    languages,
    isLoading: isLoadingLanguages,
    isFetching: isFetchingLanguages,
  } = useGetLanguages({ enabled: tab === 1 });

  const {
    reseliency,
    isLoading: isLoadingReseliency,
    isFetching: isFetchingReseliency,
  } = useGetReseliency({ enabled: tab === 2 });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(updateDescription, {
    onSuccess: (success) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return {
    tab,
    setTab,
    open,
    setOpen,
    anchorEl,
    setAnchorEl,
    cultures,
    languages,
    handleClick,
    handleClose,
    isLoadingCultures,
    isFetchingCultures,
    isLoadingLanguages,
    isFetchingLanguages,
    reseliency,
    isLoadingReseliency,
    isFetchingReseliency,
    isLoading,
    mutate,
  };
};
