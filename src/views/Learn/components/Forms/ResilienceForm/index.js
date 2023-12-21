import React from 'react'
import { Grid, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomButton from '../../../../../components/CustomButton'
import useResilienceForm from '../../../hook/useResilienceForm'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as PeopleIcon } from '../../../../../assets/icons/people.svg'

export default function ResilienceForm({
  title,
  isEdit,
  setOpen,
  initialState,
  setOpenTitleModal,
}) {
  const {
    errors,
    control,
    onDelete,
    onSubmit,
    isLoading,
    handleSubmit,
    isDeleteLoading,
  } = useResilienceForm({
    title,
    isEdit,
    setOpen,
    initialState,
    setOpenTitleModal,
  })

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
            <CustomButton
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </CustomButton>
          </Grid>
          {isEdit && (
            <Grid item xs={12} mb={isEdit && 2}>
              <CustomButton
                variant="contained"
                onClick={onDelete}
                disabled={isDeleteLoading}
                sx={{
                  bgcolor: '#FF0000',
                }}
              >
                {isDeleteLoading ? 'Deleting...' : 'Delete'}
              </CustomButton>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  )
}
