import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useMedicationForm({ isEdit, initialState }) {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(initialState);

  useEffect(() => {
    isEdit && reset({ ...initialState });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
  };
}
