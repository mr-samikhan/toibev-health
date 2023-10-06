import React from 'react'
import { Grid, Typography } from '@mui/material'

import './style.scss'
import icons from '../../../../assets'
import CustomButton from '../../../../components/CustomButton'

export const PdfFile = ({ pdf, handleRemoveFile }) => {
  return (
    <Grid
      container
      p={2}
      alignItems="center"
      className="container"
      justifyContent="space-between"
    >
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className="file"
            >
              <img src={icons.documentIcon} />
            </Grid>
          </Grid>
          <Grid item>
            <Grid container flexDirection="column">
              <Grid item mb={0.5}>
                <Typography className="file-name">{pdf?.fileName}</Typography>
                <Typography className="file-name">{pdf?.fileName}</Typography>
              </Grid>
              <Grid item>
                <Typography className="file-size">{pdf?.fileSize}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <CustomButton
          variant="outlined"
          startIcon={<img src={icons.clearIcon} />}
          className="remove-file"
          sx={{ color: '#f3617c' }}
          onClick={handleRemoveFile}
        >
          Remove
        </CustomButton>
      </Grid>
    </Grid>
  )
}
