import { useQuery } from "react-query";
import { firestore, collection, getDocs, doc, getDoc } from "../firebase";

const fetchInfo = async () => {
  let clinicsData = [];
  try {
    const clinics = collection(firestore, "Information", "clinics", "list");
    const querySnapshot = await getDocs(clinics);
    const infoRef = collection(firestore, "Information");
    const docRef = doc(infoRef, "clinics");
    const docSnap = await getDoc(docRef);

    querySnapshot.forEach((document) => {
      let service = {
        id: document.id,
        ...document.data(),
      };

      clinicsData.push(service);
    });
    return { clinicsData, urls: docSnap.data().social_links };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const useGetClinics = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-clinics"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return {
    isLoadingClinics: isLoading,
    error,
    clinics: data?.clinicsData ?? [],
    urls: data?.urls ?? [],
    isFetchingClinics: isFetching,
  };
};
