import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addCulture, deleteCulture, updateCulture } from "../actions";

export default function useTribeForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { ...initialState },
  });
  const [openCultureForm, setOpenCultureForm] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    isEdit ? updateCulture : addCulture,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-cultures");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteCulture,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-cultures");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = () => {
    mutateDelete(initialState.id);
  };

  const onSubmit = (data) => {
    isEdit ? mutate({ ...data, id: initialState.id }) : mutate(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    openCultureForm,
    isLoading,
    handleDelete,
    isLoadingDelete,
  };
}
