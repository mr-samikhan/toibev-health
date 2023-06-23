import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { addCondition, updateCondition } from "../actions";
import { useLocation } from "react-router-dom";

const correctPercentageOptions = [
  { label: "% Range", value: "range" },
  { label: "Under Certain %", value: "lesser" },
  { label: "Above Certain %", value: "greater" },
];

const displayInfo = [
  { label: "Show Url", value: "Show Url" },
  { label: "Show Phone Number", value: "Show Phone Number" },
  { label: "Show Nothing", value: "Show Nothing" },
];

export default function useConditionForm({ isEdit, setOpen, initialState }) {
  const queryClient = useQueryClient();
  const { state: assessment } = useLocation();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      conditionType: "range",
      ...initialState,
    },
  });
  const conditionType = watch("conditionType");

  const { isLoading, mutate } = useMutation(
    isEdit ? updateCondition : addCondition,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-assessment-conditions");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    let body = {};
    if (conditionType === "range")
      body = {
        display: data?.display,
        conditionType: data?.conditionType,
        startRange: data?.startRange,
        endRange: data?.endRange,
        assessmentId: assessment?.id,
      };
    else if (conditionType === "lesser")
      body = {
        display: data?.display,
        conditionType: data?.conditionType,
        lesserThan: data?.lesserThan,
        assessmentId: assessment?.id,
      };
    else
      body = {
        display: data?.display,
        conditionType: data?.conditionType,
        greaterThan: data?.greaterThan,
        assessmentId: assessment?.id,
      };

    mutate(isEdit ? { ...body, conditionId: initialState?.id } : body);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    correctPercentageOptions,
    conditionType,
    isLoading,
    displayInfoOptions: displayInfo,
  };
}
