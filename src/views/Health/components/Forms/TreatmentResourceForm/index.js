import React from 'react'
import { Controller } from 'react-hook-form'
import { Grid, Typography, Box } from '@mui/material'

import { PdfFile } from '../../../../Learn/components/PdfFile'
import MediaUpload from '../../../../../components/MediaUpload'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'
import useTreatmentResourceForm from '../../../hooks/useTreatmentResourceForm'

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

export default function TreatmentResourceForm({
  isEdit,
  data,
  setOpen,
  initialState,
}) {
  const {
    pdf,
    image,
    errors,
    control,
    onSubmit,
    onDelete,
    setImage,
    isLoading,
    pdfInputRef,
    handleSubmit,
    isLoadingDelete,
    handleFileUpload,
    handleFileChange,
    handleRemoveFile,
  } = useTreatmentResourceForm({
    isEdit,
    data,
    setOpen,
    initialState,
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
                error={errors?.title}
                placeholder="Type in title"
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
            {isLoading
              ? 'Loading...'
              : isEdit
              ? 'Update Resource'
              : 'Save Resource'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12} mt={2}>
            <CustomButton variant="outlined" onClick={onDelete}>
              {isLoadingDelete ? 'Deleting' : 'Delete Resource'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
