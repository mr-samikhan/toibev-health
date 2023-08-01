import React from "react";
import { Grid, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../components/CustomTextfield";
import { ReactComponent as PeopleIcon } from "../../../../assets/icons/people.svg";
import CustomButton from "../../../../components/CustomButton";
import useTribeForm from "../../hook/useTribeForm";
import AlertDialog from "../../../../components/AlertDialog";
import CultureForm from "../Forms/CultureForm";

export default function TribeForm({ isEdit, initialState, setOpen }) {
  const {
    control,
    handleSubmit,
    onSubmit,
    openCultureForm,
    setOpenCultureForm,
    isLoading,
    handleDelete,
    isLoadingDelete,
    selectedImage,
    setSelectedImage,
    onSubmitCulture,
    description,
    setDescription,
  } = useTribeForm({
    isEdit,
    initialState,
    setOpen,
  });

  return (
    <>
      {openCultureForm && (
        <AlertDialog
          title="Add Culture"
          open={openCultureForm}
          setOpen={setOpenCultureForm}
          message={
            <CultureForm
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              onSubmit={onSubmitCulture}
              description={description}
              setDescription={setDescription}
            />
          }
        />
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} mb={4} mt={2}>
            <Controller
              name="title"
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
              {isLoading ? "Saving..." : "Save Tribe"}
            </CustomButton>
          </Grid>
          {isEdit && (
            <Grid item xs={12}>
              <CustomButton variant="outlined" onClick={handleDelete}>
                {isLoadingDelete ? "Deleting..." : "Delete Tribe"}
              </CustomButton>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}
