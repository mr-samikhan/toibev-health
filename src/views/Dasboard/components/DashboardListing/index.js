import React from "react";
import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";
import MedicineIcon from "../../../../assets/icons/medicine.svg";

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
                  src={image ?? ""}
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

export default function DashboardListing({ list, tabs, listing, isLoading }) {
  return (
    <Grid className="card">
      <Grid container mb={2} px={3}>
        {tabs}
      </Grid>
      {listing !== "surveys" ? (
        <Grid container className="dashboard-listing">
          {isLoading
            ? "Loading"
            : list?.map((item, index) => (
                <Grid item xs={12} className="dashboard-list-item" key={index}>
                  <ListItem item={item} listing={listing} />
                </Grid>
              ))}
        </Grid>
      ) : (
        <Grid container justifyContent={"center"} className="dashboard-listing">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid
              item
              xs={11}
              container
              columnSpacing={2}
              rowSpacing={2}
              mt={1}
              overflowY={"scroll"}
              sx={{ maxHeight: "240px" }}
            >
              {list?.map((item, index) => (
                <Grid item xs={12} sm={list?.length > 2 ? 6 : 12}>
                  <Grid container p={2} className="survey-card">
                    <Grid item>
                      <Grid container className="icon-container">
                        <Avatar
                          variant="square"
                          className="icon"
                          src={MedicineIcon}
                          sx={{ borderRadius: "0px" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item flexGrow={1} ml={2}>
                      <Grid
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography className="title">{"351"}</Typography>
                        <Typography className="count">{item?.text}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>{" "}
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}
