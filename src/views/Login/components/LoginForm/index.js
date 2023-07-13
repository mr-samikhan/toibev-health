import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../components/CustomTextfield";
import CustomButton from "../../../../components/CustomButton";
import { ReactComponent as MessageIcon } from "../../../../assets/icons/sms.svg";
import { ReactComponent as LockIcon } from "../../../../assets/icons/lock.svg";
import useLoginForm from "../../hooks/useLoginForm";

import "./style.scss";

export default function LoginForm() {
  const { control, onSubmit, handleSubmit, isLoading } = useLoginForm({});
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container className="login-form">
        <Grid item className="title-banner">
          <Typography className="title">Welcome Back</Typography>
          <Typography className="subtitle">
            Please log in to access your admin account
          </Typography>
        </Grid>
        <Grid item className="wrapper">
          <Grid container flexDirection="column">
            <Grid item xs={12} mb={7}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    label="Email"
                    EndIcon={MessageIcon}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    label="Password"
                    EndIcon={LockIcon}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} alignSelf="flex-end" mb={15}>
              <Typography className="link">Forgot Password?</Typography>
            </Grid>
            <Grid item xs={6} container alignSelf={"center"}>
              <CustomButton variant="contained" type="submit">
                {isLoading ? "Loading.." : " Login"}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
