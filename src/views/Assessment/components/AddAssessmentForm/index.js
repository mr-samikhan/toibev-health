import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Controller } from "react-hook-form";
import CustomButton from "../../../../components/CustomButton";
import CustomTextfield from "../../../../components/CustomTextfield";
import useAddAssessment from "../../hooks/useAddAssessment";
import { ReactComponent as NotesIcon } from "../../../../assets/icons/assesments.svg";

export default function AddAssessmentForm({ isEdit, data }) {
  const { control, handleSubmit, onSubmit } = useAddAssessment({
    isEdit,
    data,
  });
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Assessment Name"
                placeholder="Enter Name"
                EndIconPrimary={<NotesIcon />}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <CustomButton variant="contained" type="submit">
            Save assessment
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton variant="outlined">Delete assessment</CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
