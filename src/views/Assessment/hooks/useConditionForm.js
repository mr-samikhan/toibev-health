import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { addQuestion, updateAssessment, updateQuestion } from "../actions";
import { useLocation } from "react-router-dom";

const correctPercentageOptions = [
  { label: "% Range", value: "range" },
  { label: "Under Certain %", value: "lesser" },
  { label: "Above Certain %", value: "greater" },
];

export default function useConditionForm({ isEdit, setOpen, initialState }) {
  const queryClient = useQueryClient();
  const { state: assessment } = useLocation();
  const { control, handleSubmit, watch } = useForm();
  const correctPercentage = watch("correctPercentage");

  const { isLoading, mutate } = useMutation(
    isEdit ? updateQuestion : addQuestion,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-assessment-questions");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    // const body = {
    //   data: { question: data.question},
    //   id: assessment?.id,
    // };

    // mutate(isEdit ? { ...body, questionId: initialState?.id } : body);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    correctPercentageOptions,
    correctPercentage,
  };
}
