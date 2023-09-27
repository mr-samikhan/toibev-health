import React from 'react'
import { Grid, IconButton, Typography, useMediaQuery } from '@mui/material'

import './style.scss'
import icons from '../../../../assets'
import EventForm from '../Forms/EventForm'
import useActionButtons from '../../hooks/useActionButtons'
import AlertDialog from '../../../../components/AlertDialog'

export function Actions(data) {
  const { open, setOpen } = useActionButtons()
  const mobile = useMediaQuery('(max-width: 600px)')

  let allClicks = data?.data?.clicks === undefined ? 0 : data?.data?.clicks
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title="Edit Event"
          message={
            <EventForm isEdit data={data.data} open={open} setOpen={setOpen} />
          }
        />
      )}

      <Grid container className="event-action-buttons">
        <Grid item sx={{ marginRight: '8px', alignSelf: 'center' }}>
          <Grid
            className="clicks-count-container"
            onClick={() => mobile && setOpen(true)}
          >
            <Typography className="clicks-count">{`${allClicks} Clicks`}</Typography>
          </Grid>
        </Grid>
        {!mobile && (
          <Grid item>
            <IconButton edge="end" onClick={() => setOpen(true)}>
              <img src={icons.editIcon} alt="edit-icon" />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  )
}
