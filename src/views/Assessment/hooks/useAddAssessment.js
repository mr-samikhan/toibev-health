import React from "react";
import { useForm } from "react-hook-form";

export default function useAddAssessment({ isEdit, data }) {
  const { control, handleSubmit } = useForm({
    defaultValues: isEdit ? { name: data?.title } : {},
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return { control, handleSubmit, onSubmit };
}
