import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addProvider, updateProvider } from "../actions";
import { useMutation, useQueryClient } from "react-query";

const preselectedDays = [
  {
    year: 2023,
    month: 10,
    day: 2,
  },
  {
    year: 2023,
    month: 10,
    day: 15,
  },
  {
    year: 2023,
    month: 10,
    day: 30,
  },
];

export const useProviderAvailabilityForm = (props) => {
  const { isEdit, initialState, setOpen } = props;
  const { control, handleSubmit, reset } = useForm();
  const [selectedDays, setSelectedDays] = useState(preselectedDays);
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
    selectedDays,
    setSelectedDays,
    ...props,
  };
};
