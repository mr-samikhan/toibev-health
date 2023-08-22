import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { ReactComponent as CalenderIcon } from "../../assets/icons/calendar.svg";
import { styled } from "@mui/material/styles";

export const CustomIconButton = styled((props) => <IconButton {...props} />)(
  ({ theme }) => ({
    "&.MuiIconButton-root": {
      background: "rgba(242, 106, 71, 0.08)",
      borderRadius: "10px",
      marginRight: "8px",
      filter:
        "invert(50%) sepia(97%) saturate(1979%) hue-rotate(334deg) brightness(102%) contrast(90%)",
    },
    "& svg": {
      width: "16px",
      height: "16px",
    },
  })
);

const CustomTextField = styled((props) => <TextField focused {...props} />)(
  ({ theme }) => ({
    "&.MuiTextField-root": {
      "& input": {
        width: "unset",
        flexGrow: 1,
      },
      "& .MuiFormLabel-root": { color: "#000" },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #DCDCDC",
        borderRadius: "14px",
      },
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },
      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        // borderColor: theme.palette.primary.main,
        // borderWidth: "2px",
        border: "1px solid #DCDCDC",
        borderRadius: "14px",
      },
      "& fieldset": {
        padding: "0px 24px",
      },
      "& label": { left: "16px" },
      "& input": { paddingLeft: "24px" },
    },
  })
);

export default function CustomDatePicker({ date, setDate }) {
  const renderCustomInput = ({ ref }) => (
    <CustomTextField
      disabled
      id="outlined"
      label="Date"
      placeholder="Select date"
      inputRef={ref}
      value={date ? `${date.year}/${date.month}/${date.day}` : ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CustomIconButton>
              <CalenderIcon />
            </CustomIconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      inputPlaceholder="Select a day"
      shouldHighlightWeekends
      renderInput={renderCustomInput}
    />
  );
}
