import React from 'react'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import { Controller } from 'react-hook-form'

//imports
import useAddAssessment from '../../../hooks/useAddAssessment'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as NotesIcon } from '../../../../../assets/icons/assesments.svg'

export default function AssessmentForm({ isEdit, data, setOpen }) {
  const {
    errors,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
    mutateDelete,
    isLoadingDelete,
  } = useAddAssessment({
    data,
    isEdit,
    setOpen,
  })
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="title"
            control={control}
            rules={{ required: { value: true, message: 'Name is required' } }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                EndIcon={NotesIcon}
                label="Assessment Name"
                placeholder="Enter Name"
                error={!!errors?.title}
                errorMessage={errors?.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="description"
            control={control}
            rules={{
              required: { value: true, message: 'Description is required' },
            }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                EndIcon={NotesIcon}
                error={!!errors?.description}
                label="Assessment Description"
                placeholder="Enter Description"
                errorMessage={errors?.description?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? 'Loading...' : 'Save assessment'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton
              variant="outlined"
              onClick={() => mutateDelete(data?.id)}
            >
              {isLoadingDelete ? 'Deleting...' : 'Delete assessment'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
