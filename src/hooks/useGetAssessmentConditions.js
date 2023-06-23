import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";
import MultipleAnswers from "../views/Assessment/components/MultipleAnswers";

const fetchInfo = async (id) => {
  let conditions = [];
  try {
    const querySnapshot = await getDocs(
      collection(firestore, "Assessments", `${id}`, "conditions")
    );

    const getText = (item) =>
      item.conditionType === "range"
        ? `${item.startRange} - ${item.endRange}%`
        : item.conditionType === "lesser"
        ? `< ${item.lesserThan}%`
        : `> ${item.greaterThan}%`;

    querySnapshot.forEach((document) => {
      let condition = {
        id: document.id,
        title: document.data().display,
        text: getText(document.data()),
        ...document.data(),
      };
      conditions.push(condition);
    });

    return conditions;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useGetAssessmentConditions = ({ enabled = true, id }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-assessment-conditions"],
    () => fetchInfo(id),
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, conditions: data, isFetching };
};
