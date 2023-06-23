import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAssessmentQuestions } from "../../../hooks/useGetAssessmentQuestions";
import { useGetAssessmentConditions } from "../../../hooks/useGetAssessmentConditions";

export default function useSingleAssessment() {
  const [openQusetion, setOpenQuestion] = useState(false);
  const [openCondition, setOpenCondition] = useState(false);
  const { state } = useLocation();
  const { questions, isLoading, isFetching } = useGetAssessmentQuestions({
    id: state?.id,
  });
  const {
    conditions,
    isLoading: isLoadingConditions,
    isFetching: isFetchingConditions,
  } = useGetAssessmentConditions({ id: state?.id });

  return {
    questions,
    openQusetion,
    setOpenQuestion,
    openCondition,
    setOpenCondition,
    isLoading,
    isFetching,
    conditions,
    isLoadingConditions,
    isFetchingConditions,
  };
}
