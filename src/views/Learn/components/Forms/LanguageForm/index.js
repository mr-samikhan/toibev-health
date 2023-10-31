import React from 'react'
import { Controller } from 'react-hook-form'
import { Grid, Box, Typography } from '@mui/material'

//imports
import { createThumbnailFromVideo } from '../../../actions'
import useLanguageForm from '../../../hook/useLanguageForm'
import CustomButton from '../../../../../components/CustomButton'
import ImageUploader from '../../../../../components/MediaUpload'
import { CustomChip } from '../../../../../components/CustomChip'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as PeopleIcon } from '../../../../../assets/icons/people.svg'
import { MuiCustomAutocomplete } from '../../../../../components/MuiCustomAutocomplete/MuiCustomAutocomplete'

export default function LangugaeForm({ isEdit, initialState, setOpen }) {
  const {
    errors,
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
    setSelectedTribes,
    isLoadingCultures,
    isFetchingCultures,
    onHandleDeleteTribe,
    //
    audioFile,
    languages,
    setLanguages,
    setAudioFile,
    selectedVideos,
    setSelectedVideos,
  } = useLanguageForm({
    isEdit,
    initialState,
    setOpen,
  })

  const onChange = (e) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        createThumbnailFromVideo(file)
      )

      Promise.all(newImages).then((resolvedImages) => {
        setSelectedVideos([...selectedVideos, ...resolvedImages])
      })
    }
  }

  const handleImageRemove = (indexToRemove) => {
    const updatedSelectedVideos = [...selectedVideos]
    updatedSelectedVideos.splice(indexToRemove, 1)
    setSelectedVideos(updatedSelectedVideos)
  }

  const onAddLanguageAudio = (index, file, fileType) => {
    let newLanguages = [...languages]
    const fileUrl = URL.createObjectURL(file)
    newLanguages[index][fileType] = {
      file,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}mb`,
      fileType: file.type,
      fileUrl,
    }
    setLanguages(newLanguages)
  }

  //remove only the image or audio
  const onRemoveFile = (indexToRemove, fileType) => {
    const updatedSelectedVideos = [...languages]
    updatedSelectedVideos[indexToRemove][fileType] = ''
    setLanguages(updatedSelectedVideos)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={4} mt={2}>
          <Controller
            rules={{
              required: 'This field is required',
            }}
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                EndIcon={PeopleIcon}
                label="Language Name"
                placeholder="Type in title"
                error={errors?.title?.message}
                errorMessage={errors?.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography>
            Add/edit tribes that should be shown under this language
          </Typography>
        </Grid>
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
        <Grid item xs={12} mb={3}>
          {/* <CustomTextfield
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
          /> */}
          <MuiCustomAutocomplete
            onChange={(e) => {
              const { label, value } = cultures?.filter(
                (culture) => culture?.id === e.target.value
              )[0]
              onSelectTribes({ title: label, id: value })
            }}
            isTribes
            isInput={false}
            // isChip={true}
            isDivider={true}
            selectedTribes={selectedTribes}
            setArrayValues={setSelectedTribes}
            initialStateArray={isEdit ? initialState?.tribes : cultures}
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
                label="Language Description"
                placeholder="Language Description"
                error={errors?.description?.message}
                errorMessage={errors?.description?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography>
            Add/edit words that should be shown under this language
          </Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <MuiCustomAutocomplete
            isChip={false}
            isInput={true}
            isTribes={false}
            isDivider={false}
            array={languages}
            selectedTribes={languages}
            setArrayValues={setLanguages}
          />
        </Grid>
        {languages?.map((item, index) => (
          <Grid item xs={12} mb={3} key={index}>
            <Grid container>
              <Grid item xs={12} mb={2}>
                <Typography
                  fontWeight={500}
                  fontSize={18}
                  sx={{
                    color: '#000000',
                  }}
                >
                  File Upload:{` ${item?.title}`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  flexWrap="nowrap"
                  sx={{ gap: '16px' }}
                  justifyContent={'space-between'}
                >
                  <Grid item xs={6}>
                    <ImageUploader
                      index={index}
                      fileType="audio"
                      selectedFile={item?.audio}
                      onRemoveFile={onRemoveFile}
                      setSelectedFile={setAudioFile}
                      onAddLanguageAudio={onAddLanguageAudio}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ImageUploader
                      index={index}
                      fileType="image"
                      selectedFile={item?.image}
                      onRemoveFile={onRemoveFile}
                      setSelectedFile={setSelectedImage}
                      onAddLanguageAudio={onAddLanguageAudio}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        {/* previos work */}
        {/* <Grid item xs={12} mb={3}>
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
                flexWrap="nowrap"
                sx={{ gap: '16px' }}
                justifyContent={'space-between'}
              >
                <Grid item xs={6}>
                  <ImageUploader
                    fileType="audio"
                    selectedFile={audioFile}
                    setSelectedFile={setAudioFile}
                  />
                </Grid>
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
        </Grid> */}
        {/* end */}
        {/* <Grid item container md={12} spacing={2} mb={2}>
          {selectedVideos?.map((item, index) => (
            <Grid item xs={6} md={6} key={index}>
              <ImageUploader
                fileType="video"
                // title="Videos"
                selectedFile={item}
                handleImageRemove={() => handleImageRemove(index)}
              />
            </Grid>
          ))}
          {selectedVideos.length < 8 && (
            <Grid item xs={6} md={6} mb={2}>
              <ImageUploader
                fileType="video"
                // title="Videos"
                // selectedFile={''}
                setSelectedFile={setSelectedVideos}
                onChange={(e) => onChange(e)}
              />
            </Grid>
          )}
        </Grid> */}
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
