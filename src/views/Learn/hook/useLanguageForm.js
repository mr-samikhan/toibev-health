import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addLanguage, deleteLanguage, updateLanguage } from "../actions";
import { useGetCultures } from "../../../hooks/useGetCultures";

export default function useLanguageForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { ...initialState },
  });

  const [selectedTribes, setSelectedTribes] = useState([]);

  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.cover_img || "",
  });
  const queryClient = useQueryClient();
  const {
    cultures,
    isLoading: isLoadingCultures,
    isFetching: isFetchingCultures,
  } = useGetCultures({ enabled: true });

  const { isLoading, mutate } = useMutation(
    isEdit ? updateLanguage : addLanguage,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-languages");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteLanguage,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-languages");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = () => {
    mutateDelete(initialState.id);
  };

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      cover_img: selectedImage,
      tribes: selectedTribes,
    };
    isEdit ? mutate({ ...data, id: initialState.id }) : mutate(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    handleDelete,
    isLoadingDelete,
    selectedImage,
    setSelectedImage,
    isLoadingCultures,
    isFetchingCultures,
    cultures,
    selectedTribes,
    setSelectedTribes,
  };
}
