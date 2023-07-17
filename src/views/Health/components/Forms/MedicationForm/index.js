import React from "react";
import { Grid, Typography, Box, Menu } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useMedicationForm from "../../../hooks/useMedicationForm";

export const MedicationForm = (props) => {
  const { onSubmit, handleSubmit, control } = useMedicationForm({});
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="medicationName"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Medication Name"
                placeholder="Enter Medication Name"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="medicationUrl"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Medication Url"
                placeholder="Enter URL to Medication Information"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            Add Medication
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
};
