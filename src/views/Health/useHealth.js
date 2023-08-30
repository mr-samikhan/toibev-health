import React, { useState } from "react";
import { useGetProviders } from "../../hooks/useGetProviders";
import { useGetGroupSessions } from "../../hooks/useGetGroupSessions";
import { useGetMedication } from "../../hooks/useGetMedication";
import { useGetTreatments } from "../../hooks/useGetTreatments";
import { useGetTreatmentOptions } from "../../hooks/useGetTreatmentOptions";
import { useBreakpints } from "../../common/helpers";

export const useHealth = () => {
  const [tab, setTab] = useState(0);
  const { mobileMode } = useBreakpints();
  const [openAddProvider, setOpenAddProvider] = useState(false);
  const [openGroupSessionForm, setOpenGroupSessionForm] = useState(false);
  const [openMedicationForm, setOpenMedicationForm] = useState(false);
  const [openTreatmentForm, setOpenTreatmentForm] = useState(false);
  const { providers, isLoading, isFetching } = useGetProviders({
    enabled: tab === 1,
  });
  const {
    isLoading: isLoadingGroupSessions,
    isFetching: isFetchingGroupSessions,
    data: groupSessions,
    error: groupSessionsError,
  } = useGetGroupSessions({ enabled: tab === 0 });

  const {
    isLoading: isLoadingMedication,
    isFetching: isFetchingMedication,
    data: medication,
    error: medicationError,
  } = useGetMedication({ enabled: tab === 0 });

  const {
    isLoading: isLoadingTreatment,
    isFetching: isFetchingTreatment,
    data: treatments,
    error: treatmentError,
  } = useGetTreatments({ enabled: tab === 0 });
  const {
    isLoading: isLoadingTreatmentOptions,
    isFetching: isFetchingTreatmentOptions,
    data: treatmentOptions,
    error: treatmentErrorOptions,
  } = useGetTreatmentOptions({ enabled: tab === 0 });

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
    openGroupSessionForm,
    openMedicationForm,
    openTreatmentForm,
    setOpenGroupSessionForm,
    setOpenMedicationForm,
    setOpenTreatmentForm,
    isLoadingGroupSessions,
    isLoadingMedication,
    isLoadingTreatment,
    isFetchingGroupSessions,
    isFetchingMedication,
    isFetchingTreatment,
    groupSessions,
    medication,
    treatments,
    treatmentOptions,
    isLoadingTreatmentOptions,
    isFetchingTreatmentOptions,
    mobileMode,
  };
};
