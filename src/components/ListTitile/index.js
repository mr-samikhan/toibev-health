import React from "react";
import { Grid, Avatar, Typography } from "@mui/material";
import "./style.scss";

export function ListTitle({ title, icon }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        {" "}
        <Avatar className="avatar" sx={{ background: "#3b7d7d14 !important" }}>
          <img src={icon} />
        </Avatar>
      </Grid>
      <Grid item>
        <Typography className="title">{title}</Typography>
      </Grid>
    </Grid>
  );
}
