import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useMedicationForm({ isEdit, data }) {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    isEdit && reset({ ...data });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
  };
}
