import { useQuery } from "react-query";
import { firestore, collection, getDocs, getDoc, doc } from "../firebase";
import { parseAddress } from "parse-address";

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

  let groupedProvidersByLocation = {};

  if (!!data) {
    const groupedProviders = {};
    function extractCityAndState(address) {
      const { city, state } = parseAddress(
        "1005 N Gravenstein Highway Sebastopol CA 95472"
      );

      return { city, state };
    }
    data.forEach((provider) => {
      if (provider.address) {
        const { city, state } = extractCityAndState(provider.address);
        const key = `${city} ${state}`;
        if (!groupedProviders[key]) {
          groupedProviders[key] = { title: key, clicks: 0 };
        }
        groupedProviders[key].clicks += provider.clicks || 0;
        // groupedProviders[key].providers.push(provider);
      }
    });

    groupedProvidersByLocation = Object.values(groupedProviders);
  }

  return {
    isLoading,
    error,
    providers: data,
    isFetching,
    groupedProvidersByLocation,
  };
};
