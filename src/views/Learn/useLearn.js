import { useState } from "react";
import { useGetCultures } from "../../hooks/useGetCultures";
import { useGetLanguages } from "../../hooks/useGetLanguages";

export const useLearn = () => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    cultures,
    isLoading: isLoadingCultures,
    isFetching: isFetchingCultures,
  } = useGetCultures({});

  const {
    languages,
    isLoading: isLoadingLanguages,
    isFetching: isFetchingLanguages,
  } = useGetLanguages({});

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
  };
};
