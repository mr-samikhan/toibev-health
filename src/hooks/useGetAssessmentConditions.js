import { useQuery } from 'react-query'
import { where } from 'firebase/firestore'
import { firestore, collection, getDocs, query } from '../firebase'

// const fetchInfo = async (id) => {
//   let conditions = []
//   try {
//     const querySnapshot = await getDocs(
//       collection(firestore, 'Assessments', `${id}`, 'conditions')
//     )

//     const getText = (item) =>
//       item.conditionType === 'range'
//         ? `${item.startRange} - ${item.endRange}%`
//         : item.conditionType === 'lesser'
//         ? `< ${item.lesserThan}%`
//         : `> ${item.greaterThan}%`

//     querySnapshot.forEach(async (document) => {
//       const querySnapshot2 = await getDocs(
//         query(
//           collection(firestore, 'AssessmentQueries'),
//           where('condition_id', '==', document.id)
//         )
//       )
//       console.log(querySnapshot2?.size, '>>>>>size')
//       let condition = {
//         id: document.id,
//         title: document.data().display,
//         text: getText(document.data()),
//         ...document.data(),
//       }
//       conditions.push(condition)
//     })
//     console.log(conditions, 'condtions')

//     return conditions
//   } catch (error) {
//     console.log(error)
//     return error
//   }
// }

const fetchInfo = async (id) => {
  let conditions = []
  try {
    const querySnapshot = await getDocs(
      collection(firestore, 'Assessments', `${id}`, 'conditions')
    )

    const getText = (item) =>
      item.conditionType === 'range'
        ? `${item.startRange} - ${item.endRange}%`
        : item.conditionType === 'lesser'
        ? `< ${item.lesserThan}%`
        : `> ${item.greaterThan}%`

    const queryPromises = querySnapshot.docs.map(async (document) => {
      const attemptAssesments = await getDocs(
        query(
          collection(firestore, 'AssessmentQueries'),
          where('condition_id', '==', document.id)
        )
      )
      return {
        id: document.id,
        title: document.data().display,
        text: getText(document.data()),
        ...document.data(),
        assessmentQueries: attemptAssesments.docs.map((doc) => doc.data())
          ?.length,
      }
    })

    conditions = await Promise.all(queryPromises)

    return conditions
  } catch (error) {
    console.log(error)
    return error
  }
}

export const useGetAssessmentConditions = ({ enabled = true, id }) => {
  const { data, isLoading, error, isFetching } = useQuery(
    ['get-assessment-conditions'],
    () => fetchInfo(id),
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  )

  return { isLoading, error, conditions: data, isFetching }
}
