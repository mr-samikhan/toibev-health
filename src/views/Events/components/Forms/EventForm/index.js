import React from 'react'
import { Controller } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Box, Checkbox, Grid, Typography } from '@mui/material'

//imports
import RecurringPeriod from '../../RecurringPeriod'
import useEventForm from '../../../hooks/useEventForm'
import CustomButton from '../../../../../components/CustomButton'
import ImageUploader from '../../../../../components/MediaUpload'
import CustomSwitch from '../../../../../components/CustomSwitch'
import DatePicker from '../../../../../components/CustomDatePicker'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as TaskIcon } from '../../../../../assets/icons/task.svg'
import { ReactComponent as LinkIcon } from '../../../../../assets/icons/link.svg'
import { ReactComponent as Clipboard } from '../../../../../assets/icons/clipboard.svg'
import { ReactComponent as LocationIcon } from '../../../../../assets/icons/location.svg'

export default function EventForm({ isEdit, data, open, setOpen }) {
  const {
    errors,
    endDate,
    onSubmit,
    control,
    isLoading,
    startDate,
    weekdays,
    frequency,
    onChecked,
    recurrence,
    selectedPdf,
    setEndDate,
    isRecurring,
    mutateDelete,
    setStartDate,
    handleSubmit,
    selectedVideo,
    selectedImage,
    setSelectedPdf,
    setIsRecurring,
    isLoadingDelete,
    setSelectedVideo,
    setSelectedImage,
    recurrenceOptions,
  } = useEventForm({ initialState: data, open, setOpen, isEdit })

  const { pathname } = useLocation()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="clinic-form"
    >
      <Grid container>
        <Grid item xs={12} mb={3}>
          {pathname === '/home' && (
            <Grid container spacing={2}>
              {/* <Grid item xs={4} sm={6}>
                <ImageUploader
                  title="Video"
                  fileType="video"
                  selectedFile={selectedVideo}
                  setSelectedFile={setSelectedVideo}
                />
              </Grid> */}
              <Grid item xs={4} sm={6}>
                <ImageUploader
                  title="Photo"
                  fileType="image"
                  selectedFile={selectedImage}
                  setSelectedFile={setSelectedImage}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <CustomTextfield
                label="Title"
                placeholder="Enter title of event"
                error={errors.title}
                errorMessage={errors?.title?.message}
                EndIcon={Clipboard}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="location"
            control={control}
            rules={{ required: 'Field is required' }}
            render={({ field }) => (
              <CustomTextfield
                label="Where"
                placeholder="Enter Location of event"
                error={errors.where}
                errorMessage={errors?.where?.message}
                EndIcon={LocationIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={6} mb={3}>
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              label="Start Date"
            />
          </Grid>
          <Grid item xs={6} mb={3}>
            <DatePicker date={endDate} setDate={setEndDate} label="End Date" />
          </Grid>

          <Grid item xs={6} mb={3}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  type="time"
                  label="Start Time"
                  placeholder="Enter Time"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} mb={3}>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  type="time"
                  label="End Time"
                  placeholder="Enter Time"
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} mb={3}>
          <CustomSwitch
            label="Recurring Event"
            value={isRecurring}
            checked={isRecurring}
            defaultChecked={!!isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
        </Grid>
        {isRecurring && (
          <Grid item xs={12} mb={3}>
            <Controller
              name="recurrence"
              control={control}
              rules={{ required: 'Field is required' }}
              render={({ field: { value, onChange } }) => (
                <RecurringPeriod
                  label="Select Period"
                  selected={value}
                  onChange={(e) => onChange(e)}
                  recurrenceOptions={recurrenceOptions}
                />
              )}
            />
          </Grid>
        )}
        {recurrence?.value === 'custom' && (
          <>
            <Grid item xs={12} mb={3}>
              <Controller
                name="frequency"
                control={control}
                rules={{ required: 'Field is required' }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextfield
                    select
                    options={[{ label: 'Weekly', value: 'weekly' }]}
                    label="Frequency"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={3}>
              <Controller
                name="period"
                control={control}
                rules={{ required: 'Field is required' }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextfield
                    select
                    disabled={!frequency}
                    options={[{ label: '4 Weeks', value: '4weeks' }]}
                    label="Period"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid
              container
              p={2}
              mb={3}
              sx={{ border: '1px solid #DCDCDC', borderRadius: '16px' }}
            >
              {weekdays?.map((day, index) => (
                <Grid xs={12} item>
                  <Grid
                    container
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Grid item>
                      <Typography>{day?.label}</Typography>
                    </Grid>
                    <Grid item>
                      <Checkbox
                        sx={{
                          color: '#71757B',
                          borderRadius: 3,
                        }}
                        checked={day?.checked}
                        onChange={(e) => onChecked(e, index)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Grid item xs={12} mb={3}>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Field is required' }}
            render={({ field }) => (
              <CustomTextfield
                multiline={true}
                rows={4}
                label="Details"
                placeholder="Type details of event"
                error={errors.details}
                errorMessage={errors?.details?.message}
                EndIcon={TaskIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="webLink"
            control={control}
            rules={{ required: 'Field is required' }}
            render={({ field }) => (
              <CustomTextfield
                label="Web link"
                placeholder="Enter Webex link"
                error={errors.webLink}
                errorMessage={errors?.webLink?.message}
                EndIcon={LinkIcon}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} mb={3}>
          {pathname !== '/home' && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={6}>
                <ImageUploader
                  title="Video"
                  fileType="video"
                  selectedFile={selectedVideo}
                  setSelectedFile={setSelectedVideo}
                />
              </Grid>
              <Grid item xs={4} sm={6}>
                <ImageUploader
                  title="Photo"
                  fileType="image"
                  selectedFile={selectedImage}
                  setSelectedFile={setSelectedImage}
                />
              </Grid>
              <Grid item xs={4} sm={6}>
                <ImageUploader
                  title="PDF"
                  fileType="pdf"
                  selectedFile={selectedPdf}
                  setSelectedFile={setSelectedPdf}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} mb={2}>
          <CustomButton type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Loading...' : isEdit ? 'Edit Event' : 'Add Event'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton
              variant="outlined"
              disabled={isLoadingDelete}
              onClick={() => mutateDelete(data?.id)}
            >
              {isLoadingDelete ? 'Loading...' : 'Delete Event'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
