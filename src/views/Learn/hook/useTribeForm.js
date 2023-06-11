import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function useTribeForm({ isEdit, data }) {
  const { control, handleSubmit, reset } = useForm();
  const [openCultureForm, setOpenCultureForm] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setOpenCultureForm(true);
  };
  useEffect(() => {
    isEdit && reset({ ...data });
  }, isEdit);
  return {
    control,
    handleSubmit,
    onSubmit,
    openCultureForm,
    setOpenCultureForm,
  };
}
