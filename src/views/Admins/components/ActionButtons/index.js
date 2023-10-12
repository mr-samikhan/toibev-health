import React, { useState } from 'react'
import { IconButton, Grid } from '@mui/material'

//imports
import icons from '../../../../assets'
import AddAdminForm from '../Forms/AddAdminForm'
import DeleteAdminForm from '../Forms/DeleteAdminForm'
import AlertDialog from '../../../../components/AlertDialog'

export function Actions({ data, admins }) {
  const [open, setOpen] = useState(false)

  const [openDeleteAdminForm, setOpenDeleteAdminForm] = useState(false)

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Manage Admin"
          setOpen={setOpen}
          message={
            <AddAdminForm
              isEdit
              data={data}
              admins={admins}
              setOpen={setOpen}
            />
          }
        />
      )}
      {openDeleteAdminForm && (
        <AlertDialog
          maxWidth="xs"
          title="Delete Admin"
          open={openDeleteAdminForm}
          setOpen={setOpenDeleteAdminForm}
          message={<DeleteAdminForm data={data} />}
        />
      )}
      <Grid container justifyContent="flex-end">
        <Grid item sx={{ paddingTop: '0px' }}>
          <IconButton onClick={() => setOpen(true)}>
            <img src={icons.editIcon} alt="edit-icon" />
          </IconButton>
        </Grid>
        <Grid item sx={{ paddingTop: '0px' }}>
          <IconButton onClick={() => setOpenDeleteAdminForm(true)}>
            <img src={icons.deleteIcon} alt="delete-icon" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
