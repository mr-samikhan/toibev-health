import React from "react";
import { Grid, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import { ReactComponent as PeopleIcon } from "../../../../../assets/icons/people.svg";
import CustomButton from "../../../../../components/CustomButton";
import useResilienceForm from "../../../hook/useResilienceForm";

export default function ResilienceForm({ isEdit, initialState, setOpen }) {
  const { control, handleSubmit, onSubmit, isLoading } = useResilienceForm({
    isEdit,
    initialState,
    setOpen,
  });

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} mb={4} mt={2}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  label="Resiliency Name"
                  placeholder="Type in title"
                  EndIcon={PeopleIcon}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} mb={isEdit && 2}>
            <CustomButton variant="contained" type="submit">
              {isLoading ? "Saving..." : "Save"}
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
