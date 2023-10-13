import React from 'react'
import { Box, Grid } from '@mui/material'
import { Controller } from 'react-hook-form'
//imports
import useConditionForm from '../../../hooks/useConditionForm'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'

export default function AddConditionForm(props) {
  const {
    control,
    onSubmit,
    isLoading,
    handleSubmit,
    conditionType,
    displayInfoOptions,
    correctPercentageOptions,
  } = useConditionForm(props)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="conditionType"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                select
                {...field}
                label="Correct %"
                placeholder="% Range"
                options={correctPercentageOptions}
              />
            )}
          />
        </Grid>
        {conditionType === 'range' ? (
          <Grid item container xs={12} mb={3} spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="startRange"
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    {...field}
                    label="Start %"
                    placeholder="Eg. 10%"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="endRange"
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    {...field}
                    label="End %"
                    placeholder="Eg. 50%"
                  />
                )}
              />
            </Grid>
          </Grid>
        ) : conditionType === 'lesser' ? (
          <Grid item xs={12} mb={3}>
            <Controller
              name="lesserThan"
              control={control}
              render={({ field }) => (
                <CustomTextfield label="%" placeholder="Eg. 10%" {...field} />
              )}
            />
          </Grid>
        ) : (
          <Grid item xs={12} mb={3}>
            <Controller
              name="greaterThan"
              control={control}
              render={({ field }) => (
                <CustomTextfield label="%" placeholder="Eg. 10%" {...field} />
              )}
            />
          </Grid>
        )}
        <Grid item xs={12} mb={3}>
          {' '}
          <Controller
            name="display"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                select
                {...field}
                label="Display"
                options={displayInfoOptions}
                placeholder="Select Info to be display"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? 'Loading...' : 'Save Condition'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
