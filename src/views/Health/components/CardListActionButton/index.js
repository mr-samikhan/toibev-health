import React, { useState } from 'react'
import { IconButton } from '@mui/material'

//imports
import icons from '../../../../assets'
import { MedicationForm } from '../Forms/MedicationForm'
import { GroupSessionForm } from '../Forms/GroupSessionForm'
import AlertDialog from '../../../../components/AlertDialog'

export default function GroupSessionCardActionButton({ data }) {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Group Session"
          setOpen={setOpen}
          message={
            <GroupSessionForm setOpen={setOpen} initialState={data} isEdit />
          }
        />
      )}
      <IconButton onClick={handleClick}>
        <img src={icons.editIcon} alt="edit-icon" />
      </IconButton>
    </>
  )
}

export function MedicationCardActionButton({ data }) {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Medication"
          setOpen={setOpen}
          message={
            <MedicationForm setOpen={setOpen} initialState={data} isEdit />
          }
        />
      )}
      <IconButton onClick={handleClick}>
        <img src={icons.editIcon} alt="edit-icon" />
      </IconButton>
    </>
  )
}
