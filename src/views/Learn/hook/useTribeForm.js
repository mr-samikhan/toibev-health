import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addCulture, deleteCulture, updateCulture } from "../actions";

export default function useTribeForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { ...initialState },
  });
  const title = watch("title");
  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.cover_img || "",
  });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    isEdit ? (data) => updateCulture({ ...data, title }) : addCulture,
    {
      onSuccess: (success) => {
        setOpen(false);

        queryClient.invalidateQueries("get-all-cultures");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteCulture,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-cultures");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = () => {
    mutateDelete(initialState.id);
  };

  const onDelete = () => {
    handleDelete();
  };

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      cover_img: selectedImage,
    };

    isEdit ? mutate({ ...data, id: initialState.id }) : mutate(data);
  };

  return {
    control,
    handleSubmit,
    isLoading,
    handleDelete,
    isLoadingDelete,
    selectedImage,
    setSelectedImage,
    onSubmit,
    onDelete,
  };
}
