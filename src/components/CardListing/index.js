import React from "react";
import { Avatar, Grid, Typography, IconButton } from "@mui/material";
import icons from "../../assets";
import "./style.scss";

export default function CardListing({ list, CardActionButton }) {
  return (
    <Grid container className="card-listing">
      {list?.map((item, index) => (
        <Grid item xs={12} className="card-list-item" key={index}>
          <ListItem item={item} CardActionButton={CardActionButton} />
        </Grid>
      ))}
    </Grid>
  );
}

const ListItem = ({ item, CardActionButton }) => {
  const { icon, title } = item;
  return (
    <>
      <Grid container justifyContent="space-between" alignItems={"center"}>
        <Grid item>
          <Grid container alignItems={"center"} columnGap={1}>
            <Grid item>
              <Grid container className="icon-container">
                <Avatar variant="square" src={icon} className="icon" />
              </Grid>
            </Grid>
            <Grid item>
              <Typography className="title">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="list-action">
          <CardActionButton data={item} />
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} my={2}>
        <Grid item xs={9} className="item-divider"></Grid>
      </Grid>
    </>
  );
};
