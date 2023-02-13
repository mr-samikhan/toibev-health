import { IconButton, Grid } from "@mui/material";
import React from "react";
import icons from "../../../../assets";

export function Actions() {
  return (
    <Grid container justifyContent="flex-end">
      {" "}
      <Grid item sx={{ paddingTop: "0px" }}>
        <IconButton>
          <img src={icons.editIcon} />
        </IconButton>
      </Grid>
      <Grid item sx={{ paddingTop: "0px" }}>
        <IconButton>
          <img src={icons.deleteIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
