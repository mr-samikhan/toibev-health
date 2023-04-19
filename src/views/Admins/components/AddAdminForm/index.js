import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../components/CustomTextfield";
import { ReactComponent as SMSIcon } from "../../../../assets/icons/sms.svg";
import { ReactComponent as LockIcon } from "../../../../assets/icons/lock.svg";
import { ReactComponent as InfoIcon } from "../../../../assets/icons/info-circle.svg";
import CustomButton from "../../../../components/CustomButton";
import CustomRadioGroup from "../../../../components/RadioGroup";
import useAddAdmin from "../../hooks/useAddAdmin";

export default function AddAdminForm() {
  const { control, handleSubmit, onSubmit, radioOptions } = useAddAdmin();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={4} mt={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Email Address"
                placeholder="Enter email address"
                endIconPrimary={<SMSIcon />}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={4}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Create Password"
                placeholder="Enter password"
                endIconPrimary={<LockIcon />}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Confirm"
                placeholder="Retype password"
                endIconPrimary={<LockIcon />}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Grid container flexWrap="nowrap" gap={1}>
            <Grid item>
              {" "}
              <InfoIcon />
            </Grid>
            <Grid item flexGrow={1}>
              {" "}
              <Typography
                sx={{ fontSize: "12px", lineHeight: "20px", color: "#474747" }}
              >
                Password must contain 8+ characters, 1 uppercase letter, 1
                lowercase lettter, 1 number, and 1 special symbol.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mb={4}>
          <Controller
            name="level"
            control={control}
            render={({ field }) => (
              <CustomRadioGroup
                title="Permission Level"
                options={radioOptions}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            Add User
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
