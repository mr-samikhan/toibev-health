import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { addService, deleteService, updateService } from "../actions";

export default function useServiceForm({
  initialState,
  isEdit,
  setOpen,
  clinics,
}) {
  const clinicOptions = clinics.map((clinic) => ({
    label: clinic?.title,
    value: clinic?.title,
  }));

  const queryClient = useQueryClient();
  const [selectedImageOne, setSelectedImageOne] = useState({
    fileUrl: initialState?.images[0] || "",
  });
  const [selectedImageTwo, setSelectedImageTwo] = useState({
    fileUrl: initialState?.images[1] || "",
  });
  const [acheivements, setAcheivements] = useState(
    initialState?.acheivements ?? []
  );

  const [services, setServices] = useState(initialState?.services ?? []);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { ...initialState } });

  const { isLoading, mutate } = useMutation(
    isEdit ? updateService : addService,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-services");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteService,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-services");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    const body = {
      ...data,
      images: [selectedImageOne, selectedImageTwo],
      acheivements,
      services,
    };

    mutate(isEdit ? { ...body, id: initialState?.id } : body);
  };

  return {
    errors,
    control,
    handleSubmit,
    onSubmit,
    setSelectedImageOne,
    setSelectedImageTwo,
    selectedImageOne,
    selectedImageTwo,
    acheivements,
    setAcheivements,
    services,
    setServices,
    isLoading,
    mutateDelete,
    isLoadingDelete,
    clinicOptions,
  };
}
