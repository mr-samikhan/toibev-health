import { Grid, IconButton, Typography } from "@mui/material";
import icons from "../../../../assets";
import React from "react";

export function Actions() {
  return (
    <Grid container>
      <Grid item sx={{ marginRight: "8px", alignSelf: "center" }}>
        {" "}
        <Grid
          sx={{
            padding: "10px",
            background: "rgba(153, 153, 153, 0.08)",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "18px",
              color: "#474747",
            }}
          >
            224 Clicks
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton edge="end" aria-label="delete">
          <img src={icons.editIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
