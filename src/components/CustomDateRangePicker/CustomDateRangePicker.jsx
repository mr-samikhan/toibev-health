import * as React from 'react'
import dayjs from 'dayjs'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useDispatch } from 'react-redux'

export const CustomDateRangePicker = (props) => {
  const { setDateRange, dateRange } = props

  const dipatch = useDispatch()

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Start Date"
            sx={style}
            value={dayjs(dateRange?.startDate)}
            onChange={(date) => {
              setDateRange({
                ...props.dateRange,
                startDate: date.$d,
              })
              dipatch({
                type: 'SET_START_DATE',
                payload: date.$d,
              })
            }}
          />
          <DatePicker
            label="Start Date"
            sx={style}
            value={dayjs(dateRange?.endDate)}
            onChange={(date) => {
              dipatch({
                type: 'SET_END_DATE',
                payload: date.$d,
              })
              setDateRange({
                ...props.dateRange,
                endDate: date.$d,
              })
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  )
}

const style = {
  '& .MuiInputBase-root': {
    overflow: 'hidden',
    '& .MuiSvgIcon-root': {
      mr: 1,
    },
  },
}
