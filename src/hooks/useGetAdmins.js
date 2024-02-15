import { useQuery } from 'react-query'
import { orderBy } from 'firebase/firestore'
import { firestore, collection, getDocs, query } from '../firebase'

const fetchInfo = async () => {
  let adminsData = []
  try {
    const q = query(collection(firestore, 'Admins'), orderBy('username', 'asc'))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((document) => {
      let admin = {
        id: document.id,
        ...document.data(),
      }
      adminsData.push(admin)
    })

    return adminsData
  } catch (error) {
    return error
  }
}

export const useGetAdmins = ({ enabled = true }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ['get-all-admins'],
    fetchInfo,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  )

  console.log(data)

  return { isLoading, error, admins: data, isFetching }
}
