import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TextField, InputAdornment, IconButton } from '@mui/material'

export const CustomIconButton = styled((props) => <IconButton {...props} />)(
  ({ theme }) => ({
    '&.MuiIconButton-root': {
      background: 'rgba(242, 106, 71, 0.08)',
      borderRadius: '10px',
      marginRight: '8px',
      filter:
        'invert(50%) sepia(97%) saturate(1979%) hue-rotate(334deg) brightness(102%) contrast(90%)',
    },
    '& svg': {
      width: '16px',
      height: '16px',
    },
  })
)

const CustomTextField = styled((props) => <TextField focused {...props} />)(
  ({ theme }) => ({
    '&.MuiTextField-root': {
      '& input': {
        width: 'unset',
        flexGrow: 1,
      },
      '& .MuiFormLabel-root': { color: '#000' },
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #DCDCDC',
        borderRadius: '14px',
      },
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        // borderColor: theme.palette.primary.main,
        // borderWidth: "2px",
        border: '1px solid #DCDCDC',
        borderRadius: '14px',
      },
      '& fieldset': {
        padding: '0px 24px',
      },
      '& label': { left: '16px' },
      '& input': { paddingLeft: '24px' },
    },
  })
)

export default function CustomTextfield({
  sx,
  ref,
  select,
  EndIcon,
  options,
  multiline,
  noBackground,
  errorMessage,
  EndIconPrimary,
  handleEnterKeyPress,
  onFocus,
  ...rest
}) {
  return (
    <CustomTextField
      fullWidth
      onBlur={onFocus}
      id="outlined"
      select={select}
      multiline={multiline}
      helperText={errorMessage}
      onKeyPress={handleEnterKeyPress}
      sx={{
        '& .MuiInputBase-input': {
          padding: '16px',
        },
        '& .MuiInputBase-root': {
          alignItems: multiline ? 'start' : 'center',
        },
        ...sx,
      }}
      InputProps={{
        endAdornment:
          EndIconPrimary || EndIcon ? (
            <InputAdornment
              position="end"
              sx={{ marginTop: multiline && '28px' }}
            >
              {EndIconPrimary ? (
                <EndIconPrimary />
              ) : (
                <CustomIconButton onClick={rest.onClick}>
                  <EndIcon />
                </CustomIconButton>
              )}
            </InputAdornment>
          ) : (
            <></>
          ),
      }}
      SelectProps={{
        IconComponent: (props) => (
          <IconButton
            {...props}
            sx={{
              bottom: 20,
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        ),
      }}
      {...rest}
    >
      {select &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </CustomTextField>
  )
}
