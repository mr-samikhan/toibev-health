import React from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, IconButton, Typography, useMediaQuery } from '@mui/material'

import './style.scss'
import icons from '../../../../assets'
import EventForm from '../Forms/EventForm'
import useActionButtons from '../../hooks/useActionButtons'
import AlertDialog from '../../../../components/AlertDialog'
import CustomSwitchToggle from '../../../../components/CustomSwitchToggle'

export function Actions(props) {
  const { data, updateEventDoc } = props || {}
  const { open, setOpen } = useActionButtons()
  const mobile = useMediaQuery('(max-width: 600px)')

  const { pathname } = useLocation()

  let allClicks = data?.clicks === undefined ? 0 : data?.clicks
  const [eventStatus, setEventStatus] = React.useState(data?.isActive)

  const onUpdate = async () => {
    try {
      let updated = { ...data, isActive: !eventStatus }
      delete updated?.subtitle
      await updateEventDoc(updated)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title="Edit Event"
          message={
            <EventForm isEdit data={data} open={open} setOpen={setOpen} />
          }
        />
      )}

      <Grid container className="event-action-buttons">
        {pathname === '/home' && (
          <CustomSwitchToggle
            value={eventStatus || false}
            onChange={(e) => {
              setEventStatus(e.target.checked)
              onUpdate()
            }}
          />
        )}
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
