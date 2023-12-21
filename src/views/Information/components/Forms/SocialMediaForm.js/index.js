import React from 'react'
import { Grid, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomButton from '../../../../../components/CustomButton'
import useSocialMediaForm from '../../../hooks/useSocialMediaForm'
import CustomTextfield from '../../../../../components/CustomTextfield'

const SocialMediaForm = ({ urls }) => {
  const { control, onSubmit, handleSubmit, errors, isLoading } =
    useSocialMediaForm({
      urls,
    })
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ minHeight: '360px' }}
    >
      <Grid
        container
        flexDirection="column"
        px={2}
        flexGrow={1}
        sx={{ minHeight: '360px' }}
      >
        <Grid item mb={4}>
          <Controller
            control={control}
            name="facebook"
            rules={{ required: 'Facebook url is required' }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Facebook URL"
                error={errors?.facebook}
                placeholder="Facebook URL"
                errorMessage={errors?.facebook?.message}
              />
            )}
          />
        </Grid>
        <Grid item mb={4}>
          <Controller
            control={control}
            name="linkedIn"
            rules={{ required: 'LinkedIn url is required' }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="LinkedIn URL"
                error={errors?.linkedIn}
                placeholder="LinkedIn URL"
                errorMessage={errors?.linkedIn?.message}
              />
            )}
          />
        </Grid>
        <Grid item container flexGrow={1}>
          <Grid item xs={12} alignSelf="flex-end">
            <CustomButton
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'SAVE'}
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SocialMediaForm
