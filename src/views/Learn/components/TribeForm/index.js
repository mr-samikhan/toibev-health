import React from "react";
import { Grid, Typography, Box, Menu } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../components/CustomTextfield";
import { ReactComponent as PeopleIcon } from "../../../../assets/icons/people.svg";
import CustomButton from "../../../../components/CustomButton";
import useTribeForm from "../../hook/useTribeForm";
import icons from "../../../../assets/index";
import AlertDialog from "../../../../components/AlertDialog";
import CultureForm from "../Forms/CultureForm";
export default function TribeForm({ isEdit, data }) {
  const {
    control,
    handleSubmit,
    onSubmit,
    openCultureForm,
    setOpenCultureForm,
  } = useTribeForm({
    isEdit,
    data,
  });
  return (
    <>
      <AlertDialog
        title="Edit Culture 1"
        open={openCultureForm}
        setOpen={setOpenCultureForm}
        message={<CultureForm />}
      />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} mb={4} mt={2}>
            <Controller
              name="tribeName"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  label="Tribe Name"
                  placeholder="Tribe in title"
                  EndIcon={PeopleIcon}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} mb={isEdit && 2}>
            <CustomButton variant="contained" type="submit">
              Save Tribe
            </CustomButton>
          </Grid>
          {isEdit && (
            <Grid item xs={12}>
              <CustomButton variant="outlined" type="submit">
                Delete Tribe
              </CustomButton>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}
