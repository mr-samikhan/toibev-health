import React from "react";
import {
  Avatar,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Actions } from "../Actions";

function SingleAdminSmall({
  name = "Chop Dawg",
  email = "partner@chopdawg.com",
  level = "Moderator",
}) {
  return (
    <Grid container className="row">
      <Grid item xs={12} className="wrapper">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Avatar className="avatar-small" variant="square" />
              </Grid>
              <Grid item>
                <Typography className="text-small">{name}</Typography>
                <Typography className="email-small">{email}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item mb={1}>
            <Actions />
          </Grid>
        </Grid>
        <Divider className="divider" />
        <Grid item ml={6} mt={1}>
          <Typography className="level">
            Permission Level:{" "}
            <Typography
              component={"span"}
              sx={{ color: "#000 !important" }}
              className="level"
            >
              {level}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

function SingleAdmin({
  name = "Chop Dawg",
  email = "partner@chopdawg.com",
  level = "Moderator",
}) {
  return (
    <Grid container className="row" sx={{ minWidth: "1105px" }}>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        className="wrapper"
        sx={{ flexWrap: "nowrap" }}
      >
        <Grid
          item
          sm={3}
          sx={{
            minWidth: "200px",
          }}
        >
          <Grid container alignItems="center">
            <Grid item>
              <Avatar className={"avatar"} />
            </Grid>
            <Grid item>
              <Typography className={"text"}>{name}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sm={3}
          sx={{
            minWidth: "200px",
          }}
        >
          <Typography className="text">{email}</Typography>
        </Grid>
        <Grid
          item
          sm={3}
          sx={{
            minWidth: "200px",
          }}
        >
          <Typography className="text">{level}</Typography>
        </Grid>

        <Grid item sm={3} sx={{ minWidth: "200px" }}>
          <Actions
            data={{
              name: "Chop Dawg",
              email: "partner@chopdawg.com",
              level: { value: "moderator", label: "Moderator" },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function AdminsTable() {
  const matches = useMediaQuery("(max-width: 600px)");
  return matches ? (
    [1, 2, 3, 4, 1, 2, 3, 12, 3].map(() => <SingleAdminSmall />)
  ) : (
    <Grid sx={{ overflowX: "scroll" }}>
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
        <SingleAdmin />
      ))}
    </Grid>
  );
}
