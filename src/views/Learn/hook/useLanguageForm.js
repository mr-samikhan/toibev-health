import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addLanguage, deleteLanguage, updateLanguage } from "../actions";

export default function useLanguageForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { title: initialState?.title },
  });
  const title = watch("title");
  const [openLanguageDetailForm, setOpenLanguageDetailForm] = useState(false);
  const [tribes, setTribes] = useState(["Tribes 1", "Tribe 2", "Tribe 3"]);
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.image || "",
  });
  const queryClient = useQueryClient();

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

  const onSubmit = () => {
    setOpenLanguageDetailForm(true);
  };

  const onSubmitLanguage = () => {
    const data = {
      title,
      tribes,
      description,
      cover_img: selectedImage,
    };
    isEdit ? mutate({ ...data, id: initialState.id }) : mutate(data);
  };

  const handleDeleteTribe = (index) => {
    console.log(index);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    handleDelete,
    isLoadingDelete,
    description,
    setDescription,
    selectedImage,
    setSelectedImage,
    onSubmitLanguage,
    openLanguageDetailForm,
    setOpenLanguageDetailForm,
    tribes,
    setTribes,
    handleDeleteTribe,
  };
}
