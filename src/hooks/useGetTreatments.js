import { useQuery } from 'react-query'
import { firestore, collection, getDocs } from '../firebase'

const fetchInfo = async () => {
  let data = []
  try {
    const querySnapshot = await getDocs(
      collection(firestore, 'Treatment', 'general', 'list')
    )

    querySnapshot.forEach((document) => {
      let treatment = {
        id: document.id,
        title: document.data().title,
        ...document.data(),
      }
      data.push(treatment)
    })

    return data
  } catch (error) {
    return error
  }
}

export const useGetTreatments = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ['get-all-treatments'],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  )

  return { isLoading, error, data, isFetching }
}
