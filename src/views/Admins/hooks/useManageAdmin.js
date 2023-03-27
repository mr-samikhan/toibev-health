import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function useManageAdmin({ data }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: data.email, level: data.level.value },
  });
  const radioOptions = [
    { value: "administrator", label: "Administrator" },
    { value: "moderator", label: "Moderator" },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  return { control, handleSubmit, onSubmit, radioOptions };
}
