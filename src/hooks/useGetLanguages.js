import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async () => {
  let languageData = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Languages"));

    querySnapshot.forEach((doc) => {
      let language = {
        id: doc.id,
        ...doc.data(),
      };
      languageData.push(language);
    });

    return languageData;
  } catch (error) {
    return error;
  }
};

export const useGetLanguages = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-languages"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
  return { isLoading, error, languages: data, isFetching };
};
