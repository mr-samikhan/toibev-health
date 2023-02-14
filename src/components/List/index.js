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

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export function CustomList({ list, icon = icons.peopleIcon, Actions }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Demo>
            <List dense={false} className="list">
              {generate(
                <ListItem
                  className="list-item"
                  secondaryAction={
                    !!Actions ? (
                      <Actions />
                    ) : (
                      <IconButton edge="end" aria-label="delete">
                        <img src={icons.editIcon} />
                      </IconButton>
                    )
                  }
                >
                  <ListItemAvatar sx={{ marginRight: "8px" }}>
                    <Avatar className="avatar">
                      <img src={icon} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography className="primary-text">ABC</Typography>
                    }
                    secondary={
                      <Typography className="secondary-text">
                        250 N SeeVee Lane, Bishop, CA 93514
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
