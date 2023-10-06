import React, { useState } from 'react'
import { Grid, IconButton } from '@mui/material'

//imports
import TribeForm from '../TribeForm'
import icons from '../../../../assets'
import LangugaeForm from '../Forms/LanguageForm'
import AlertDialog from '../../../../components/AlertDialog'
import ResiliencySubCatForm from '../Forms/ResiliencySubCatForm'

export function CultureActions({ data }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <AlertDialog
          title="Edit Culture"
          open={open}
          setOpen={setOpen}
          message={<TribeForm setOpen={setOpen} isEdit initialState={data} />}
        />
      )}
      <Grid container>
        <Grid item>
          <IconButton
            edge="end"
            onClick={(event) => {
              setOpen(true)
            }}
          >
            <img src={icons.editIcon} alt="edit-icon" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
export function LanguageActions({ data }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {open && (
        <AlertDialog
          title="Edit Language"
          open={open}
          setOpen={setOpen}
          message={
            // <LanguageDetailForm initialState={data} />
            <LangugaeForm initialState={data} isEdit setOpen={setOpen} />
          }
        />
      )}
      <Grid container>
        <Grid item>
          <IconButton
            edge="end"
            onClick={(event) => {
              setOpen(true)
            }}
          >
            <img src={icons.editIcon} alt="edit-icon" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
export function ResilienceySubCatActions({ data, cat }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {open && (
        <AlertDialog
          title="Edit History"
          open={open}
          setOpen={setOpen}
          message={
            <ResiliencySubCatForm
              isEdit
              cat={cat}
              setOpen={setOpen}
              initialState={data}
            />
          }
        />
      )}
      <Grid container>
        <Grid item>
          <IconButton
            edge="end"
            onClick={(event) => {
              setOpen(true)
            }}
          >
            <img src={icons.editIcon} alt="edit-icon" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
