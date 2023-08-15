import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async (id) => {
  let data = [];
  try {
    const querySnapshot = await getDocs(
      collection(firestore, "Treatment", "general", "list", id, "options")
    );

    querySnapshot.forEach((document) => {
      let treatment = {
        id: document.id,
        ...document.data(),
      };
      data.push(treatment);
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const useGetTreatmentOptions = ({ enabled = true, id }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-treatment-options"],
    () => fetchInfo(id),
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, data, isFetching };
};
