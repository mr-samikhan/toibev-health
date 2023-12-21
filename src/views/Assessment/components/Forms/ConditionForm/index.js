import React from 'react'
import { Box, Grid } from '@mui/material'
import { Controller } from 'react-hook-form'
//imports
import useConditionForm from '../../../hooks/useConditionForm'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'

export default function AddConditionForm(props) {
  const {
    errors,
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
            rules={{
              required: 'Condition Type is Required',
            }}
            name="conditionType"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                select
                {...field}
                label="Correct %"
                placeholder="% Range"
                options={correctPercentageOptions}
                error={errors?.conditionType?.message}
                errorMessage={errors?.conditionType?.message}
              />
            )}
          />
        </Grid>
        {conditionType === 'range' ? (
          <Grid item container xs={12} mb={3} spacing={2}>
            <Grid item xs={6}>
              <Controller
                rules={{
                  required: 'Start Range is Required',
                }}
                name="startRange"
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    {...field}
                    label="Start %"
                    placeholder="Eg. 10%"
                    error={errors?.startRange?.message}
                    errorMessage={errors?.startRange?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                rules={{
                  required: 'End Range is Required',
                }}
                name="endRange"
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    {...field}
                    label="End %"
                    placeholder="Eg. 50%"
                    errorMessage={errors?.endRange?.message}
                    error={errors?.endRange?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        ) : conditionType === 'lesser' ? (
          <Grid item xs={12} mb={3}>
            <Controller
              rules={{
                required: 'Field is Required',
              }}
              name="lesserThan"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  label="%"
                  {...field}
                  placeholder="Eg. 10%"
                  error={errors?.lesserThan?.message}
                  errorMessage={errors?.lesserThan?.message}
                />
              )}
            />
          </Grid>
        ) : (
          <Grid item xs={12} mb={3}>
            <Controller
              rules={{
                required: 'Field is Required',
              }}
              name="greaterThan"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  label="%"
                  {...field}
                  placeholder="Eg. 10%"
                  error={errors?.greaterThan?.message}
                  errorMessage={errors?.greaterThan?.message}
                />
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
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save Condition'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
