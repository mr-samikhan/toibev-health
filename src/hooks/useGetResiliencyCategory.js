import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async (cat) => {
  let data = [];
  try {
    const querySnapshot = await getDocs(
      collection(firestore, "Resiliency", "general", cat)
    );

    querySnapshot.forEach((doc) => {
      let document = {
        id: doc.id,
        ...doc.data(),
      };
      data.push(document);
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const useGetResiliencyCategory = ({ cat, enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    [`get-reseliency-${cat}`],
    () => fetchInfo(cat),
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
  return { isLoading, error, data, isFetching };
};
