import React from "react";
import { Grid, Typography, Box, Menu } from "@mui/material";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import ImageUploader from "../../../../../components/MediaUpload";
import { ReactComponent as PeopleIcon } from "../../../../../assets/icons/people.svg";
import { Controller } from "react-hook-form";

export default function CultureForm({
  selectedImage,
  setSelectedImage,
  onSubmit,
  description,
  setDescription,
}) {
  return (
    <Box component="form">
      <Grid container>
        <Grid item xs={12} mb={4} mt={2}>
          <Controller
            name="title"
            render={({ field }) => (
              <CustomTextfield
                label="Tribe Name"
                placeholder="Tribe in title"
                EndIcon={PeopleIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={4} mt={2}>
          <Controller
            name="link"
            render={({ field }) => (
              <CustomTextfield
                label="Tribe Link"
                placeholder="Tribe in title"
                EndIcon={PeopleIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <CustomTextfield
            label="Culture Description"
            placeholder="Culture Description"
            multiline
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
                {/* <Grid item xs={6}>
                  <MediaCard
                    title="Audio File"
                    icon={<MicrofoneIcon />}
                    fileSize="2.5mb"
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <ImageUploader
                    fileType="image"
                    selectedFile={selectedImage}
                    setSelectedFile={setSelectedImage}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" onClick={onSubmit}>
            Save History
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
