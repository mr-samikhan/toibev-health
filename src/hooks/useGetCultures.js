import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async () => {
  let cultureData = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Culture"));

    querySnapshot.forEach((doc) => {
      let culture = {
        id: doc.id,
        value: doc.id,
        label: doc.data().title,
        ...doc.data(),
      };
      cultureData.push(culture);
    });

    return cultureData;
  } catch (error) {
    return error;
  }
};

export const useGetCultures = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-cultures"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
  return { isLoading, error, cultures: data, isFetching };
};
