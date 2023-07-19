import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addProvider, updateProvider } from "../actions";
import { useMutation, useQueryClient } from "react-query";

export default function useProviderForm(props) {
  const { isEdit, initialState, setOpen } = props;
  const { control, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    isEdit ? updateProvider : addProvider,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-providers");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    const body = {
      name: data?.name,
      position: data?.position,
      address: data?.address,
      socialLinks: data?.socialLinks,
    };
    isEdit ? mutate({ ...body, id: initialState.id }) : mutate(body);
  };

  useEffect(() => {
    isEdit && reset({ ...initialState });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    ...props,
  };
}
