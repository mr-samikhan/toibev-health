import React from 'react'
import { Grid, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
//imports
import useMedicationForm from '../../../hooks/useMedicationForm'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'

export const MedicationForm = (props) => {
  const {
    onSubmit,
    handleSubmit,
    control,
    isLoading,
    onDelete,
    isEdit,
    isLoadingDelete,
  } = useMedicationForm(props)
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Medication Name"
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
          <CustomButton variant="contained" type="submit">
            {isLoading ? 'Adding...' : 'Add Medication'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12} mt={3}>
            <CustomButton variant="outlined" onClick={onDelete}>
              {isLoadingDelete ? 'Deleting...' : 'Delete Group Session'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
