import React from "react";
import { Grid, Typography, Box, Menu } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useTreatmentForm from "../../../hooks/useTreatmentForm";

export const TreatmentForm = (props) => {
  const { onSubmit, handleSubmit, control, isEdit, isLoading } =
    useTreatmentForm(props);
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Treatment Name"
                placeholder="Type in title..."
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading
              ? isEdit
                ? "Updating..."
                : "Saving..."
              : isEdit
              ? "Update Treatment"
              : "Add Treatment"}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
};
