import { useQuery } from 'react-query'
import { parseAddress } from 'parse-address'
import { firestore, collection, getDocs } from '../firebase'

const fetchInfo = async () => {
  let providersData = []
  try {
    const querySnapshot = await getDocs(collection(firestore, 'Providers'))

    querySnapshot.forEach(async (document) => {
      let provider = {
        ...document.data(),
        id: document.id,
        title: document.data().name,
        subtitle: document.data().address,
        createdAt: document.data().createdAt,
      }

      providersData.push(provider)
    })

    return providersData
  } catch (error) {
    return error
  }
}

export const useGetProviders = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ['get-all-providers'],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  )

  let groupedProvidersByLocation = {}

  if (!!data) {
    const groupedProviders = {}
    // function extractCityAndState(address) {
    //   const { city, state } = parseAddress(
    //     '1005 N Gravenstein Highway Sebastopol CA 95472'
    //   )

    //   return { city, state }
    // }
    data.forEach((provider) => {
      if (provider.address) {
        const parsedAddress = parseAddress(provider.address)

        if (parsedAddress && parsedAddress.city && parsedAddress.state) {
          const { city, state } = parsedAddress
          const key = `${city} ${state}`

          if (!groupedProviders[key]) {
            groupedProviders[key] = {
              title: key,
              clicks: 0,
              createdAt: provider.createdAt,
            }
          }

          groupedProviders[key].clicks += provider.clicks || 0
        }
      }
      // if (provider.address) {
      //   const { city, state } = parseAddress(provider.address)
      //   const key = `${city} ${state}`
      //   if (!groupedProviders[key]) {
      //     groupedProviders[key] = {
      //       title: key,
      //       clicks: 0,
      //       createdAt: provider.createdAt,
      //     }
      //   }
      //   groupedProviders[key].clicks += provider.clicks || 0
      //   // groupedProviders[key].providers.push(provider);
      // }
    })

    groupedProvidersByLocation = Object.values(groupedProviders)
    // console.log(groupedProvidersByLocation, 'groupedProvidersByLocation')
  }

  const totalScheduledAppointments = data?.reduce((accumulator, user) => {
    if (Array.isArray(user?.availabilities)) {
      const lengthOfScheduledItems = user?.availabilities?.filter(
        (item) => item?.isScheduled === true
      )?.length
      return accumulator + lengthOfScheduledItems
    } else {
      return accumulator
    }
  }, 0)

  return {
    error,
    isLoading,
    isFetching,
    providers: data,
    groupedProvidersByLocation,
    totalScheduledAppointments,
  }
}
