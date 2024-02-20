import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addProvider, updateProvider } from '../actions'
import { useMutation, useQueryClient } from 'react-query'
import { useGetClinics } from '../../../hooks/useGetClinics'
import { useDispatch } from 'react-redux'
import { setAlertValues } from '../../../redux/actions/loginActions'
import { getErrorMessage } from '../../Login/utils'

export default function useProviderForm(props) {
  const { isEdit, initialState, setOpen, providers } = props
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialState,
      clinic: isEdit ? initialState?.clinicId : '',
    },
  })

  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  //success
  const onSuccess = ({ isDelete }) => {
    dispatch(
      setAlertValues({
        type: 'success',
        message: isDelete
          ? 'Treatment deleted successfully'
          : isEdit
          ? 'Treatment updated successfully'
          : 'Treatment added successfully',
        isOpen: true,
      })
    )

    setOpen(false)
    queryClient.invalidateQueries('get-all-providers')
  }

  //error
  const onError = (error) => {
    const err = getErrorMessage(error)
    dispatch(
      setAlertValues({
        type: 'error',
        isOpen: true,
        message: err || 'Something went wrong!',
      })
    )
  }

  const { isLoading, mutate } = useMutation(
    isEdit ? updateProvider : addProvider,
    {
      onSuccess: (success) => {
        onSuccess({ isDelete: false })
      },
      onError: (error) => {
        console.log(error)
        onError(error)
      },
    }
  )

  let { clinics, isLoadingClinics } = useGetClinics({})

  clinics = clinics?.map((record) => {
    return {
      label: record.title,
      value: record.id,
    }
  })

  const onSubmit = (data) => {
    const body = {
      name: data?.name,
      clinicId: data?.clinic,
      position: data?.position,
      socialLinks: {
        facebook: data?.socialLinks?.facebook || '',
        twitter: data?.socialLinks?.twitter || '',
        linkedin: data?.socialLinks?.linkedin || '',
        instagram: data?.socialLinks?.instagram || '',
      },
    }
    isEdit
      ? mutate({
          data: { ...body, id: initialState.id, updatedAt: new Date() },
          providers,
          newTitle: data?.name === initialState?.name ? null : data?.name,
        })
      : mutate({ data: { ...body, createdAt: new Date() }, providers })
  }

  useEffect(() => {
    isEdit && reset({ ...initialState })
  }, isEdit)

  return {
    errors,
    control,
    clinics,
    onSubmit,
    isLoading,
    handleSubmit,
    isLoadingClinics,
    ...props,
  }
}
