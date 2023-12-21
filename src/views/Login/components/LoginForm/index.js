import React from 'react'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, Box } from '@mui/material'

//imports
import './style.scss'
import useLoginForm from '../../hooks/useLoginForm'
import CustomButton from '../../../../components/CustomButton'
import CustomTextfield from '../../../../components/CustomTextfield'
import {
  emailValidator,
  atleastOneIntegerandOneCharacter,
} from '../../../../utils/validators'

//images or icons
import { ReactComponent as LockIcon } from '../../../../assets/icons/lock.svg'
import { ReactComponent as MessageIcon } from '../../../../assets/icons/sms.svg'
import { useSelector } from 'react-redux'
import { ROUTES } from '../../../../constants/routes'

export default function LoginForm() {
  const navigate = useNavigate()

  const { control, onSubmit, handleSubmit, isLoading, isLoginError, errors } =
    useLoginForm({})

  const { isAuthenticated } = useSelector((state) => state.Auth)
  console.log(isAuthenticated, 'isAuthenticated')

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD)
    }
  }, [])

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container className="login-form">
        <Grid item className="title-banner">
          <Typography className="title">Welcome Back</Typography>
          <Typography className="subtitle">
            Please log in to access your admin account
          </Typography>
        </Grid>
        <Grid item className="wrapper" sx={wrapperStyle}>
          <Grid container flexDirection="column">
            <Grid item xs={12} mb={7}>
              <Typography color="error" textAlign="center">
                {isLoginError}
              </Typography>
            </Grid>
            <Grid item xs={12} mb={7}>
              <Controller
                name="email"
                control={control}
                rules={{
                  pattern: emailValidator(),
                  required: { value: true, message: 'Email is required' },
                }}
                render={({ field }) => (
                  <CustomTextfield
                    {...field}
                    label="Email"
                    EndIcon={MessageIcon}
                    error={!!errors?.email}
                    errorMessage={errors?.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Controller
                rules={{
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  pattern: atleastOneIntegerandOneCharacter(),
                }}
                name="password"
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    {...field}
                    type="password"
                    label="Password"
                    EndIcon={LockIcon}
                    error={!!errors?.password}
                    errorMessage={errors?.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} alignSelf="flex-end" mb={15}>
              <Typography
                className="link"
                onClick={() => navigate('/reset-password')}
              >
                Forgot Password?
              </Typography>
            </Grid>
            <Grid item xs={6} container alignSelf={'center'}>
              <CustomButton
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : ' Login'}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

const wrapperStyle = {
  m: { xs: '20px', md: '115px 100px 0px', sm: '115px 100px 0px' },
}
