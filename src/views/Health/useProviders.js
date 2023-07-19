import React, { useState } from "react";
import { useGetProviders } from "../../hooks/useGetProviders";

export const useProviders = () => {
  const [tab, setTab] = useState(0);
  const [openAddProvider, setOpenAddProvider] = useState(false);
  const { providers, isLoading, isFetching } = useGetProviders({});
  const handleClick = () => {
    return tab === 1 ? setOpenAddProvider(true) : "";
  };
  return {
    tab,
    setTab,
    providers,
    openAddProvider,
    setOpenAddProvider,
    handleClick,
    isLoadingProviders: isLoading,
    isFetchingProviders: isFetching,
  };
};
