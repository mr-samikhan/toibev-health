import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function CustomRadioGroup({ title, options, value, onChange }) {
  return (
    <FormControl>
      <FormLabel
        id="row-radio-buttons-group-label"
        sx={{
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "21px",
          color: "#000000",
          "&.Mui-focused": {
            color: "#000000",
          },
        }}
      >
        {" "}
        {title}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <FormControlLabel
            value={item?.value}
            control={<Radio />}
            label={item?.label}
            sx={{
              "&.MuiFormControlLabel-root": {
                marginRight: 5,
              },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
