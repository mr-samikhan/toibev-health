import React from 'react'
import { Controller } from 'react-hook-form'
import { Grid, Typography, Box } from '@mui/material'

import { PdfFile } from '../../PdfFile'
import MediaUpload from '../../../../../components/MediaUpload'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'
import useResiliencySubCatForm from '../../../hook/useResiliencySubCatForm'

const StyledHeading = ({ children }) => (
  <Typography
    fontWeight={500}
    fontSize={18}
    sx={{
      color: '#000000',
    }}
  >
    {children}
  </Typography>
)

export default function ResiliencySubCatForm({
  cat,
  setOpen,
  initialState,
  isEdit,
}) {
  const {
    pdf,
    image,
    errors,
    control,
    onSubmit,
    setImage,
    isLoading,
    pdfInputRef,
    handleSubmit,
    handleFileChange,
    handleFileUpload,
    handleRemoveFile,
  } = useResiliencySubCatForm({
    cat,
    setOpen,
    initialState,
    isEdit,
  })
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            rules={{
              required: 'This field is required',
            }}
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Title"
                placeholder="Type in title"
                error={errors?.title?.message}
                errorMessage={errors?.title?.message}
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
                style={{ display: 'none' }}
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
            {isLoading ? 'Saving' : 'Save Sub Category'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
