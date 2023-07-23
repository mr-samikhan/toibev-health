import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";

const fetchInfo = async () => {
  let data = [];
  try {
    const querySnapshot = await getDocs(
      collection(firestore, "MedicationsList")
    );

    querySnapshot.forEach((document) => {
      let medicine = {
        id: document.id,
        title: document.data().title,
        ...document.data(),
      };
      data.push(medicine);
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const useGetMedication = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-medication"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, data, isFetching };
};
