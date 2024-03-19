import dayjs from 'dayjs'
import * as React from 'react'
import { TextField } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ReactComponent as YourCustomIcon } from '../../assets/icons/clock-icon.svg'

const MuiTimePicker = (props) => {
  const { label, value, onChange } = props || {}

  const defaultTimeValue = React.useMemo(() => {
    return value && dayjs(value, 'HH:mm').isValid()
      ? dayjs(value, 'HH:mm')
      : null
  }, [value])

  const [value_, setValue_] = React.useState(defaultTimeValue)

  React.useEffect(() => {
    setValue_(defaultTimeValue)
  }, [defaultTimeValue])

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker
            format="hh:mm A"
            onChange={(newValue) => {
              onChange(newValue)
              setValue_(newValue)
            }}
            label={label}
            value={value_}
            renderInput={(params) => <TextField {...params} />}
            slots={{
              openPickerIcon: YourCustomIcon,
              actionBar: () => <></>,
            }}
            sx={{
              width: '300px',
              '& .MuiInputAdornment-positionEnd': {
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
              },
              '& .MuiSvgIcon-root': {
                width: '1em',
                height: '1em',
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </React.Fragment>
  )
}

export default MuiTimePicker
