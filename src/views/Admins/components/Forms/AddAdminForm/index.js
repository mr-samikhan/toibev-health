import React from 'react'
import { Controller } from 'react-hook-form'
import { Grid, Typography, Box } from '@mui/material'

//imports
import useAddAdmin from '../../../hooks/useAddAdmin'
import CustomButton from '../../../../../components/CustomButton'
import CustomRadioGroup from '../../../../../components/RadioGroup'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as SMSIcon } from '../../../../../assets/icons/sms.svg'
import { ReactComponent as LockIcon } from '../../../../../assets/icons/lock.svg'
import { ReactComponent as InfoIcon } from '../../../../../assets/icons/info-circle.svg'
import {
  emailValidator,
  atleastOneIntegerandOneCharacter,
} from '../../../../../utils/validators'

export default function AddAdminForm({ isEdit, data, setOpen, setShowAlert }) {
  const {
    control,
    errors,
    email,
    onSubmit,
    isLoading,
    handleSubmit,
    radioOptions,
    mutateResetPassword,
    isLoadingResetPassword,
  } = useAddAdmin({
    isEdit,
    data,
    setOpen,
    setShowAlert,
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={4} mt={2}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: 'Email is required' },
              pattern: emailValidator(),
            }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                EndIcon={SMSIcon}
                error={!!errors?.email}
                label="Email Address"
                placeholder="Enter email address"
                errorMessage={errors?.email?.message}
              />
            )}
          />
        </Grid>
        {!!isEdit && (
          <Grid item xs={12} mb={3}>
            <CustomButton
              variant="outlined"
              onClick={() => mutateResetPassword(email)}
            >
              {isLoadingResetPassword
                ? 'Sending...'
                : 'Send Password Reset URL'}
            </CustomButton>
          </Grid>
        )}
        {!isEdit && (
          <>
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
                    {...field}
                    type="password"
                    EndIcon={LockIcon}
                    label="Create Password"
                    error={!!errors?.password}
                    placeholder="Enter password"
                    errorMessage={errors?.password?.message}
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
                    {...field}
                    label="Confirm"
                    type="password"
                    EndIcon={LockIcon}
                    placeholder="Retype password"
                    error={!!errors?.confirmPassword}
                    errorMessage={errors?.confirmPassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={3}>
              <Grid container flexWrap="nowrap" gap={1}>
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
                    Password must contain 8+ characters, 1 uppercase letter, 1
                    lowercase lettter, 1 number, and 1 special symbol.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <Grid item xs={12} mb={4}>
          <Controller
            name="permissionLevel"
            control={control}
            rules={{ required: { value: true, message: 'Email is required' } }}
            render={({ field }) => (
              <CustomRadioGroup
                {...field}
                options={radioOptions}
                title="Permission Level"
                error={!!errors?.permissionLevel}
                errorMessage={errors?.permissionLevel?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isEdit ? 'SAVE' : 'Add User'}
            {isLoading && '...'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
