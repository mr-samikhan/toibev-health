import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  addMedicationsList,
  deleteMedicationsList,
  updateMedicationsList,
} from "../actions";

export default function useMedicationForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    isEdit ? updateMedicationsList : addMedicationsList,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-medication");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteMedicationsList,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-medication");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    const body = {
      title: data?.title,
      url: data?.url,
    };
    isEdit ? mutate({ ...body, id: initialState.id }) : mutate(body);
  };

  const onDelete = () => {
    mutateDelete(initialState?.id);
  };

  useEffect(() => {
    isEdit && reset({ ...initialState });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    onDelete,
    isEdit,
    isLoadingDelete,
  };
}
