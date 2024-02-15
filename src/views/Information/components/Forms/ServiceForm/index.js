import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
//imports
import useServiceForm from '../../../hooks/useServiceForm'
import InputList from '../../../../../components/InputList'
import CustomButton from '../../../../../components/CustomButton'
import ImageUploader from '../../../../../components/MediaUpload'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as StartIcon } from '../../../../../assets/icons/ranking.svg'
import { ReactComponent as ServiceIcon } from '../../../../../assets/icons/heart-edit.svg'
import { ReactComponent as ClipboardIcon } from '../../../../../assets/icons/clipboard.svg'
import { ReactComponent as AchievementIcon } from '../../../../../assets/icons/achievement.svg'

export default function ServiceForm({
  isEdit,
  setOpen,
  clinics,
  initialState,
  services: services_,
}) {
  const {
    errors,
    control,
    onSubmit,
    isLoading,
    services,
    handleSubmit,
    setServices,
    mutateDelete,
    acheivements,
    checkKeyDown,
    clinicOptions,
    setAcheivements,
    selectedImageOne,
    isLoadingDelete,
    selectedImageTwo,
    setSelectedImageTwo,
    setSelectedImageOne,
  } = useServiceForm({
    initialState,
    isEdit,
    setOpen,
    clinics,
    services_,
  })

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={checkKeyDown}
    >
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Service name is required' }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Service Name"
                error={errors.title}
                EndIcon={ServiceIcon}
                placeholder="Enter service name"
                errorMessage={errors?.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="clinic"
            control={control}
            rules={{ required: 'Clinic is required' }}
            render={({ field }) => (
              <CustomTextfield
                select
                {...field}
                label="Select Clinic"
                options={clinicOptions}
                error={errors.clinic}
                placeholder="Select Clinic"
                errorMessage={errors?.clinic?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="who_we_are"
            control={control}
            rules={{ required: 'Bio is required' }}
            render={({ field }) => (
              <CustomTextfield
                rows={7}
                {...field}
                multiline={true}
                label="Who we are"
                EndIcon={ClipboardIcon}
                placeholder="Enter short bio"
                error={errors.who_we_are}
                errorMessage={errors?.who_we_are?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <InputList
            list={acheivements}
            Icon={AchievementIcon}
            setList={setAcheivements}
            label="Our Awards and Acheivements"
            placeholder={'Enter list of achievements (press enter after each)'}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <InputList
            Icon={StartIcon}
            list={services}
            label="What we offer"
            setList={setServices}
            placeholder="Enter list of services offered (press enter after each)"
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography variant="h6" mb={2}>
            Add Photos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ImageUploader
                fileType="image"
                selectedFile={selectedImageOne}
                setSelectedFile={setSelectedImageOne}
              />
            </Grid>
            <Grid item xs={6}>
              <ImageUploader
                fileType="image"
                selectedFile={selectedImageTwo}
                setSelectedFile={setSelectedImageTwo}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mb={2}>
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading' : isEdit ? 'Edit Service' : 'Add Service'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton
              variant="outlined"
              disabled={isLoadingDelete}
              onClick={() => mutateDelete(initialState?.id)}
            >
              {isLoadingDelete ? 'Loading' : 'Delete Service'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
