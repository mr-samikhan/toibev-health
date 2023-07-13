import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";

export const ListItem = ({ item }) => {
  const { img, title, count } = item;
  return (
    <>
      <Grid container justifyContent="space-between" alignItems={"center"}>
        <Grid item>
          <Grid container alignItems={"center"} columnGap={1}>
            <Grid item>
              <Grid container className="icon-container">
                <Avatar variant="square" src={img} className="icon" />
              </Grid>
            </Grid>
            <Grid item>
              <Typography className="title">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className="count">{count}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} my={2}>
        <Grid item xs={9} className="item-divider"></Grid>
      </Grid>
    </>
  );
};

export default function DashboardListing({ list, tabs }) {
  return (
    <Grid className="card">
      <Grid container className="dashboard-listing">
        <Grid item xs={12} mb={2}>
          {tabs}
        </Grid>

        {list.map((item, index) => (
          <Grid item xs={12} className="dashboard-list-item" key={index}>
            <ListItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
