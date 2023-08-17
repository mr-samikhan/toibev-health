import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async () => {
  let data = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Resiliency"));

    querySnapshot.forEach((doc) => {
      if (doc.id !== "general") return;
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

export const useGetReseliency = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-reseliency"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
  return { isLoading, error, reseliency: data, isFetching };
};
