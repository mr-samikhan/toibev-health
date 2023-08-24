import React, { useEffect, useState } from "react";
import { useGetClinics } from "../../hooks/useGetClinics";
import { useGetServices } from "../../hooks/useGetServices";
import { useMutation, useQueryClient } from "react-query";
import { updateDescription } from "./actions";

export function useInformation() {
  const [open, setOpen] = useState(false);
  const [openClinicForm, setOpenClinicForm] = useState(false);

  const {
    services,
    isLoadingServices,
    isFetchingServices,
    description: desc,
  } = useGetServices({
    enabled: true,
  });

  const [description, setDescription] = useState();
  const { clinics, isLoadingClinics, isFetchingClinics, urls } = useGetClinics(
    {}
  );

  useEffect(() => {
    setDescription(desc);
  }, []);

  const { isLoading, mutate } = useMutation(updateDescription, {
    onSuccess: (success) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (event) => {
    setDescription(event.target.value);
    mutate({ description: event.target.value });
  };

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
    handleChange,
  };
}
