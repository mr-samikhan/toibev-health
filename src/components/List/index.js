import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import icons from "../../assets/index";
import "./list.scss";

const assessmentList = [
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
  { title: "ABC", subtitle: "Get out in front of this addiction" },
];

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export function CustomList({
  list = assessmentList,
  icon = icons.peopleIcon,
  Actions,
  listing,
  onRowClick,
  indexed,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Demo>
            <List dense={false} className="listing">
              {list?.map((item, index) => (
                <ListItem
                  className="listing-item"
                  secondaryAction={
                    !!Actions ? (
                      <Actions data={item} list={list} />
                    ) : (
                      <IconButton edge="end" aria-label="delete">
                        <img src={icons.editIcon} />
                      </IconButton>
                    )
                  }
                  sx={{ cursor: onRowClick && "pointer" }}
                  onClick={() => onRowClick(item)}
                >
                  <ListItemAvatar>
                    <Avatar
                      className={
                        listing === "events" || indexed
                          ? "image-avatar avatar"
                          : "avatar"
                      }
                    >
                      {" "}
                      {indexed ? index + 1 : <img src={item.icon ?? icon} />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography className="primary-text">
                        {item?.title}
                      </Typography>
                    }
                    secondary={
                      <Typography className="secondary-text">
                        {item?.subtitle ?? ""}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
