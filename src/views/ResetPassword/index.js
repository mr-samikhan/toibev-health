import React from "react";
import { Grid, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import useResetPassword from "./useResetPassword";
import CustomTextfield from "../../components/CustomTextfield";
import CustomButton from "../../components/CustomButton";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import {
  emailValidator,
  atleastOneIntegerandOneCharacter,
} from "../../utils/validators";
import AlertDialog from "../../components/AlertDialog";

export default function ResetPassword() {
  const { control, handleSubmit, onSubmit, errors } = useResetPassword();
  return (
    <AlertDialog
      title="Reset Password"
      open={true}
      message={
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} mb={4}>
              <Controller
                name="password"
                rules={{
                  required: { value: true, message: "Password is required" },
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
                    message: "Confirm Password is required",
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
                {"Reset Password"}
              </CustomButton>
            </Grid>
          </Grid>
        </Box>
      }
    />
  );
}
