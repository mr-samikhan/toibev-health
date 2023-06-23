import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { addClinic, deleteClinic, updateClinic } from "../actions";

export default function useClinicForm({ initialState, isEdit, setOpen }) {
  const queryClient = useQueryClient();
  const [selectedImageOne, setSelectedImageOne] = useState({
    fileUrl: initialState?.images[0] || "",
  });
  const [selectedImageTwo, setSelectedImageTwo] = useState({
    fileUrl: initialState?.images[1] || "",
  });
  const [departments, setDepartments] = useState(
    initialState?.departments ?? [{ name: "", phone1: "", phone2: "" }]
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { ...initialState } });

  const { isLoading, mutate } = useMutation(isEdit ? updateClinic : addClinic, {
    onSuccess: (success) => {
      setOpen(false);
      queryClient.invalidateQueries("get-all-clinics");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteClinic,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-clinics");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const addDepartment = () => {
    setDepartments([...departments, { name: "", phone1: "", phone2: "" }]);
  };

  const handleChange = (e, index, name) => {
    const values = [...departments];
    values[index][name] = e.target.value;
    setDepartments(values);
  };

  const onSubmit = (data) => {
    const body = {
      ...data,
      images: [selectedImageOne, selectedImageTwo],
      departments,
    };

    mutate(isEdit ? { ...body, id: initialState?.id } : body);
  };

  return {
    errors,
    control,
    handleSubmit,
    onSubmit,
    setSelectedImageOne,
    setSelectedImageTwo,
    selectedImageOne,
    selectedImageTwo,
    departments,
    setDepartments,
    addDepartment,
    handleChange,
    isLoading,
    mutateDelete,
    isLoadingDelete,
  };
}
