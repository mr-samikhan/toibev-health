import React from 'react'
import { Controller } from 'react-hook-form'
import { Grid, Box, Typography, IconButton } from '@mui/material'

//imports
import plus from '../../../../../assets/icons/plus-icon.svg'
import { createThumbnailFromVideo } from '../../../actions'
import useLanguageForm from '../../../hook/useLanguageForm'
import { CustomList } from '../../../../../components/List'
import AlertDialog from '../../../../../components/AlertDialog'
import { CustomChip } from '../../../../../components/CustomChip'
import ImageUploader from '../../../../../components/MediaUpload'
import CustomButton from '../../../../../components/CustomButton'
import calendarIcon from '../../../../../assets/icons/events-Icon.svg'
import CustomTextfield from '../../../../../components/CustomTextfield'
import locationIcon from '../../../../../assets/icons/location-blue.svg'
import { ReactComponent as PeopleIcon } from '../../../../../assets/icons/people.svg'
import { MuiCustomAutocomplete } from '../../../../../components/MuiCustomAutocomplete/MuiCustomAutocomplete'

export default function LangugaeForm({
  isEdit,
  initialState,
  setOpen,
  allLanguages,
}) {
  const {
    errors,
    control,
    onSubmit,
    isLoading,
    cultures,
    handleDelete,
    handleSubmit,
    onSelectTribes,
    selectedTribes,
    isLoadingDelete,
    setSelectedImage,
    setSelectedTribes,
    onHandleDeleteTribe,
    //
    languages,
    setLanguages,
    setAudioFile,
    selectedVideos,
    setSelectedVideos,
    selectedCourses,
    setSelectedCourses,
    onSelectCourses,
    events,
  } = useLanguageForm({
    isEdit,
    setOpen,
    initialState,
    allLanguages,
  })

  const [isCoursesModal, setIsCoursesModal] = React.useState(false)

  const onCancel = () => {
    setSelectedCourses([])
    setIsCoursesModal(false)
  }

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
    updatedSelectedVideos[indexToRemove].file = ''
    setLanguages(updatedSelectedVideos)
  }

  const formatData = (data) => {
    let comingDate = data.toDate()
    const formattedDate = comingDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      // hour: 'numeric',
      // minute: 'numeric',
      hour12: true,
    })
    return formattedDate
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
            initialStateArray={cultures}
            selectedTribes={selectedTribes}
            setArrayValues={setSelectedTribes}
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
                  File Upload For:{` ${item?.title}`}
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
                      isLanguageForm
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
                      isLanguageForm
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
        <Grid item xs={12} mb={3} display="flex" gap={2} alignItems="center">
          <Typography
            fontWeight={500}
            fontSize={18}
            sx={{
              color: '#000000',
            }}
          >
            Courses
          </Typography>
          <IconButton onClick={() => setIsCoursesModal(true)}>
            <img src={plus} alt="plus" />
          </IconButton>
        </Grid>
        {/* courses modal */}
        {isCoursesModal && (
          <AlertDialog
            title="Add Course"
            open={isCoursesModal}
            setOpen={setIsCoursesModal}
            message={
              <>
                <CustomList
                  list={events}
                  icon={false}
                  isNoicon={false}
                  onRowClick={onSelectCourses}
                  selectedRows={selectedCourses}
                />
                <Grid item xs={12} mb={2}>
                  <CustomButton
                    variant="contained"
                    onClick={() => setIsCoursesModal(false)}
                  >
                    {'Add Course'}
                  </CustomButton>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <CustomButton variant="outlined" onClick={onCancel}>
                    {'Cancel'}
                  </CustomButton>
                </Grid>
              </>
            }
          />
        )}
        {/* end */}

        <Grid
          item
          xs={12}
          md={12}
          mb={3}
          gap={2}
          display="flex"
          flexWrap="wrap"
          flexDirection="row"
        >
          {selectedCourses?.map((course, index) => (
            <Grid
              item
              p={1}
              md={5.8}
              mb={3}
              key={index}
              borderRadius={4}
              bgcolor="rgba(59, 125, 125, 0.10)"
            >
              <Box width="90%" height={108} m="auto">
                <img
                  alt="course"
                  width="100%"
                  height="100%"
                  src={course?.image}
                  style={{
                    borderRadius: '8px',
                  }}
                />
              </Box>
              <Typography
                mt={1}
                fontSize={16}
                fontWeight={700}
                textAlign="center"
              >
                {course.title}
              </Typography>
              <Box display="flex" gap={2} justifyContent="center">
                <img src={calendarIcon} alt="" />
                <Typography fontSize={14} fontWeight={400}>{`${formatData(
                  course.startDate
                )} at ${formatData(course.endDate)}`}</Typography>
              </Box>
              <Box display="flex" gap={2} justifyContent="center">
                <img src={locationIcon} alt="" />
                <Typography fontSize={14} fontWeight={400}>
                  {course.location}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} mb={isEdit && 2}>
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Language'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton
              variant="outlined"
              onClick={handleDelete}
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? 'Deleting...' : 'Delete Language'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
