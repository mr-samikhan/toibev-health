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
import { Alert } from "@mui/material";

const Paper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export function CustomList({
  list = [],
  icon,
  Actions,
  listing,
  onRowClick,
  indexed,
  noData,
}) {
  const removeOnClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            {list?.length === 0 ? (
              <Alert sx={{ mt: 2 }} severity="error">
                {noData ?? "No data found!"}
              </Alert>
            ) : (
              <List dense={false} className="listing">
                {list?.map((item, index) => (
                  <ListItem
                    className="listing-item"
                    secondaryAction={
                      !!Actions ? (
                        <Grid onClick={removeOnClick}>
                          <Actions data={item} list={list} />
                        </Grid>
                      ) : (
                        <IconButton edge="end" aria-label="delete">
                          <img src={icons.editIcon} />
                        </IconButton>
                      )
                    }
                    sx={{ cursor: onRowClick && "pointer" }}
                    onClick={() => onRowClick(item)}
                  >
                    <ListItemAvatar sx={{ mr: 2 }}>
                      {indexed ? (
                        <Grid
                          container
                          justifyContent={"center"}
                          alignItems={"center"}
                          px={3}
                          py={2}
                          className="text-avatar"
                        >
                          <Typography className="text">{item.text}</Typography>
                        </Grid>
                      ) : (
                        <Avatar
                          className={
                            listing === "events"
                              ? "image-avatar avatar"
                              : "avatar"
                          }
                        >
                          {" "}
                          <img src={icon ?? item.icon} />
                        </Avatar>
                      )}
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
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
