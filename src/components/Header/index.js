import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
// import { drawerWidth } from "../mocks/menuList";
import { ReactComponent as BellImage } from "../../assets/images/bell.svg";
import { ReactComponent as MenImage } from "../../assets/images/men.svg";
import { ReactComponent as DropdownIcon } from "../../assets/images/dropdown.svg";
import { ReactComponent as NotificationBadge } from "../../assets/icons/notificationbadge.svg";
import { ReactComponent as DownArrow } from "../../assets/icons/downarrow.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import "../Sidebar/sidebar.scss";
import "./header.scss";
import { DatePicker } from "../DatePicker";
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Header = ({ childData, handleDrawerToggle, title = "Learn" }) => {
  return (
    <Box className="header">
      <AppBar
        position="fixed"
        className="app-bar"
        sx={{
          background: {
            xs: (theme) => theme.palette.primary.main,
            sm: "#fff",
          },
        }}
        elevation={0}
      >
        <Toolbar
          className="toolbar"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Typography className="title">{title}</Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <DatePicker />
                </Grid>
                <Grid item sx={{ margin: "0px 24px 0px 32px" }}>
                  <IconButton>
                    {" "}
                    <NotificationBadge />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Avatar />
                </Grid>
                <Grid item>
                  <Typography className="username">Alfonso Gouse</Typography>
                </Grid>
                <Grid item>
                  <IconButton>
                    <DownArrow />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            // minHeight: '200px',
            background: (theme) => theme.palette.primary.main,
            borderBottomRightRadius: "20px",
          }}
        ></Box>
      </AppBar>
    </Box>
  );
};
