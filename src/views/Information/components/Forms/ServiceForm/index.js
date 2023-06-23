import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useServiceForm from "../../../hooks/useServiceForm";
import ImageUploader from "../../../../../components/MediaUpload";
import InputList from "../../../../../components/InputList";
import { ReactComponent as AchievementIcon } from "../../../../../assets/icons/achievement.svg";
import { ReactComponent as ClipboardIcon } from "../../../../../assets/icons/clipboard.svg";
import { ReactComponent as ServiceIcon } from "../../../../../assets/icons/heart-edit.svg";
import { ReactComponent as StartIcon } from "../../../../../assets/icons/ranking.svg";

export default function ServiceForm({
  initialState,
  isEdit,
  setOpen,
  clinics,
}) {
  const {
    errors,
    handleSubmit,
    onSubmit,
    control,
    isLoading,
    setSelectedImageOne,
    setSelectedImageTwo,
    selectedImageOne,
    selectedImageTwo,
    acheivements,
    setAcheivements,
    services,
    setServices,
    mutateDelete,
    isLoadingDelete,
    clinicOptions,
  } = useServiceForm({ initialState, isEdit, setOpen, clinics });
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="title"
            control={control}
            rules={{ required: "Service name is required" }}
            render={({ field }) => (
              <CustomTextfield
                label="Service Name"
                placeholder="Enter service name"
                error={errors.serviceName}
                errorMessage={errors?.serviceName?.message}
                EndIcon={ServiceIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="clinic"
            control={control}
            rules={{ required: "Clinic is required" }}
            render={({ field }) => (
              <CustomTextfield
                label="Select Clinic"
                placeholder="Select Clinic"
                error={errors.clinic}
                errorMessage={errors?.clinic?.message}
                select
                options={clinicOptions}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="who_we_are"
            control={control}
            rules={{ required: "Field is required" }}
            render={({ field }) => (
              <CustomTextfield
                multiline={true}
                rows={7}
                label="Who we are"
                placeholder="Enter short bio"
                error={errors.bio}
                errorMessage={errors?.bio?.message}
                EndIcon={ClipboardIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <InputList
            label="Our Awards and Acheivements"
            placeholder={"Enter list of achievements (press enter after each)"}
            Icon={AchievementIcon}
            list={acheivements}
            setList={setAcheivements}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <InputList
            label="What we offer"
            placeholder="Enter list of services offered (press enter after each)"
            Icon={StartIcon}
            list={services}
            setList={setServices}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Typography variant="h6" mb={2}>
            Add Photos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ImageUploader
                fileType="image"
                selectedFile={selectedImageOne}
                setSelectedFile={setSelectedImageOne}
              />
            </Grid>
            <Grid item xs={6}>
              <ImageUploader
                fileType="image"
                selectedFile={selectedImageTwo}
                setSelectedFile={setSelectedImageTwo}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mb={2}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? "Loading" : isEdit ? "Edit Service" : "Add Service"}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton
              variant="outlined"
              onClick={() => mutateDelete(initialState?.id)}
            >
              {isLoadingDelete ? "Loading" : "Delete Service"}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
