import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";
import MultipleAnswers from "../views/Assessment/components/MultipleAnswers";

const fetchInfo = async (id) => {
  let questions = [];
  try {
    const querySnapshot = await getDocs(
      collection(firestore, "Assessments", `${id}`, "questions")
    );
    let count = 0;
    querySnapshot.forEach((document) => {
      let question = {
        id: document.id,
        title: document.data().question,
        subtitle: <MultipleAnswers data={document.data().answers} />,
        text: ++count,
        ...document.data(),
      };
      questions.push(question);
    });

    return questions;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useGetAssessmentQuestions = ({ enabled = true, id }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-assessment-questions"],
    () => fetchInfo(id),
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, questions: data, isFetching };
};
