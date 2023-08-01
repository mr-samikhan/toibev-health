import React from "react";
import { Grid, Typography, Box, Menu } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import { ReactComponent as MicrofoneIcon } from "../../../../../assets/icons/microphone.svg";
import useCultureForm from "../../../hook/useCultureForm";
import MediaCard from "../../../../../components/MediaCard";
import ImageUploader from "../../../../../components/MediaUpload";

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
