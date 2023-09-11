import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";

const fetchInfo = async () => {
  let users = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "users"));

    querySnapshot.forEach((document) => {
      let user = {
        id: document.id,
        ...document.data(),
      };
      users.push(user);
    });

    return users;
  } catch (error) {
    return error;
  }
};

export const useGetUsers = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-users"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, users: data, isFetching };
};
