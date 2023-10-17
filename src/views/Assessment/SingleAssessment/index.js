import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Grid, Typography } from '@mui/material'
//imports
import { CustomList } from '../../../components/List'
import AlertDialog from '../../../components/AlertDialog'
import QuestionForm from '../components/Forms/QuestionForm'
import ConditionForm from '../components/Forms/ConditionForm'
import useSingleAssessment from '../hooks/useSingleAssessment'
import { SingleAssessmentActionButtons } from '../components/ActionButtons'

export default function SingleAssessment() {
  const {
    questions,
    isLoading,
    isFetching,
    // conditions,
    openQusetion,
    openCondition,
    setOpenQuestion,
    setOpenCondition,
    isLoadingConditions,
    isFetchingConditions,
  } = useSingleAssessment({})

  if (isLoading || isFetching || isFetchingConditions || isLoadingConditions)
    return <div>Loading...</div>

  return (
    <>
      {openQusetion && (
        <AlertDialog
          open={openQusetion}
          setOpen={setOpenQuestion}
          title="Add Question"
          message={
            <QuestionForm
              setOpen={setOpenQuestion}
              // allQuestions={assessment.questions}
            />
          }
        />
      )}
      {openCondition && (
        <AlertDialog
          open={openCondition}
          setOpen={setOpenCondition}
          title="Add Condition"
          message={<ConditionForm setOpen={setOpenCondition} />}
        />
      )}

      <Grid container flexDirection="column">
        <Grid item>
          <Grid container mb={1}>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography fontWeight={500} fontSize="20px">
                  Question
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="contained-button"
                  onClick={() => setOpenQuestion(true)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CustomList
              indexed
              isDragDisabled
              list={questions ?? []}
              Actions={SingleAssessmentActionButtons}
            />
          </Grid>
        </Grid>
        {/* <Grid item>
          <Grid container mb={1}>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography fontWeight={500} fontSize="20px">
                  Condition
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="contained-button"
                  onClick={() => setOpenCondition(true)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CustomList
              indexed
              list={conditions ?? []}
              Actions={ConditionActionButtons}
            />
          </Grid>
        </Grid> */}
      </Grid>
    </>
  )
}
