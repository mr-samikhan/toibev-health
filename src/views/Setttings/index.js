import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

//imports
import useSettings from './useSettings'
import { PASSWORD_INFO_TEXT } from '../../constants'
import CustomButton from '../../components/CustomButton'
import CustomTextfield from '../../components/CustomTextfield'
import { ReactComponent as SMSIcon } from '../../assets/icons/sms.svg'
import { ReactComponent as LockIcon } from '../../assets/icons/lock.svg'
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg'
import { ReactComponent as InfoIcon } from '../../assets/icons/info-circle.svg'
import {
  emailValidator,
  atleastOneIntegerandOneCharacter,
} from '../../utils/validators'

export default function Settings() {
  const { user, errors, control, onSubmit, isLoading, handleSubmit } =
    useSettings()

  return (
    <Grid
      container
      mt={8}
      py={5}
      pl={3}
      pr={1}
      sx={{
        background: '#FFFFFF',
        boxShadow: '0px 6px 20px rgba(36, 41, 41, 0.1)',
        borderRadius: '16px',
        width: '100%',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
      >
        <Grid container justifyContent="space-between" spacing={6}>
          <Grid item md={5}>
            <Controller
              rules={{
                required: { value: true, message: 'Full Name is Required' },
              }}
              name="fullname"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  {...field}
                  label="Full Name"
                  error={!!errors?.fullname}
                  placeholder="Enter full name"
                  startIconPrimary={<ProfileIcon />}
                  errorMessage={errors.fullname?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={5}>
            <Controller
              name="email"
              control={control}
              defaultValue={user?.email}
              rules={{
                required: { value: true, message: 'Email is required' },
                pattern: emailValidator(),
              }}
              render={({ field }) => (
                <CustomTextfield
                  {...field}
                  label="Email Address"
                  error={!!errors?.email}
                  startIconPrimary={<SMSIcon />}
                  placeholder="Enter email address"
                  errorMessage={errors?.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={5}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: { value: true, message: 'Password is required' },
                pattern: atleastOneIntegerandOneCharacter(),
              }}
              render={({ field }) => (
                <CustomTextfield
                  {...field}
                  type="password"
                  label="Create Password"
                  error={!!errors?.password}
                  placeholder="Enter password"
                  startIconPrimary={<LockIcon />}
                  errorMessage={errors?.password?.message}
                />
              )}
            />
          </Grid>
          <Grid item md={5} mb={9}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: {
                  value: true,
                  message: 'Confirm Password is required',
                },
                pattern: atleastOneIntegerandOneCharacter(),
              }}
              render={({ field }) => (
                <CustomTextfield
                  {...field}
                  type="password"
                  label="Confirm"
                  placeholder="Retype password"
                  startIconPrimary={<LockIcon />}
                  error={!!errors?.confirmPassword}
                  errorMessage={errors?.confirmPassword?.message}
                />
              )}
            />
            <Grid container flexWrap="nowrap" gap={1} mt={2}>
              <Grid item>
                <InfoIcon />
              </Grid>
              <Grid item flexGrow={1}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    lineHeight: '20px',
                    color: '#474747',
                  }}
                >
                  {PASSWORD_INFO_TEXT}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justifyContent={'center'}>
            <Grid item md={6}>
              <CustomButton variant="contained" type="submit">
                {isLoading ? 'Loading...' : 'Update'}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
