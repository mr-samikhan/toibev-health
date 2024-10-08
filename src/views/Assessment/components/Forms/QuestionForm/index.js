import React from 'react'
import { Controller } from 'react-hook-form'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { Grid, Button, IconButton, Typography, Box } from '@mui/material'
//imports
import useQuestionForm from '../../../hooks/useQuestionForm'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as NotesIcon } from '../../../../../assets/icons/assesments.svg'

const Actions = ({ handleCheck, handleRemove, idx, checked }) => {
  return (
    <Grid container flexWrap="nowrap">
      <Grid item mr={1}>
        <IconButton
          onClick={() => handleCheck(idx)}
          sx={{
            borderRadius: '10px',
            background: !checked ? 'rgba(153, 153, 153, 0.08)' : '#5ED87B',
          }}
        >
          <CheckIcon sx={{ color: checked ? '#fff' : '#6F6F6F' }} />
        </IconButton>
      </Grid>
      <Grid item mr={1}>
        <Button
          variant="contained"
          startIcon={<ClearIcon />}
          onClick={() => handleRemove(idx)}
          sx={{
            background: 'rgba(243, 97, 124, 0.1)',
            color: 'rgba(243, 97, 124, 1)',
            boxShadow: 'none',
            borderRadius: '10px',
          }}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  )
}

export default function QuestionForm({ setOpen, initialState, isEdit }) {
  const {
    errors,
    control,
    answers,
    onSubmit,
    isLoading,
    handleCheck,
    handleRemove,
    handleSubmit,
    handleAddAnswer,
    handleChangeAnswer,
  } = useQuestionForm({ setOpen, initialState, isEdit })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="question"
            control={control}
            rules={{ required: 'Field is Required' }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Question"
                EndIcon={NotesIcon}
                error={errors?.question}
                placeholder="Enter Question"
                errorMessage={errors?.question?.message}
              />
            )}
          />
        </Grid>
        <Grid item container>
          <Typography sx={{ color: '#525252', fontSize: '14px' }} mb={3}>
            * Tick the checkbox next to answer(s) if they are correct
          </Typography>
          {answers.map(({ checked, value }, idx) => (
            <Grid item xs={12} mb={4}>
              <CustomTextfield
                label="Answer"
                noBackground
                value={value}
                placeholder="Enter Answer"
                onChange={(event) =>
                  handleChangeAnswer(idx, event.target.value)
                }
                EndIconPrimary={() =>
                  Actions({ handleRemove, handleCheck, checked, idx })
                }
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} mb={2}>
          <CustomButton variant="contained" onClick={handleAddAnswer}>
            Add Answer
          </CustomButton>
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="outlined" type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Question'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
