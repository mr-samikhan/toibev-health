import React from "react";
import { useForm } from "react-hook-form";

export default function useAddAdmin() {
  const { control, handleSubmit } = useForm();
  const radioOptions = [
    { value: "administrator", label: "Administrator" },
    { value: "moderator", label: "Moderator" },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  return { control, handleSubmit, onSubmit, radioOptions };
}
