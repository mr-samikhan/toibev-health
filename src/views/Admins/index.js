import { Avatar, Grid, Typography, Button } from "@mui/material";
import React from "react";
import { Actions } from "./components/Actions";
import AddIcon from "@mui/icons-material/Add";
import "./style.scss";

export function Admins() {
  return (
    <>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginBottom: "16px" }}
      >
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            className="contained-button"
          >
            {" "}
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ overfloxX: "scroll" }}>
        <Grid
          container
          className="table-header"
          justifyContent="space-between"
          sx={{ flexWrap: "nowrap" }}
        >
          <Grid item className="item" xs={3} sx={{ minWidth: "200px" }}>
            <Typography sx={{ marginLeft: "76px" }}>Username</Typography>
          </Grid>
          <Grid item className="item" xs={3} sx={{ minWidth: "200px" }}>
            <Typography>Email Address</Typography>
          </Grid>
          <Grid item className="item" xs={3} sx={{ minWidth: "200px" }}>
            <Typography>Permission Level</Typography>
          </Grid>
          <Grid item className="item" xs={3} sx={{ minWidth: "200px" }}></Grid>
        </Grid>

        {[1, 2, 3, 4, 1, 2, 3, 12, 3].map(() => (
          <Grid container className="row">
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              className="wrapper"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item xs={3} sx={{ minWidth: "200px" }}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar className="avatar" />
                  </Grid>
                  <Grid item>
                    <Typography className="text">Chop Dawg</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3} sx={{ minWidth: "200px" }}>
                <Typography className="text">partner@chopdawg.com</Typography>
              </Grid>
              <Grid item xs={3} sx={{ minWidth: "200px" }}>
                <Typography className="text">Administrator</Typography>
              </Grid>

              <Grid item xs={3} sx={{ minWidth: "200px" }}>
                <Actions />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
