import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomTextfield from '../../../../components/CustomTextfield'
import ImageUploader from '../../../../components/MediaUpload'
import CustomButton from '../../../../components/CustomButton'
import { ReactComponent as PeopleIcon } from '../../../../assets/icons/people.svg'
import useTribeForm from '../../hook/useTribeForm'

export default function TribeForm({ isEdit, initialState, setOpen, cultures }) {
  const {
    errors,
    control,
    onSubmit,
    onDelete,
    isLoading,
    handleSubmit,
    selectedImage,
    isLoadingDelete,
    setSelectedImage,
  } = useTribeForm({
    isEdit,
    setOpen,
    cultures,
    initialState,
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3} mt={2}>
          <Controller
            rules={{
              required: 'This field is required',
            }}
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Tribe Name"
                EndIcon={PeopleIcon}
                error={errors?.title?.message}
                placeholder="Enter Tribe Name"
                errorMessage={errors?.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="link"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Tribe Link"
                placeholder="Enter Tribe Link"
                EndIcon={PeopleIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            rules={{
              required: 'This field is required',
            }}
            name="description"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                rows={6}
                multiline
                {...field}
                label="Culture Description"
                placeholder="Culture Description"
                error={errors?.description?.message}
                errorMessage={errors?.description?.message}
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
                  color: '#000000',
                }}
              >
                File Upload
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justifyContent={'space-between'}
                sx={{ gap: '16px' }}
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
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Saving' : 'Save Culture'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12} mt={3}>
            <CustomButton
              variant="outlined"
              onClick={onDelete}
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? 'Deleting...' : 'Delete Culture'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
