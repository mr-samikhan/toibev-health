import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'

//imports
import './style.scss'
import CustomButton from '../../../../../components/CustomButton'
import { useProviderAvailabilityForm } from '../../../hooks/useProviderAvailabilityForm'

export const ProviderAvailabilityForm = (props) => {
  const {
    onSubmit,
    isLoading,
    selectedDays,
    handleSubmit,
    myCustomLocale,
    availableTimes,
    setSelectedDays,
    handleAvailableTime,
  } = useProviderAvailabilityForm(props)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Typography className="availability_title">Select Dates</Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Calendar
            value={selectedDays}
            onChange={setSelectedDays}
            locale={myCustomLocale}
            calendarClassName="responsive-calendar"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className="availability_title">Select Time</Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <Grid className="available__times">
            {availableTimes?.map((time) => (
              <Button
                key={time.value}
                variant="contained"
                onClick={() => handleAvailableTime(time)}
                className={time.isSelected ? 'time selected' : 'time'}
              >
                {time.label}
              </Button>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? 'Saving...' : 'Save'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
