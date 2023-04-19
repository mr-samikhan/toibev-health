import React from "react";
import { useForm } from "react-hook-form";

export default function useAddCondition() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return { control, handleSubmit, onSubmit };
}
