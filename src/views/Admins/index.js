import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { CircularProgress } from '@mui/material'
import AdminsTable from './components/AdmimsTable'
import { Grid, Button, useMediaQuery } from '@mui/material'

//imports
import './style.scss'
import AlertDialog from '../../components/AlertDialog'
import { useGetAdmins } from '../../hooks/useGetAdmins'
import AddAdminForm from './components/Forms/AddAdminForm'

export function Admins() {
  const matches = useMediaQuery('(max-width: 600px)')

  const [open, setOpen] = useState(false)
  const { admins, isLoading, isFetching } = useGetAdmins({})

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title="Add Admin"
          message={<AddAdminForm setOpen={setOpen} />}
        />
      )}
      <Grid
        container
        alignItems="center"
        justifyContent="flex-end"
        sx={{ marginBottom: '16px' }}
      >
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            className={matches ? 'contained-icon-button' : 'contained-button'}
          >
            {!matches && 'Add'}
          </Button>
        </Grid>
      </Grid>
      {isLoading || isFetching ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <AdminsTable admins={admins} />
      )}
    </>
  )
}
