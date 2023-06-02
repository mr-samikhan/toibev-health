import React from "react";
import { Grid, Typography } from "@mui/material";
import { ReactComponent as CalenderIcon } from "../../../../assets/icons/calendar.svg";
import { ReactComponent as LocationIcon } from "../../../../assets/icons/location.svg";
import "./style.scss";

export const EventDetails = ({ data }) => {
  return (
    <Grid container className="event-details" mt={1}>
      <Grid container item xs={12} alignItems="center" mb={1}>
        <CalenderIcon className="--icon" />
        <Typography ml={1} className="--text">
          {data?.location}
        </Typography>
      </Grid>
      <Grid container item xs={12} alignItems="center">
        <LocationIcon className="--icon" />
        <Typography ml={1} className="--text">
          {data?.location}
        </Typography>
      </Grid>
    </Grid>
  );
};
