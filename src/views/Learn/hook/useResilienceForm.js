import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addResiliency, deleteLanguage, updateLanguage } from "../actions";

export default function useResilienceForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { title: initialState?.title },
  });
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    isEdit ? updateLanguage : addResiliency,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-reseliency");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (formData) => {
    const data = {
      ...initialState,
      menu: [
        ...(initialState?.menu || []),
        {
          title: formData.title,
          value: formData.title?.split(" ").join("_").toLowerCase(),
        },
      ],
    };
    if (isEdit) {
      mutate({ ...data, id: initialState.id });
    } else {
      mutate(data);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
  };
}
