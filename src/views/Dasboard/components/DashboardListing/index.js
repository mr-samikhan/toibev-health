import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";

export const ListItem = ({ item, listing }) => {
  const { image, title, clicks } = item;
  return (
    <>
      <Grid container justifyContent="space-between" alignItems={"center"}>
        <Grid item xs={8}>
          <Grid
            container
            alignItems={"center"}
            columnGap={1}
            flexWrap={"nowrap"}
          >
            <Grid item>
              <Grid container className="icon-container">
                <Avatar
                  variant="square"
                  src={image}
                  className={listing === "events" ? "image-icon" : "icon"}
                />
              </Grid>
            </Grid>
            <Grid item sx={{ overflow: "hidden" }}>
              <Typography className="title">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography className="count">
            {clicks ? `${clicks} clicks` : "123 clicks"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} my={2}>
        <Grid item xs={9} className="item-divider"></Grid>
      </Grid>
    </>
  );
};

export default function DashboardListing({ list, tabs, listing }) {
  return (
    <Grid className="card">
      <Grid container mb={2} px={3}>
        {tabs}
      </Grid>
      {listing !== "surveys" ? (
        <Grid container className="dashboard-listing">
          {list?.map((item, index) => (
            <Grid item xs={12} className="dashboard-list-item" key={index}>
              <ListItem item={item} listing={listing} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          justifyContent={"center"}
          columnSpacing={2}
          rowSpacing={2}
          mt={1}
        >
          {[1, 2, 3, 4].map((item, index) => (
            <Grid item xs={5}>
              <Grid container p={2} className="survey-card">
                <Grid item>
                  <Grid container className="icon-container">
                    <Avatar variant="square" className="icon" src={""} />
                  </Grid>
                </Grid>
                <Grid item flexGrow={1} ml={2}>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography className="title">{"351"}</Typography>
                    <Typography className="count">{"0% - 40%"}</Typography>
                  </Grid>
                </Grid>
              </Grid>{" "}
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}
