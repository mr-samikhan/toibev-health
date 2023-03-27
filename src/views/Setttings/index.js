import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../components/CustomTextfield";
import CustomButton from "../../components/CustomButton";
import { ReactComponent as SMSIcon } from "../../assets/icons/sms.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-circle.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import useSettings from "./useSettings";

export default function Settings() {
  const { control, handleSubmit, onSubmit } = useSettings();
  return (
    <Grid
      container
      mt={8}
      py={5}
      pl={3}
      pr={1}
      sx={{
        background: "#FFFFFF",
        boxShadow: "0px 6px 20px rgba(36, 41, 41, 0.1)",
        borderRadius: "16px",
        width: "100%",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%" }}
      >
        <Grid container justifyContent="space-between" spacing={6}>
          {" "}
          <Grid item md={5}>
            {" "}
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  label="Full Name"
                  placeholder="Enter full name"
                  startIconPrimary={<ProfileIcon />}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item md={5}>
            {" "}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  label="Email Address"
                  placeholder="Enter email address"
                  startIconPrimary={<SMSIcon />}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item md={5}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  label="Create Password"
                  placeholder="Enter password"
                  startIconPrimary={<LockIcon />}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item md={5} mb={9}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  label="Confirm"
                  placeholder="Retype password"
                  startIconPrimary={<LockIcon />}
                  {...field}
                />
              )}
            />
            <Grid container flexWrap="nowrap" gap={1} mt={2}>
              <Grid item>
                {" "}
                <InfoIcon />
              </Grid>
              <Grid item flexGrow={1}>
                {" "}
                <Typography
                  sx={{
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#474747",
                  }}
                >
                  Password must contain 8+ characters, 1 uppercase letter, 1
                  lowercase lettter, 1 number, and 1 special symbol.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justifyContent={"center"}>
            <Grid item md={6}>
              <CustomButton variant="contained" type="submit">
                Update
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
