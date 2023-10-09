import React from 'react'
import { Controller } from 'react-hook-form'
import { Grid, Typography, Box } from '@mui/material'

import { PdfFile } from '../../PdfFile'
import MediaUpload from '../../../../../components/MediaUpload'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'
import useTreatmentResourceForm from '../../../hooks/useTreatmentResourceForm'

const StyledHeading = ({ children }) => (
  <Typography
    fontWeight={500}
    fontSize={18}
    sx={{
      color: '#000000',
    }}
  >
    {children}
  </Typography>
)

export default function TreatmentResourceForm({
  isEdit,
  data,
  setOpen,
  initialState,
}) {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    onDelete,
    isLoadingDelete,
  } = useTreatmentResourceForm({
    isEdit,
    data,
    setOpen,
    initialState,
  })
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Title"
                placeholder="Type in title"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} mb={4}>
          {false ? (
            <PdfFile />
          ) : (
            <CustomButton variant="outlined">
              Add History doc (pdf)
            </CustomButton>
          )}
        </Grid>
        <Grid xs={12} mb={4}>
          <StyledHeading>Add Photo/Illustration</StyledHeading>
          <MediaUpload />
        </Grid>

        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading
              ? 'Loading...'
              : isEdit
              ? 'Update Resource'
              : 'Save Resource'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12} mt={2}>
            <CustomButton variant="outlined" onClick={onDelete}>
              {isLoadingDelete ? 'Deleting' : 'Delete Resource'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
