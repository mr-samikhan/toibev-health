import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import ImageUploader from "../../../../../components/MediaUpload";
import { CustomChip } from "../../../../../components/CustomChip";

export default function LanguageDetailForm({
  selectedImage,
  setSelectedImage,
  onSubmit,
  description,
  setDescription,
  tribes,
  onHandleDeleteTribe,
}) {
  return (
    <Box component="form">
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Typography>
            Add/edit tribes that should be shown under this language
          </Typography>
        </Grid>
        <Grid item container columnGap={1.5} mb={3}>
          {tribes.map((tribe, index) => (
            <Grid item>
              <CustomChip
                title={tribe}
                index={index}
                handleDelete={onHandleDeleteTribe}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <CustomTextfield
            label="Language Description"
            placeholder="Language Description"
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
