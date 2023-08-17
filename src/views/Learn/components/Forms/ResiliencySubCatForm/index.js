import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Controller, set } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useResiliencySubCatForm from "../../../hook/useResiliencySubCatForm";
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

export default function ResiliencySubCatForm({ cat, setOpen, initialState }) {
  const {
    control,
    handleSubmit,
    onSubmit,
    handleFileChange,
    pdfInputRef,
    pdf,
    handleFileUpload,
    handleRemoveFile,
    image,
    setImage,
    isLoading,
  } = useResiliencySubCatForm({
    cat,
    setOpen,
    initialState,
  });
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="title"
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
          {!!pdf ? (
            <PdfFile pdf={pdf} handleRemoveFile={handleRemoveFile} />
          ) : (
            <>
              <CustomButton variant="outlined" onClick={handleFileUpload}>
                Add History doc (pdf)
              </CustomButton>
              <input
                ref={pdfInputRef}
                type="file"
                id="pdfUpload"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
                onClick={(e) => (e.target.value = null)}
              />
            </>
          )}
        </Grid>
        <Grid xs={12} mb={4}>
          <StyledHeading>Add Photo/Illustration</StyledHeading>
          <MediaUpload selectedFile={image} setSelectedFile={setImage} />
        </Grid>

        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? "Saving" : "Save Sub Category"}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
