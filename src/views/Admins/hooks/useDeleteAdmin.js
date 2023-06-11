import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { deleteAdmin } from "../actions";

export default function useDeleteAdmin({ data }) {
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();

  const { isLoading, mutate } = useMutation(deleteAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-admins");
    },
    onError: () => {},
  });

  const onSubmit = () => {
    mutate(data.id);
  };
  return { handleSubmit, onSubmit, isLoading };
}
