import React from 'react'
import { Controller } from 'react-hook-form'
import { Grid, Box, Typography } from '@mui/material'

//imports
import useLanguageForm from '../../../hook/useLanguageForm'
import CustomButton from '../../../../../components/CustomButton'
import ImageUploader from '../../../../../components/MediaUpload'
import { CustomChip } from '../../../../../components/CustomChip'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as PeopleIcon } from '../../../../../assets/icons/people.svg'

export default function LangugaeForm({ isEdit, initialState, setOpen }) {
  const {
    control,
    onSubmit,
    isLoading,
    cultures,
    handleDelete,
    handleSubmit,
    selectedImage,
    onSelectTribes,
    selectedTribes,
    isLoadingDelete,
    setSelectedImage,
    isLoadingCultures,
    isFetchingCultures,
    onHandleDeleteTribe,
  } = useLanguageForm({
    isEdit,
    initialState,
    setOpen,
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item container columnGap={1.5} mb={3}>
          {selectedTribes?.map((tribe, index) => (
            <Grid item>
              <CustomChip
                index={tribe}
                title={tribe.title}
                handleDelete={onHandleDeleteTribe}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} mb={4} mt={2}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Language Name"
                placeholder="Type in title"
                EndIcon={PeopleIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <CustomTextfield
            label="Select Tribes"
            placeholder="Select Tribe"
            select
            options={cultures}
            isLoading={isLoadingCultures || isFetchingCultures}
            onChange={(e) => {
              const { label, value } = cultures?.filter(
                (culture) => culture?.id === e.target.value
              )[0]
              onSelectTribes({ title: label, id: value })
            }}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Language Description"
                placeholder="Language Description"
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
        <Grid item xs={12} mb={isEdit && 2}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? 'Saving...' : 'Save Language'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton variant="outlined" onClick={handleDelete}>
              {isLoadingDelete ? 'Deleting...' : 'Delete Language'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
