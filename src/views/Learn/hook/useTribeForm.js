import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useTribeForm({ isEdit, data }) {
  const { control, handleSubmit, reset } = useForm();
  const radioOptions = [
    { value: "administrator", label: "Administrator" },
    { value: "moderator", label: "Moderator" },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    isEdit && reset({ ...data });
  }, isEdit);
  return { control, handleSubmit, onSubmit, radioOptions };
}
