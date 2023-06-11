import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Controller } from "react-hook-form";
import CustomButton from "../../../../../components/CustomButton";
import CustomTextfield from "../../../../../components/CustomTextfield";
import useAddAssessment from "../../../hooks/useAddAssessment";
import { ReactComponent as NotesIcon } from "../../../../../assets/icons/assesments.svg";

export default function AssessmentForm({ isEdit, data, setOpen }) {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingDelete,
    mutateDelete,
  } = useAddAssessment({
    isEdit,
    data,
    setOpen,
  });
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="title"
            control={control}
            rules={{ required: { value: true, message: "Name is required" } }}
            render={({ field }) => (
              <CustomTextfield
                error={!!errors?.title}
                errorMessage={errors?.title?.message}
                label="Assessment Name"
                placeholder="Enter Name"
                EndIcon={NotesIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? "Loading" : "Save assessment"}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton
              variant="outlined"
              onClick={() => mutateDelete(data?.id)}
            >
              {isLoadingDelete ? "Deleting..." : "Delete assessment"}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
