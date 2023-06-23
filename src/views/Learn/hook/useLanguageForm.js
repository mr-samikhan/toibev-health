import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addLanguage, deleteLanguage, updateLanguage } from "../actions";

export default function useLanguageForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { title: initialState?.title },
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

  const onSubmit = (data) => {
    isEdit ? mutate({ ...data, id: initialState.id }) : mutate(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    handleDelete,
    isLoadingDelete,
  };
}
