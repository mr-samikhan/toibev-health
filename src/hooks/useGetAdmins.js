import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";

const fetchInfo = async () => {
  let adminsData = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Admins"));

    querySnapshot.forEach((document) => {
      let admin = {
        id: document.id,
        ...document.data(),
      };
      adminsData.push(admin);
    });

    return adminsData;
  } catch (error) {
    return error;
  }
};

export const useGetAdmins = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-admins"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, admins: data, isFetching };
};
