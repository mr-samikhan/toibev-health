import { useMutation } from 'react-query'
import { firestore } from '../../firebase'
import { useEffect, useState } from 'react'
import { useBreakpints } from '../../common/helpers'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useGetProviders } from '../../hooks/useGetProviders'
import { useGetTreatments } from '../../hooks/useGetTreatments'
import { useGetMedication } from '../../hooks/useGetMedication'
import { useGetGroupSessions } from '../../hooks/useGetGroupSessions'
import { useGetTreatmentOptions } from '../../hooks/useGetTreatmentOptions'

export const useHealth = () => {
  const [tab, setTab] = useState(0)
  const { mobileMode } = useBreakpints()
  const [openAddProvider, setOpenAddProvider] = useState(false)
  const [openGroupSessionForm, setOpenGroupSessionForm] = useState(false)
  const [openMedicationForm, setOpenMedicationForm] = useState(false)
  const [openTreatmentForm, setOpenTreatmentForm] = useState(false)
  const [treatDescription, setTreatDescription] = useState('')
  const { providers, isLoading, isFetching } = useGetProviders({
    enabled: tab === 1,
  })
  const {
    isLoading: isLoadingGroupSessions,
    isFetching: isFetchingGroupSessions,
    data: groupSessions,
    error: groupSessionsError,
  } = useGetGroupSessions({ enabled: tab === 0 })

  const {
    isLoading: isLoadingMedication,
    isFetching: isFetchingMedication,
    data: medication,
    error: medicationError,
  } = useGetMedication({ enabled: tab === 0 })

  const {
    isLoading: isLoadingTreatment,
    isFetching: isFetchingTreatment,
    data: treatments,
    error: treatmentError,
  } = useGetTreatments({ enabled: tab === 0 })
  const {
    isLoading: isLoadingTreatmentOptions,
    isFetching: isFetchingTreatmentOptions,
    data: treatmentOptions,
    error: treatmentErrorOptions,
  } = useGetTreatmentOptions({ enabled: tab === 0 })

  const handleClick = () => {
    return tab === 1 ? setOpenAddProvider(true) : ''
  }

  const getTreatmentDescription = async () => {
    //get data from firestore document
    const docRef = doc(firestore, 'Treatment', 'general')
    const docSnap = await getDoc(docRef)
    setTreatDescription(docSnap.data().description)
  }

  useEffect(() => {
    getTreatmentDescription()
  }, [])

  const updateDescription = async (data) => {
    try {
      const docRef = await updateDoc(
        doc(firestore, 'Treatment', 'general'),
        data
      )
      setTreatDescription(data)
      return docRef
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      throw errorCode
    }
  }

  const { mutate } = useMutation(updateDescription, {
    onSuccess: (success) => {},
    onError: (error) => {
      console.log(error)
    },
  })

  const onDescripitonChange = (e) => {
    mutate({ description: e.target.value })
  }

  return {
    tab,
    setTab,
    providers,
    medication,
    treatments,
    mobileMode,
    handleClick,
    groupSessions,
    openAddProvider,
    openTreatmentForm,
    treatDescription,
    treatmentOptions,
    setOpenAddProvider,
    openMedicationForm,
    isLoadingTreatment,
    isLoadingMedication,
    openGroupSessionForm,
    onDescripitonChange,
    isFetchingTreatment,
    setOpenTreatmentForm,
    isFetchingMedication,
    setOpenMedicationForm,
    isLoadingGroupSessions,
    isFetchingGroupSessions,
    setOpenGroupSessionForm,
    isLoadingTreatmentOptions,
    isFetchingTreatmentOptions,
    isLoadingProviders: isLoading,
    isFetchingProviders: isFetching,
  }
}
