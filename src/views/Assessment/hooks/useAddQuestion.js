import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function useAddQuestion() {
  const { control, handleSubmit } = useForm();
  const [answers, setAnswers] = useState([]);

  const handleAddAnswer = () => {
    setAnswers([...answers, { idx: 1 }]);
  };

  const handleChangeAnswer = (idx, value) => {
    setAnswers(
      answers.map((answer, index) =>
        index === idx ? { ...answer, value } : { ...answer }
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
      index === idx ? { ...item, checked: !item.checked } : item
    );
    setAnswers(updatedAnswers);
  };

  const onSubmit = (data) => {
    console.log(data, answers);
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
  };
}
