import React from "react";
import {
  Avatar,
  Grid,
  Typography,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Actions } from "../ActionButtons";

const tableHeaders = [
  {
    label: "Username",
    key: "username",
  },
  {
    label: "Email Address",
    key: "email",
  },
  {
    label: "Permission Level",
    key: "permissionLevel",
  },
  {
    label: "",
    key: "actions",
  },
];

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

function SingleAdmin({ admin }) {
  const { username, email, permissionLevel } = admin;
  return (
    <Grid container className="row">
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        className="wrapper"
        sx={{ flexWrap: "nowrap" }}
      >
        <Grid item sm={3} pr={1}>
          <Grid container alignItems="center" flexWrap="nowrap">
            <Grid item>
              <Avatar className={"avatar"} />
            </Grid>
            <Grid item sx={{ overflow: "hidden" }}>
              <Typography className={"text text-overflow"}>
                {username}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={3} pr={1}>
          <Typography className="text text-overflow">{email}</Typography>
        </Grid>
        <Grid item sm={3} pr={1}>
          <Typography className="text text-overflow">
            {permissionLevel}
          </Typography>
        </Grid>

        <Grid item sm={3}>
          <Actions
            data={{
              permissionLevel: {
                value: permissionLevel,
                label:
                  permissionLevel === "moderator"
                    ? "Moderator"
                    : "Administrator",
              },
              ...admin,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function AdminsTable({ admins }) {
  const matches = useMediaQuery("(max-width: 600px)");

  return matches ? (
    admins?.map((admin) => <SingleAdminSmall admin={admin} />)
  ) : (
    <Grid>
      <Grid
        item
        xs={12}
        container
        className="table-header"
        justifyContent="space-between"
        sx={{ flexWrap: "nowrap" }}
      >
        {tableHeaders?.map((header) => (
          <Grid item className="item" key={header.key} xs={3} pr={1}>
            <Typography
              ml={header?.key === "username" ? 8.5 : 0}
              className="text-overflow"
            >
              {header.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container mt={2.5}>
        {admins?.map((admin) => (
          <SingleAdmin admin={admin} />
        ))}
      </Grid>
    </Grid>
  );
}
