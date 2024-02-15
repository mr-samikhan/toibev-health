import React, { useState } from 'react'
import { Grid, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
//imports
import icons from '../../assets/index'
import { CustomList } from '../../components/List'
import { Actions } from './components/ActionButtons'
import AlertDialog from '../../components/AlertDialog'
import AssessmentForm from './components/Forms/AssessmentForm'
import { useGetAssessments } from '../../hooks/useGetAssessments'

export function Assessment() {
  const [open, setOpen] = useState(false)
  const { assessments, isLoading, isFetching } = useGetAssessments({})
  const navigate = useNavigate()
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Add Assessment"
          setOpen={setOpen}
          message={
            <AssessmentForm setOpen={setOpen} assessments={assessments} />
          }
        />
      )}
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginBottom: '16px' }}
      >
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            className="contained-button"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {isLoading || isFetching ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <CustomList
          icon={icons.clipboardIcon}
          Actions={Actions}
          list={assessments}
          onRowClick={(row) => {
            navigate(`/assesment/${row.id}`, { state: row })
          }}
        />
      )}
    </>
  )
}
