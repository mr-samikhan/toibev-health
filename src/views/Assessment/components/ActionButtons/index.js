import React, { useState } from 'react'
import { Grid, IconButton } from '@mui/material'
import { useLocation } from 'react-router-dom'

//imports
import icons from '../../../../assets'
import useActions from '../../hooks/useActions'
import QuestionForm from '../Forms/QuestionForm'
import { firestore } from '../../../../firebase'
import AssessmentForm from '../Forms/AssessmentForm'
import { doc, updateDoc } from 'firebase/firestore'
import AddConditionForm from '../Forms/ConditionForm'
import AlertDialog from '../../../../components/AlertDialog'
import CustomSwitchToggle from '../../../../components/CustomSwitchToggle'

export function Actions({ data }) {
  const { open, setOpen } = useActions()

  const { pathname } = useLocation()

  const [eventStatus, setEventStatus] = React.useState(data?.isActive)

  const onUpdate = async () => {
    try {
      let updated = { ...data, isActive: !eventStatus }
      delete updated?.subtitle
      await updateDoc(doc(firestore, 'Assessments', data.id), updated)
      data = { ...data, isActive: !eventStatus }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Assessment"
          setOpen={setOpen}
          message={<AssessmentForm isEdit data={data} setOpen={setOpen} />}
        />
      )}
      <Grid container>
        <Grid item>
          {pathname === '/assesment' && (
            <CustomSwitchToggle
              value={eventStatus || false}
              onChange={(e) => {
                setEventStatus(e.target.checked)
                onUpdate()
              }}
            />
          )}
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => setOpen(true)}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}

export function SingleAssessmentActionButtons({ data, list }) {
  const [open, setOpen] = useState()

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Question"
          setOpen={setOpen}
          message={
            <QuestionForm isEdit initialState={data} setOpen={setOpen} />
          }
        />
      )}
      <Grid container>
        <Grid item>
          {' '}
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => setOpen(true)}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}

export function ConditionActionButtons({ data, list }) {
  const [open, setOpen] = useState()

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Question"
          setOpen={setOpen}
          message={
            <AddConditionForm isEdit initialState={data} setOpen={setOpen} />
          }
        />
      )}
      <Grid container>
        <Grid item>
          {' '}
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => setOpen(true)}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
