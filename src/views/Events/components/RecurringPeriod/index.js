import React, { useState, useRef } from "react";
import { IconButton, Typography, Grid, Button } from "@mui/material";

import "./style.scss";
import CustomButton from "../../../../components/CustomButton";

const RecurringPeriod = ({
  label = "",
  selected,
  onChange,
  recurrenceOptions,
}) => {
  return (
    <fieldset className="field-set">
      <legend>{label}</legend>
      {recurrenceOptions.map((item, index) => (
        <Button
          variant="contained"
          key={index}
          onClick={() => onChange(item)}
          sx={{
            backgroundColor:
              selected?.label === item.label
                ? "#468D8D"
                : "rgba(153, 153, 153, 0.08)",

            boxShadow: "none",
            borderRadius: "10px",
            textTransform: "none",
            marginRight: "12px",
            marginBottom: "12px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "18px",
            color: selected?.label === item.label ? "#fff" : "#474747",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#468D8D",
              color: "#fff",
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </fieldset>
  );
};

export default RecurringPeriod;
