import React from 'react'
import { Grid, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as PeopleIcon } from '../../../../../assets/icons/people.svg'
import CustomButton from '../../../../../components/CustomButton'
import useResilienceForm from '../../../hook/useResilienceForm'

export default function ResilienceForm({
  isEdit,
  initialState,
  setOpen,
  title,
}) {
  const { control, handleSubmit, onSubmit, isLoading, errors } =
    useResilienceForm({
      isEdit,
      initialState,
      setOpen,
      title,
    })
  console.log(isEdit, '>>>>')

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} mb={4} mt={2}>
            <Controller
              rules={{
                required: 'This field is required',
              }}
              name="title"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  {...field}
                  EndIcon={PeopleIcon}
                  label="Resiliency Name"
                  placeholder="Type in title"
                  error={errors?.title?.message}
                  errorMessage={errors?.title?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} mb={isEdit && 2}>
            <CustomButton variant="contained" type="submit">
              {isLoading ? 'Saving...' : 'Save'}
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
