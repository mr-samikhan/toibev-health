import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addAssessment, deleteAssessment, updateAssessment } from "../actions";

export default function useAddAssessment({ isEdit, data, setOpen }) {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? { ...data } : {},
  });

  const { isLoading, mutate } = useMutation(
    isEdit ? updateAssessment : addAssessment,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-assessments");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteAssessment,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-assessments");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    isEdit ? mutate({ ...data, id: data.id }) : mutate({ ...data });
  };
  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingDelete,
    mutateDelete,
  };
}
