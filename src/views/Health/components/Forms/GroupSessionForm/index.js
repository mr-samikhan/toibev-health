import React, { useState, useRef } from "react";
import {
  Grid,
  Typography,
  Box,
  Menu,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Controller } from "react-hook-form";
import CustomTextfield from "../../../../../components/CustomTextfield";
import CustomButton from "../../../../../components/CustomButton";
import useGroupSessionForm from "../../../hooks/useGroupSessionForm";
import { BasicDatePicker } from "../../../../../components/DatePicker";
import { ReactComponent as CalenderIcon } from "../../../../../assets/icons/calendar.svg";
import { ReactComponent as ClockIcon } from "../../../../../assets/icons/clock.svg";
import DatePicker from "../../../../../components/CustomDatePicker";

export const GroupSessionForm = (props) => {
  const {
    onSubmit,
    handleSubmit,
    control,
    isEdit,
    isLoading,
    onDelete,
    isLoadingDelete,
    date,
    setDate,
  } = useGroupSessionForm(props);

  const timeInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    setIsOpen(true);
    timeInputRef.current.focus();
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Group Session Name"
                placeholder="Enter Group Session Name"
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
          {" "}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Location"
                placeholder="Enter Location"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          {" "}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CustomTextfield
                label="Description"
                placeholder="Enter short bio"
                multiline
                rows={4}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            {isLoading ? "Adding..." : "Add Group Session"}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12} mt={3}>
            <CustomButton variant="outlined" onClick={onDelete}>
              {isLoadingDelete ? "Deleting..." : "Delete Group Session"}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
