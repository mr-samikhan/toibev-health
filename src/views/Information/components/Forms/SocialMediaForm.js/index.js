import React from "react";
import { Grid, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useSocialMediaForm from "../../../hooks/useSocialMediaForm";

const SocialMediaForm = ({ urls }) => {
  const { control, onSubmit, handleSubmit, errors, isLoading } =
    useSocialMediaForm({
      urls,
    });
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container flexDirection="column" px={2} flexGrow={1}>
        <Grid item mb={4}>
          <Controller
            control={control}
            name="facebook"
            rules={{ required: "Facebook url is required" }}
            render={({ field }) => (
              <CustomTextfield
                error={errors?.facebook}
                errorMessage={errors?.facebook?.message}
                placeholder="Facebook URL"
                label="Facebook URL"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item mb={4}>
          <Controller
            control={control}
            name="linkedIn"
            rules={{ required: "LinkedIn url is required" }}
            render={({ field }) => (
              <CustomTextfield
                error={errors?.linkedIn}
                errorMessage={errors?.linkedIn?.message}
                placeholder="LinkedIn URL"
                label="LinkedIn URL"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item container flexGrow={1}>
          <Grid item xs={12} alignSelf="flex-end">
            <CustomButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              {isLoading ? "Updating..." : "SAVE"}
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialMediaForm;
