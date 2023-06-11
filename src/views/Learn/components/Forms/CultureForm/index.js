import React from "react";
import { Grid, Typography, Box, Menu } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import { ReactComponent as MicrofoneIcon } from "../../../../../assets/icons/microphone.svg";

import useCultureForm from "../../../hook/useCultureForm";
import MediaCard from "../../../../../components/MediaCard";
export default function CultureForm() {
  const { control, handleSubmit, onSubmit } = useCultureForm({});
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
                label="Culture Description"
                placeholder="Culture Description"
                multiline
                rows={6}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Grid container>
            <Grid item xs={12} mb={2}>
              <Typography
                fontWeight={500}
                fontSize={18}
                sx={{
                  color: "#000000",
                }}
              >
                File Upload
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justifyContent={"space-between"}
                sx={{ gap: "16px" }}
                flexWrap="nowrap"
              >
                <Grid item xs={6}>
                  <MediaCard
                    title="Audio File"
                    icon={<MicrofoneIcon />}
                    fileSize="2.5mb"
                  />
                </Grid>
                <Grid item xs={6}>
                  <MediaCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
