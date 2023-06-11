import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";

const fetchInfo = async () => {
  let assessmentsData = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Assessments"));

    querySnapshot.forEach((document) => {
      let admin = {
        id: document.id,
        ...document.data(),
      };
      assessmentsData.push(admin);
    });

    return assessmentsData;
  } catch (error) {
    return error;
  }
};

export const useGetAssessments = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-assessments"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, assessments: data, isFetching };
};
