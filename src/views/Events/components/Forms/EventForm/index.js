import React from "react";
import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import ImageUploader from "../../../../../components/MediaUpload";
import { ReactComponent as Clipboard } from "../../../../../assets/icons/clipboard.svg";
import { ReactComponent as LocationIcon } from "../../../../../assets/icons/location.svg";
import { ReactComponent as TaskIcon } from "../../../../../assets/icons/task.svg";
import { ReactComponent as LinkIcon } from "../../../../../assets/icons/link.svg";
import useEventForm from "../../../hooks/useEventForm";
import RecurringPeriod from "../../RecurringPeriod";
import CustomSwitch from "../../../../../components/CustomSwitch";
import DatePicker from "../../../../../components/CustomDatePicker";

export default function EventForm({ isEdit, data, open, setOpen }) {
  const {
    errors,
    handleSubmit,
    onSubmit,
    control,
    setSelectedImage,
    setSelectedVideo,
    selectedImage,
    selectedVideo,
    recurrenceOptions,
    selectedPdf,
    setSelectedPdf,
    setIsRecurring,
    isRecurring,
    isLoading,
    mutateDelete,
    isLoadingDelete,
    date,
    setDate,
    weekdays,
    recurrence,
    frequency,
    onChecked,
  } = useEventForm({ initialState: data, open, setOpen, isEdit });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="clinic-form"
    >
      <Grid container>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <CustomTextfield
                label="Title"
                placeholder="Enter title of event"
                error={errors.title}
                errorMessage={errors?.title?.message}
                EndIcon={Clipboard}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="location"
            control={control}
            rules={{ required: "Field is required" }}
            render={({ field }) => (
              <CustomTextfield
                label="Where"
                placeholder="Enter Location of event"
                error={errors.where}
                errorMessage={errors?.where?.message}
                EndIcon={LocationIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={6} mb={3}>
            {" "}
            <DatePicker date={date} setDate={setDate} />
          </Grid>

          <Grid item xs={6} mb={3}>
            {" "}
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <CustomTextfield
                  type="time"
                  label="Time"
                  placeholder="Enter Time"
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} mb={3}>
          <CustomSwitch
            label="Recurring Event"
            value={isRecurring}
            checked={isRecurring}
            defaultChecked={!!isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
        </Grid>
        {isRecurring && (
          <Grid item xs={12} mb={3}>
            <Controller
              name="recurrence"
              control={control}
              rules={{ required: "Field is required" }}
              render={({ field: { value, onChange } }) => (
                <RecurringPeriod
                  label="Select Period"
                  selected={value}
                  onChange={(e) => onChange(e)}
                  recurrenceOptions={recurrenceOptions}
                />
              )}
            />
          </Grid>
        )}
        {recurrence?.value === "custom" && (
          <>
            <Grid item xs={12} mb={3}>
              <Controller
                name="frequency"
                control={control}
                rules={{ required: "Field is required" }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextfield
                    select
                    options={[{ label: "Weekly", value: "weekly" }]}
                    label="Frequency"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={3}>
              <Controller
                name="period"
                control={control}
                rules={{ required: "Field is required" }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextfield
                    select
                    disabled={!frequency}
                    options={[{ label: "4 Weeks", value: "4weeks" }]}
                    label="Period"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid
              container
              p={2}
              mb={3}
              sx={{ border: "1px solid #DCDCDC", borderRadius: "16px" }}
            >
              {weekdays?.map((day, index) => (
                <Grid xs={12} item>
                  <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Grid item>
                      <Typography>{day?.label}</Typography>
                    </Grid>
                    <Grid item>
                      <Checkbox
                        sx={{
                          color: "#71757B",
                          borderRadius: 3,
                        }}
                        checked={day?.checked}
                        onChange={(e) => onChecked(e, index)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="description"
            control={control}
            rules={{ required: "Field is required" }}
            render={({ field }) => (
              <CustomTextfield
                multiline={true}
                rows={4}
                label="Details"
                placeholder="Type details of event"
                error={errors.details}
                errorMessage={errors?.details?.message}
                EndIcon={TaskIcon}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="webLink"
            control={control}
            rules={{ required: "Field is required" }}
            render={({ field }) => (
              <CustomTextfield
                label="Web link"
                placeholder="Enter Webex link"
                error={errors.webLink}
                errorMessage={errors?.webLink?.message}
                EndIcon={LinkIcon}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={6}>
              <ImageUploader
                title="Video"
                fileType="video"
                selectedFile={selectedVideo}
                setSelectedFile={setSelectedVideo}
              />
            </Grid>
            <Grid item xs={4} sm={6}>
              <ImageUploader
                title="Photo"
                fileType="image"
                selectedFile={selectedImage}
                setSelectedFile={setSelectedImage}
              />
            </Grid>
            <Grid item xs={4} sm={6}>
              <ImageUploader
                title="PDF"
                fileType="pdf"
                selectedFile={selectedPdf}
                setSelectedFile={setSelectedPdf}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mb={2}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? "Loading" : isEdit ? "Edit Event" : "Add Event"}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12}>
            <CustomButton
              variant="outlined"
              onClick={() => mutateDelete(data?.id)}
            >
              {isLoadingDelete ? "Loading" : "Delete Event"}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
