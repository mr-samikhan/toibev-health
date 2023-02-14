import { Grid, IconButton } from "@mui/material";
import icons from "../../../../assets";
import React from "react";

export function Actions() {
  return (
    <Grid container>
      <Grid item>
        {" "}
        <IconButton edge="end" aria-label="delete">
          <img src={icons.editCalendarIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
