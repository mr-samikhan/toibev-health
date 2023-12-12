import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
//imports
import { updateDescription } from './actions'
import { useGetClinics } from '../../hooks/useGetClinics'
import { useGetServices } from '../../hooks/useGetServices'

export function useInformation() {
  const [open, setOpen] = useState(false)
  const [openClinicForm, setOpenClinicForm] = useState(false)

  const {
    services,
    isLoadingServices,
    isFetchingServices,
    description: desc,
  } = useGetServices({
    enabled: true,
  })

  const [description, setDescription] = useState()
  const { clinics, isLoadingClinics, isFetchingClinics, urls } = useGetClinics(
    {}
  )

  useEffect(() => {
    setDescription(desc)
  }, [desc])

  const { mutate } = useMutation(updateDescription, {
    onSuccess: (success) => {},
    onError: (error) => {
      console.log(error)
    },
  })

  const handleChange = (event) => {
    mutate({ description: event.target.value })
    setDescription(event.target.value)
  }

  return {
    urls,
    open,
    clinics,
    setOpen,
    services,
    description,
    handleChange,
    openClinicForm,
    isLoadingClinics,
    isLoadingServices,
    isFetchingClinics,
    isFetchingServices,
    setOpenClinicForm,
  }
}
