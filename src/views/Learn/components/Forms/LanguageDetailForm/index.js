import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
//imports
import CustomButton from '../../../../../components/CustomButton'
import ImageUploader from '../../../../../components/MediaUpload'
import { CustomChip } from '../../../../../components/CustomChip'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { MuiCustomAutocomplete } from '../../../../../components/MuiCustomAutocomplete/MuiCustomAutocomplete'

export default function LanguageDetailForm({
  onSubmit,
  description,
  selectedImage,
  initialState,
  setDescription,
  setSelectedImage,
}) {
  const [selectedTribes, setSelectedTribes] = React.useState([])
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(true)

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true)
  }

  const handleDropdownClose = () => {
    setIsDropdownOpen(false)
  }

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      handleDropdownClose()
    } else {
      handleDropdownOpen()
    }
  }

  let tribesList =
    selectedTribes?.length === 0 ? initialState?.tribes : selectedTribes

  const [array, setArray] = React.useState([])

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
            <Grid item key={index}>
              <CustomChip index={index} title={tribe.title} />
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} mb={3}>
          <MuiCustomAutocomplete
            isTribes
            array={array}
            isChip={true}
            isInput={false}
            isDivider={true}
            selectedTribes={selectedTribes}
            setArrayValues={setSelectedTribes}
            initialStateArray={initialState?.tribes}
          />
        </Grid>
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
            popupIcon={isDropdownOpen ? <img src={plus} /> : <img src={plus} />}
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
          <Typography>
            Add/edit tribes that should be shown under this language
          </Typography>
        </Grid>
        <Grid item xs={12} mb={3}>
          <MuiCustomAutocomplete
            array={array}
            isChip={false}
            isInput={true}
            isDivider={false}
            setArrayValues={setArray}
            initialStateArray={array}
            selectedTribes={selectedTribes}
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
