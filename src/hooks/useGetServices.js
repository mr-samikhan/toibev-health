import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";

const fetchInfo = async () => {
  let servicesData = [];
  try {
    const services = collection(firestore, "Information", "services", "list");
    const infoRef = collection(firestore, "Information");
    const docRef = doc(infoRef, "services");
    const docSnap = await getDoc(docRef);

    const querySnapshot = await getDocs(services);
    querySnapshot.forEach((document) => {
      let service = {
        id: document.id,
        ...document.data(),
      };

      servicesData.push(service);
    });
    return { servicesData, description: docSnap.data().description };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useGetServices = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-services"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);
  return {
    isLoadingServices: isLoading,
    error,
    services: data?.servicesData ?? [],
    description: data?.description ?? "",
    isFetchingServices: isFetching,
  };
};
