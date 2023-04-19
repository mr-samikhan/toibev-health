import React from "react";
import { Box, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../components/CustomTextfield";
import useAddCondition from "../../hooks/useAddCondition";

export default function AddConditionForm() {
  const { control, handleSubmit, onSubmit } = useAddCondition();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <Controller
            name="correctPercentage"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Correct %"
                placeholder="% Range"
                select
                defaultValue="range"
                options={[{ label: "% Range", value: "range" }]}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          {" "}
          <Controller
            name="display"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Display"
                placeholder="Select Info to be display"
                select
                options={[]}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
