import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useHistoryForm from "../../../hook/useHistoryForm";
import MediaUpload from "../../../../../components/MediaUpload";
import { PdfFile } from "../../PdfFile";

const StyledHeading = ({ children }) => (
  <Typography
    fontWeight={500}
    fontSize={18}
    sx={{
      color: "#000000",
    }}
  >
    {children}
  </Typography>
);

export default function HistoryForm() {
  const { control, handleSubmit, onSubmit } = useHistoryForm({});
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="cultureDescription"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Title"
                placeholder="Type in title"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} mb={4}>
          {true ? (
            <PdfFile />
          ) : (
            <CustomButton variant="outlined">
              Add History doc (pdf)
            </CustomButton>
          )}
        </Grid>
        <Grid xs={12} mb={4}>
          <StyledHeading>Add Photo/Illustration</StyledHeading>
          <MediaUpload />
        </Grid>

        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            Save History
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
