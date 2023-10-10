import React from 'react'
import { Grid, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
//imports
import useTreatmentForm from '../../../hooks/useTreatmentForm'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'

export const TreatmentForm = (props) => {
  const { onSubmit, handleSubmit, control, isEdit, isLoading, errors } =
    useTreatmentForm(props)
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
                error={errors?.title}
                label="Treatment Name"
                placeholder="Type in title..."
                errorMessage={errors?.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading
              ? isEdit
                ? 'Updating...'
                : 'Saving...'
              : isEdit
              ? 'Update Treatment'
              : 'Add Treatment'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
