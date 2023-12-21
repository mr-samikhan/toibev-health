import { Typography } from '@mui/material'
import React from 'react'
import { Grid, Box } from '@mui/material'

//imports
import useDeleteAdmin from '../../../hooks/useDeleteAdmin'
import CustomButton from '../../../../../components/CustomButton'

export default function DeleteAdminForm({ data, setShowAlert }) {
  const { handleSubmit, onSubmit, isLoading } = useDeleteAdmin({
    data,
    setShowAlert,
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Typography>Are you sure you want to delete admin?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Delete'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
