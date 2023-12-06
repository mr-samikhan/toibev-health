import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { TextField, IconButton, Typography, Grid } from '@mui/material'
import { DatePicker as DatePick } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

//imports
import './datepicker.scss'
import { convertToShortDate } from '../../utils/dateFormats'
import { ReactComponent as CalenderIcon } from '../../assets/icons/calendar.svg'

export function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePick label="Basic date picker" autoFocus={true} />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export function DatePicker({ setOpen, dateRange }) {
  let dateCheck = `${convertToShortDate(
    dateRange?.startDate
  )} - ${convertToShortDate(dateRange?.endDate)}`

  return (
    <Grid container alignItems="center" spacing={2} className="date-picker">
      <Grid item>
        <Typography className="label">Date Range</Typography>
      </Grid>
      <Grid item>
        <TextField
          value={dateCheck}
          className="date-picker-field"
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setOpen((prev) => !prev)}
                sx={{
                  marginRight: '8px',
                  borderRadius: '6px',
                  background: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    opacity: '0.9',
                    background: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CalenderIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
    </Grid>
  )
}
