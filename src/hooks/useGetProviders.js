import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";

const fetchInfo = async () => {
  let providersData = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Providers"));

    querySnapshot.forEach(async (document) => {
      let provider = {
        ...document.data(),
        id: document.id,
        subtitle: document.data().address,
        title: document.data().name,
      };

      providersData.push(provider);
    });

    return providersData;
  } catch (error) {
    return error;
  }
};

export const useGetProviders = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-providers"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, providers: data, isFetching };
};
