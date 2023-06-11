import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAssessmentQuestions } from "../../../hooks/useGetAssessmentQuestions";

export default function useSingleAssessment() {
  const [openQusetion, setOpenQuestion] = useState(false);
  const [openCondition, setOpenCondition] = useState(false);
  const { state } = useLocation();
  const { questions, isLoading, isFetching } = useGetAssessmentQuestions({
    id: state?.id,
  });

  return {
    questions,

    openQusetion,
    setOpenQuestion,
    openCondition,
    setOpenCondition,
    isLoading,
    isFetching,
  };
}
