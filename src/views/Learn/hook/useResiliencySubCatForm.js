import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addResiliencySubCat, updateResiliencySubCat } from "../actions";

export default function useResiliencySubCatForm({
  isEdit,
  initialState,
  setOpen,
  cat,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { title: initialState?.title },
  });

  const [pdf, setPdf] = React.useState(
    {
      fileName: initialState?.pdf?.fileName,
      fileSize: initialState?.pdf?.fileSize,
    } ?? null
  );
  const [image, setImage] = React.useState({
    fileUrl: initialState?.cover_img || "",
  });
  const pdfInputRef = useRef(null);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    isEdit ? updateResiliencySubCat : addResiliencySubCat,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-reseliency");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    setPdf({
      file,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
      fileType: file.type,
      fileUrl,
    });
  };

  const handleFileUpload = () => {
    pdfInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setPdf(null);
  };

  const onSubmit = (formData) => {
    const data = {
      ...formData,
      pdf,
      image,
      cat: cat ?? initialState?.cat,
    };
    console.log(data);
    isEdit ? mutate({ ...data, id: initialState?.id }) : mutate(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    pdf,
    setPdf,
    handleFileChange,
    pdfInputRef,
    handleFileUpload,
    handleRemoveFile,
    image,
    setImage,
  };
}
