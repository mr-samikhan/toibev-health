import React from 'react'
import { Grid, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

//imports
import useResetPassword from './useResetPassword'
import AlertDialog from '../../components/AlertDialog'
import CustomButton from '../../components/CustomButton'
import CustomTextfield from '../../components/CustomTextfield'
import { ReactComponent as LockIcon } from '../../assets/icons/lock.svg'
import // emailValidator,
// atleastOneIntegerandOneCharacter,
'../../utils/validators'

export default function ResetPassword() {
  const navigate = useNavigate()

  const { control, handleSubmit, onSubmit, errors } = useResetPassword()

  return (
    <AlertDialog
      onClose={() => navigate('/login')}
      title="Forgot Password"
      open={true}
      message={
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* forgot password UI */}
          <Grid container>
            <Grid item xs={12} mb={4}>
              <Controller
                name="email"
                rules={{
                  required: { value: true, message: 'Email is required' },
                }}
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    {...field}
                    EndIcon={LockIcon}
                    error={!!errors?.email}
                    label="Enter Email"
                    placeholder="Enter Email"
                    errorMessage={errors?.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton variant="contained" type="submit">
                Forgot Password
              </CustomButton>
            </Grid>
          </Grid>

          {/* Reset Password UI */}
          {/* <Grid container>
            <Grid item xs={12} mb={4}>
              <Controller
                name="password"
                rules={{
                  required: { value: true, message: 'Password is required' },
                  pattern: atleastOneIntegerandOneCharacter(),
                }}
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    error={!!errors?.password}
                    errorMessage={errors?.password?.message}
                    label="Create Password"
                    placeholder="Enter password"
                    EndIcon={LockIcon}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Controller
                name="confirmPassword"
                rules={{
                  required: {
                    value: true,
                    message: 'Confirm Password is required',
                  },
                  pattern: atleastOneIntegerandOneCharacter(),
                }}
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    error={!!errors?.confirmPassword}
                    errorMessage={errors?.confirmPassword?.message}
                    label="Confirm"
                    placeholder="Retype password"
                    EndIcon={LockIcon}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton variant="contained" type="submit">
                {'Reset Password'}
              </CustomButton>
            </Grid>
          </Grid> */}
        </Box>
      }
    />
  )
}
