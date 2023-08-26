import React from "react";
import { TextField, IconButton, Typography, Grid } from "@mui/material";
import { ReactComponent as CalenderIcon } from "../../assets/icons/calendar.svg";
import "./datepicker.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as DatePick } from "@mui/x-date-pickers/DatePicker";

export function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePick label="Basic date picker" autoFocus={true} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export function DatePicker() {
  return (
    <Grid container alignItems="center" spacing={2} className="date-picker">
      <Grid item>
        {" "}
        <Typography className="label">Date Range</Typography>
      </Grid>
      <Grid item>
        <TextField
          value="16 July, 2022 - 30 July 2022"
          className="date-picker-field"
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{
                  marginRight: "8px",
                  borderRadius: "6px",
                  background: (theme) => theme.palette.primary.main,
                  "&:hover": {
                    opacity: "0.9",
                    background: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <CalenderIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
