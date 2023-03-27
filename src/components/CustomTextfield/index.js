import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomIconButton = styled((props) => <IconButton {...props} />)(
  ({ theme }) => ({
    "&.MuiIconButton-root": {
      background: "rgba(242, 106, 71, 0.08)",
      borderRadius: "10px",
      marginRight: "8px",
    },
  })
);

const CustomTextField = styled((props) => <TextField focused {...props} />)(
  ({ theme }) => ({
    "&.MuiTextField-root": {
      "& .MuiFormLabel-root": { color: "#000" },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #DCDCDC",
        borderRadius: "14px",
      },
      // "& .MuiFormLabel-root.Mui-focused": {
      //   color: theme.palette.primary.main,
      // },
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
    },
  })
);

export default function CustomTextfield({ startIconPrimary, ...rest }) {
  return (
    <CustomTextField
      id="outlined"
      //   label={label}
      //   placeholder={placeholder}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CustomIconButton>{startIconPrimary}</CustomIconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}
