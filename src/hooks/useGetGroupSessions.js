import { useQuery } from 'react-query'
import { orderBy } from 'firebase/firestore'
import { firestore, collection, getDocs, query } from '../firebase'

const fetchInfo = async () => {
  let data = []
  try {
    const q = query(
      collection(firestore, 'GroupSessions'),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((document) => {
      let session = {
        id: document.id,
        title: document.data().title,
        ...document.data(),
      }
      data.push(session)
    })

    return data
  } catch (error) {
    return error
  }
}

export const useGetGroupSessions = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ['get-all-group-sessions'],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  )

  return { isLoading, error, data, isFetching }
}
