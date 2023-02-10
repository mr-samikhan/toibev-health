import React from "react";
import { Grid, Avatar, Typography, IconButton } from "@mui/material";
import "./listItem.scss";

export function ListItem({ startIcon, title, endIcon }) {
  return (
    <Grid container className="list-item">
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        className="wrapper"
      >
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              {" "}
              <Avatar className="avatar">
                <img src={startIcon} />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography className="title">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton>
            <img src={endIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
