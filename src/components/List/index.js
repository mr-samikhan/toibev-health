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
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export function CustomList({ rows, icon = icons.peopleIcon }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List dense={false} className="list">
              {generate(
                <ListItem
                  className="list-item"
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <img src={icons.editIcon} />
                    </IconButton>
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
