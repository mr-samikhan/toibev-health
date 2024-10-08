import React from 'react'
import { Controller } from 'react-hook-form'
import { Grid, Typography, Box } from '@mui/material'

import useProviderForm from '../../../hooks/useProvidersForm'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'

export const ProviderForm = (props) => {
  const {
    onSubmit,
    handleSubmit,
    control,
    isLoading,
    isEdit,
    errors,
    clinics,
    isLoadingClinics,
  } = useProviderForm(props)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            rules={{
              required: {
                value: true,
                message: 'Provider Name is required',
              },
            }}
            name="name"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                error={errors?.name?.message}
                errorMessage={errors?.name?.message}
                label="Provider Name"
                placeholder="Enter Provider's Name"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            rules={{
              required: {
                value: true,
                message: 'Provider Position is required',
              },
            }}
            name="position"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Position"
                error={errors?.position?.message}
                errorMessage={errors?.position?.message}
                placeholder="Enter Provider's Position"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            rules={{
              required: {
                value: true,
                message: 'Clinic is required',
              },
            }}
            name="clinic"
            control={control}
            render={({ field }) =>
              isLoadingClinics ? (
                'Loading...'
              ) : (
                <CustomTextfield
                  {...field}
                  select
                  options={clinics}
                  label="Select Clinic"
                  error={errors?.clinic?.message}
                  placeholder="Select Clinic"
                  errorMessage={errors?.clinic?.message}
                />
              )
            }
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography
            fontWeight={500}
            sx={{ fontSize: '18px', fontFamily: 'DM Sans' }}
          >
            Social Media links
          </Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            // rules={{
            //   required: {
            //     value: true,
            //     message: 'Provider Facebook is required',
            //   },
            // }}
            name="socialLinks.facebook"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                // error={errors?.socialLinks?.facebook?.message}
                // errorMessage={errors?.socialLinks?.facebook?.message}
                {...field}
                label="Facebook"
                placeholder="Enter Facebook URL"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} mb={3}>
          <Controller
            name="socialLinks.linkedIn"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="LinkedIn"
                placeholder="Enter LinkedIn URL"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="socialLinks.twitter"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Twitter"
                placeholder="Enter Twitter URL"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="socialLinks.instagram"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Facebook"
                placeholder="Enter Instagram URL"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading
              ? 'Loading...'
              : isEdit
              ? 'Edit Provider'
              : 'Add Provider'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
