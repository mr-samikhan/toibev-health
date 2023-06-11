import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { addQuestion, updateAssessment, updateQuestion } from "../actions";
import { useLocation } from "react-router-dom";

export default function useQuestionForm({ isEdit, setOpen, initialState }) {
  console.log(initialState);
  const queryClient = useQueryClient();
  const { state: assessment } = useLocation();
  // const { singleAssessment: assessment } = useSingleAssessment({});
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...initialState } });
  const [answers, setAnswers] = useState(initialState?.answers ?? []);

  const handleAddAnswer = () => {
    setAnswers([
      ...answers,
      { id: ++answers.length, isCorrect: false, description: "" },
    ]);
  };

  const handleChangeAnswer = (idx, value) => {
    setAnswers(
      answers.map((answer, index) =>
        index === idx ? { ...answer, value, description: value } : { ...answer }
      )
    );
  };

  const handleRemove = (idx) => {
    let updatedAnswers = answers;
    updatedAnswers = updatedAnswers.filter((item, index) => index !== idx);
    setAnswers(updatedAnswers);
  };

  const handleCheck = (idx) => {
    let updatedAnswers = answers;
    updatedAnswers = updatedAnswers.map((item, index) =>
      index === idx
        ? { ...item, checked: !item.checked, isCorrect: !item.checked }
        : item
    );
    setAnswers(updatedAnswers);
  };

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
    const body = {
      data: { question: data.question, answers },
      id: assessment?.id,
    };

    mutate(isEdit ? { ...body, questionId: initialState?.id } : body);
  };

  return {
    control,
    answers,
    setAnswers,
    handleAddAnswer,
    handleCheck,
    handleRemove,
    handleChangeAnswer,
    handleSubmit,
    onSubmit,
    errors,
    initialState,
    isLoading,
  };
}
