import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addAdmin, updateAdmin } from "../actions";

const radioOptions = [
  { value: "administrator", label: "Administrator" },
  { value: "moderator", label: "Moderator" },
];

export default function useAddAdmin({ isEdit, data, setOpen }) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: data?.email,
      permissionLevel: data?.permissionLevel?.value ?? "administrator",
      ...data,
    },
  });

  const { isLoading, mutate } = useMutation(isEdit ? updateAdmin : addAdmin, {
    onSuccess: (success) => {
      setOpen(false);
      queryClient.invalidateQueries("get-all-admins");
    },
    onError: (error) => {
      if (error === "auth/email-already-in-use") {
        setError("email", { message: "Email already in use" });
      }
    },
  });

  const onSubmit = (data) => {
    const passwordsMatch = data.password === data.confirmPassword;
    if (!passwordsMatch) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    isEdit ? mutate({ ...data, id: data.id }) : mutate({ ...data });
  };

  return { control, handleSubmit, onSubmit, radioOptions, isLoading, errors };
}
