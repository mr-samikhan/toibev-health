import React, { useState } from "react";
import { useGetClinics } from "../../hooks/useGetClinics";
import { useGetServices } from "../../hooks/useGetServices";

export function useInformation() {
  const [open, setOpen] = useState(false);
  const [openClinicForm, setOpenClinicForm] = useState(false);
  const { services, isLoadingServices, isFetchingServices, description } =
    useGetServices({
      enabled: true,
    });
  const { clinics, isLoadingClinics, isFetchingClinics, urls } = useGetClinics(
    {}
  );

  return {
    urls,
    description,
    services,
    clinics,
    isLoadingServices,
    isFetchingServices,
    isLoadingClinics,
    isFetchingClinics,
    open,
    setOpen,
    openClinicForm,
    setOpenClinicForm,
  };
}
