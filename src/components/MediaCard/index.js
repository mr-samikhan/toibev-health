import React from "react";
import { Grid, Typography } from "@mui/material";

export default function MediaCard({ icon, title, fileSize }) {
  return (
    <Grid
      container
      sx={{
        height: 210,
        background: "rgba(70, 141, 141, 0.08)",
        borderRadius: 2,
      }}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <Typography>{fileSize}</Typography>
      </Grid>
    </Grid>
  );
}
