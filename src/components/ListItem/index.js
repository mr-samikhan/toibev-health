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
        flexWrap={"nowrap"}
      >
        <Grid item xs={10}>
          <Grid container spacing={2} alignItems="center" flexWrap={"nowrap"}>
            <Grid item>
              {" "}
              <Avatar className="avatar">
                <img src={startIcon} />
              </Avatar>
            </Grid>
            <Grid item flexGrow={1} sx={{ overflow: "hidden" }}>
              <Typography className="title">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <img src={endIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
