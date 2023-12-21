import React from 'react'
import { Grid, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
//imports
import useMedicationForm from '../../../hooks/useMedicationForm'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'

export const MedicationForm = (props) => {
  const {
    errors,
    isEdit,
    control,
    onSubmit,
    onDelete,
    isLoading,
    handleSubmit,
    isLoadingDelete,
  } = useMedicationForm(props)
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            rules={{
              required: 'This field is required',
            }}
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                error={errors.title}
                label="Medication Name"
                errorMessage={errors?.title?.message}
                placeholder="Enter Medication Name"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Medication Url"
                placeholder="Enter URL to Medication Information"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading
              ? 'Loading...'
              : isEdit
              ? 'Update Medication'
              : 'Add Medication'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12} mt={3}>
            <CustomButton
              variant="outlined"
              onClick={onDelete}
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? 'Deleting...' : 'Delete Group Session'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
