import React from 'react'
import { Grid, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
//imports
import CustomButton from '../../../../../components/CustomButton'
import DatePicker from '../../../../../components/CustomDatePicker'
import useGroupSessionForm from '../../../hooks/useGroupSessionForm'
import CustomTextfield from '../../../../../components/CustomTextfield'

export const GroupSessionForm = (props) => {
  const {
    errors,
    isEdit,
    control,
    endDate,
    onDelete,
    onSubmit,
    isLoading,
    startDate,
    setEndDate,
    setStartDate,
    handleSubmit,
    groupSessions,
    isLoadingDelete,
  } = useGroupSessionForm(props)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            rules={{
              required: {
                value: true,
                message: 'Group Session Name is required',
              },
            }}
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                error={errors.title}
                label="Group Session Name"
                errorMessage={errors?.title?.message}
                placeholder="Enter Group Session Name"
              />
            )}
          />
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={6} mb={3}>
            <DatePicker
              date={startDate}
              label="Start Date"
              setDate={setStartDate}
            />
          </Grid>
          <Grid item xs={6} mb={3}>
            <DatePicker date={endDate} setDate={setEndDate} label="End Date" />
          </Grid>

          <Grid item xs={6} mb={3}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: 'Start Time is required',
                },
              }}
              name="startTime"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  {...field}
                  type="time"
                  label="Start Time"
                  error={errors.startTime}
                  placeholder="Enter Time"
                  errorMessage={errors?.startTime?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} mb={3}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: 'End Time is required',
                },
              }}
              name="endTime"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  type="time"
                  {...field}
                  label="End Time"
                  error={errors.endTime}
                  placeholder="Enter Time"
                  errorMessage={errors?.endTime?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Location"
                placeholder="Enter Location"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                rows={4}
                multiline
                {...field}
                label="Description"
                placeholder="Enter short bio"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading
              ? 'Loading...'
              : isEdit
              ? 'Update Group Session'
              : 'Add Group Session'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12} mt={3}>
            <CustomButton
              variant="outlined"
              onClick={onDelete}
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? 'Deleting...' : 'Delete Group Session'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
