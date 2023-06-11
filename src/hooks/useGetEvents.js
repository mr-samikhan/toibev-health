import { useQuery } from "react-query";
import { firestore, collection, getDocs } from "../firebase";
import { EventDetails } from "../views/Events/components/EventDetails";

const fetchInfo = async () => {
  let data = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "Events"));

    querySnapshot.forEach((document) => {
      let admin = {
        id: document.id,
        title: document.data().title,
        subtitle: <EventDetails data={document.data()} />,
        icon: document.data().image,
        ...document.data(),
      };
      data.push(admin);
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const useGetEvents = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ["get-all-events"],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, data, isFetching };
};
