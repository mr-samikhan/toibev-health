import React from "react";
import { Box, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useConditionForm from "../../../hooks/useConditionForm";

export default function AddConditionForm(props) {
  const {
    control,
    handleSubmit,
    onSubmit,
    correctPercentageOptions,
    conditionType,
    isLoading,
    displayInfoOptions,
  } = useConditionForm(props);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="conditionType"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Correct %"
                placeholder="% Range"
                select
                options={correctPercentageOptions}
                {...field}
              />
            )}
          />
        </Grid>
        {conditionType === "range" ? (
          <Grid item container xs={12} mb={3} spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="startRange"
                control={control}
                render={({ field }) => (
                  <CustomTextfield
                    label="Start %"
                    placeholder="Eg. 10%"
                    {...field}
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
                    label="End %"
                    placeholder="Eg. 50%"
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        ) : conditionType === "lesser" ? (
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
          {" "}
          <Controller
            name="display"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Display"
                placeholder="Select Info to be display"
                select
                options={displayInfoOptions}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? "Loading" : "Save Condition"}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
