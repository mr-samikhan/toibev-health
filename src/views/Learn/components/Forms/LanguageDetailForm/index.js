import React from 'react'
import {
  Grid,
  Box,
  Paper,
  Divider,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material'
//imports
import plus from '../../../../../assets/icons/plus-icon.svg'
import CustomButton from '../../../../../components/CustomButton'
import ImageUploader from '../../../../../components/MediaUpload'
import { CustomChip } from '../../../../../components/CustomChip'
import CustomTextfield from '../../../../../components/CustomTextfield'

export default function LanguageDetailForm({
  onSubmit,
  description,
  selectedImage,
  initialState,
  setDescription,
  setSelectedImage,
}) {
  const [selectedTribes, setSelectedTribes] = React.useState([])
  // const [isDropdownOpen, setIsDropdownOpen] = React.useState(true)

  // const handleDropdownOpen = () => {
  //   setIsDropdownOpen(true)
  // }

  // const handleDropdownClose = () => {
  //   setIsDropdownOpen(false)
  // }

  // const toggleDropdown = () => {
  //   if (isDropdownOpen) {
  //     handleDropdownClose()
  //   } else {
  //     handleDropdownOpen()
  //   }
  // }

  const onSelectTribes = (record) => {
    const index = selectedTribes.findIndex(
      (item) => item.title === record.title
    )

    if (index === -1) {
      selectedTribes.push(record)
    } else {
      selectedTribes.splice(index, 1)
    }
    setSelectedTribes([...selectedTribes])
    return selectedTribes
  }

  const onHandleDeleteTribe = (record) => {
    const deleteRec = selectedTribes.findIndex(
      (item) => item.title === record.title
    )
    if (deleteRec !== -1) {
      selectedTribes.splice(deleteRec, 1)
    }
    setSelectedTribes([...selectedTribes])
  }

  const getSeletedItems = (item) => {
    const test = selectedTribes?.findIndex(
      (tribe) => tribe.title === item.title
    )
    if (test === -1) {
      return false
    } else {
      return true
    }
  }

  let tribesList =
    selectedTribes?.length === 0 ? initialState?.tribes : selectedTribes

  return (
    <Box component="form">
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Typography>
            Add/edit tribes that should be shown under this language
          </Typography>
        </Grid>
        <Grid item container columnGap={1.5} mb={3}>
          {tribesList?.map((tribe, index) => (
            <Grid item>
              <CustomChip index={index} title={tribe.title} />
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} mb={3}>
          <Paper
            elevation={0}
            sx={{
              height: 190,
              borderRadius: '24px',
              position: 'relative',
              border: '2px solid #3B7D7D',
            }}
          >
            <IconButton sx={{ position: 'absolute', right: 20, top: 20 }}>
              <img src={plus} alt="plus-icon" />
            </IconButton>
            <Box width="90%" m="auto">
              <Box display="flex" gap={2} flexWrap="wrap">
                {selectedTribes?.map((tribe, index) => (
                  <Grid item key={index}>
                    <CustomChip
                      title={tribe.title}
                      index={tribe}
                      handleDelete={onHandleDeleteTribe}
                    />
                  </Grid>
                ))}
              </Box>
              <Divider
                variant="inset"
                sx={{ m: 'auto', width: '100%', mt: 3 }}
              />
              {initialState?.tribes?.map((item, index) => (
                <MenuItem
                  sx={{ p: 0 }}
                  onClick={() => onSelectTribes(item)}
                  selected={getSeletedItems(item)}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Box>
          </Paper>
          {/* <Autocomplete
            sx={{
              position: 'relative',
              '& .MuiInputBase-root': {
                borderRadius: '24px',

                '& .MuiButtonBase-root': {
                  display: 'flex',
                  alignSelf: 'flex-start',
                },
                '& .MuiChip-root': {
                  display: 'none',
                },
                '& .MuiAutocomplete-endAdornment': {
                  display: 'flex',
                  alignItems: 'center',
                  m: '10px 31px 10px 10px',
                  gap: 2,
                  top: 0,
                  '& .MuiSvgIcon-fontSizeMedium': {
                    top: 0,
                  },
                },
              },
              '& .MuiButtonBase-root': {
                display: 'flex',
                alignSelf: 'flex-start',
              },
            }}
            multiple
            id="size-small-outlined-multi"
            size="small"
            options={[
              { title: 'The Shawshank Redemption', year: 1994 },
              { title: 'The Godfather', year: 1972 },
            ]}
            onOpen={toggleDropdown}
            onClose={toggleDropdown}
            getOptionLabel={(option) => option.title}
            defaultValue={[{ title: 'The Godfather', year: 1972 }]}
            popupIcon={isDropdownOpen ? <Edit /> : <img src={plus} />}
            renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    '& .MuiInputBase-input': {
                      display: 'flex',
                      alignSelf: 'flex-start',
                      m: '10px 31px 10px 10px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 190,
                      display: 'flex',
                      alignSelf: 'flex-end',
                      p: 10,
                    },
                  }}
                />
            )}
          /> */}
        </Grid>
        <Grid item xs={12} mb={3}>
          <CustomTextfield
            label="Language Description"
            placeholder="Language Description"
            multiline
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
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
                justifyContent={'space-between'}
                sx={{ gap: '16px' }}
                flexWrap="nowrap"
              >
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
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" onClick={onSubmit}>
            Save History
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
