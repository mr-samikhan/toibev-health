import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material'
import React from 'react'
import { CustomChip } from '../CustomChip'
import plus from '../../assets/icons/plus-icon.svg'

export const MuiCustomAutocomplete = ({
  array,
  isChip,
  isInput,
  isTribes,
  onChange,
  isDivider,
  setArrayValues,
  selectedTribes,
  initialStateArray,
}) => {
  const [inputValue, setInputValue] = React.useState(null)
  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const onAddLanguageTexts = () => {
    let temp = [...array]
    temp.push({
      title: inputValue,
    })
    setArrayValues(temp)
    return setInputValue('')
  }

  const onSelectTribes = (record) => {
    const index = selectedTribes.findIndex(
      (item) => item.title === record.title
    )

    if (index === -1) {
      selectedTribes.push(record)
    } else {
      selectedTribes.splice(index, 1)
    }
    setArrayValues([...selectedTribes])
    return selectedTribes
  }

  const onHandleDeleteTribe = (record) => {
    const deleteRec = selectedTribes.findIndex(
      (item) => item.title === record.title
    )
    if (deleteRec !== -1) {
      selectedTribes.splice(deleteRec, 1)
    }
    setArrayValues([...selectedTribes])
  }

  const getSeletedItems = (item) => {
    const matched = selectedTribes?.findIndex(
      (tribe) => tribe.title === item.title
    )
    if (matched === -1) {
      return false
    } else {
      return true
    }
  }

  let ARRAY_CHECK = isTribes ? initialStateArray : array

  return (
    <Paper
      elevation={0}
      sx={{
        height: 190,
        display: 'flex',
        borderRadius: '24px',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
        border: '2px solid #3B7D7D',
      }}
    >
      {isInput && (
        <TextField
          variant="standard"
          fullWidth
          sx={{ px: '15px' }}
          onChange={onChange || handleChange}
          value={inputValue}
        />
      )}
      <IconButton
        sx={{ position: 'absolute', right: 20, top: 20 }}
        onClick={onAddLanguageTexts}
      >
        <img src={plus} alt="plus-icon" />
      </IconButton>
      <Box width="90%" m="auto">
        <Box display="flex" gap={2} flexWrap="wrap">
          {isChip &&
            selectedTribes?.map((tribe, index) => (
              <Grid item key={index}>
                <CustomChip
                  title={tribe.title}
                  index={tribe}
                  handleDelete={onHandleDeleteTribe}
                />
              </Grid>
            ))}
        </Box>
        {isDivider && (
          <Divider variant="inset" sx={{ m: 'auto', width: '100%', mt: 3 }} />
        )}
        <Box sx={{ overflowY: 'auto', height: '100px', mt: 2 }}>
          {ARRAY_CHECK?.map((item, index) => (
            <MenuItem
              key={index}
              sx={{ p: 0 }}
              selected={getSeletedItems(item)}
              onClick={() => onSelectTribes(item)}
            >
              {item.title}
            </MenuItem>
          ))}
        </Box>
      </Box>
    </Paper>
  )
}
