import React from "react";
import { Grid, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomButton from "../../../../components/CustomButton";
import CustomTextfield from "../../../../components/CustomTextfield";
import CustomRadioGroup from "../../../../components/RadioGroup";
import { ReactComponent as SMSIcon } from "../../../../assets/icons/sms.svg";
import useManageAdmin from "../../hooks/useManageAdmin";

export default function ManageAdminForm({ data }) {
  const { control, handleSubmit, onSubmit, radioOptions } = useManageAdmin({
    data,
  });
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3} mt={2}>
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
        <Grid item xs={12} mb={3}>
          <CustomButton variant="outlined">
            Send Password Reset URL
          </CustomButton>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="level"
            control={control}
            render={({ field }) => (
              <CustomRadioGroup
                title="Permission Level"
                options={radioOptions}
                field={field}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            Save
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
