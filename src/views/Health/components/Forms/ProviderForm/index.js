import React from "react";
import { Grid, Typography, Box, Menu } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useProviderForm from "../../../hooks/useProvidersForm";

export const ProviderForm = (props) => {
  const { onSubmit, handleSubmit, control, isLoading, isEdit } =
    useProviderForm(props);
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Provider Name"
                placeholder="Enter Provider's Name"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Position"
                placeholder="Enter Provider's Position"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Address"
                placeholder="Enter Provider's Address"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography
            fontWeight={500}
            sx={{ fontSize: "18px", fontFamily: "DM Sans" }}
          >
            Social Media links
          </Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="socialLinks.facebook"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Facebook"
                placeholder="Enter Facebook URL"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="socialLinks.linkedIn"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="LinkedIn"
                placeholder="Enter LinkedIn URL"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="socialLinks.twitter"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Twitter"
                placeholder="Enter Twitter URL"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="socialLinks.instagram"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Facebook"
                placeholder="Enter Instagram URL"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading
              ? "Loading..."
              : isEdit
              ? "Edit Provider"
              : "Add Provider"}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
};
