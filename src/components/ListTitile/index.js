import React from "react";
import { Grid, Avatar, Typography } from "@mui/material";
import "./style.scss";

export function ListTitle({ title, icon }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        {" "}
        <Avatar className="avatar">
          <img src={icon} />
        </Avatar>
      </Grid>
      <Grid item>
        <Typography className="title">{title}</Typography>
      </Grid>
    </Grid>
  );
}
