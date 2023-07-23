import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async () => {
  let data = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "GroupSessions"));

    querySnapshot.forEach((document) => {
      let session = {
        id: document.id,
        title: document.data().title,
        ...document.data(),
      };
      data.push(session);
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const useGetGroupSessions = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-group-sessions"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, data, isFetching };
};
