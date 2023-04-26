import React from "react";
import { Grid, Typography } from "@mui/material";
import CustomTextfield from "../../../../components/CustomTextfield";
import CustomButton from "../../../../components/CustomButton";
import { ReactComponent as MessageIcon } from "../../../../assets/icons/sms.svg";
import { ReactComponent as LockIcon } from "../../../../assets/icons/lock.svg";
import "./style.scss";

export default function LoginForm() {
  return (
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
            <CustomTextfield label="Email" endIconPrimary={<MessageIcon />} />
          </Grid>
          <Grid item xs={12} mb={2}>
            <CustomTextfield label="Password" endIconPrimary={<LockIcon />} />
          </Grid>
          <Grid item xs={12} alignSelf="flex-end" mb={15}>
            <Typography className="link">Forgot Password?</Typography>
          </Grid>
          <Grid item xs={6} container alignSelf={"center"}>
            <CustomButton variant="contained" type="submit">
              Login
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
