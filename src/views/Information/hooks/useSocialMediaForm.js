import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { updateClinic, updateSocialLinks } from "../actions";

const useSocialMediaForm = ({ urls }) => {
  const queryClient = useQueryClient();
  const { facebook, linkedIn } = urls;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facebook,
      linkedIn,
    },
  });

  const { isLoading, mutate } = useMutation(updateSocialLinks, {
    onSuccess: (success) => {
      queryClient.invalidateQueries("get-all-clinics");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const body = {
      social_links: {
        facebook: data?.facebook,
        linkedIn: data?.linkedIn,
      },
    };
    mutate(body);
  };

  return {
    control,
    onSubmit,
    handleSubmit,
    errors,
    isLoading,
  };
};

export default useSocialMediaForm;
