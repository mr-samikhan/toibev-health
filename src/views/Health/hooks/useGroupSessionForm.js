import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  addGroupSession,
  deleteGroupSession,
  updateGroupSession,
} from "../actions";
import { useMutation, useQueryClient } from "react-query";

export default function useGroupSessionForm({
  isEdit,
  data,
  setOpen,
  initialState,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { ...initialState },
  });
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    isEdit ? updateGroupSession : addGroupSession,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-group-sessions");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteGroupSession,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-group-sessions");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    const body = {
      title: data?.title,
      location: data?.location,
      description: data?.description,
    };
    isEdit ? mutate({ ...body, id: initialState.id }) : mutate(body);
  };

  const onDelete = () => {
    mutateDelete(initialState?.id);
  };

  useEffect(() => {
    isEdit && reset({ ...data });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
    isEdit,
    isLoading,
    onDelete,
    isLoadingDelete,
  };
}
