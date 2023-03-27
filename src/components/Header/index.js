import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {
  Avatar,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { ReactComponent as BellImage } from "../../assets/images/bell.svg";
import { ReactComponent as MenImage } from "../../assets/images/men.svg";
import { ReactComponent as DropdownIcon } from "../../assets/images/dropdown.svg";
import { ReactComponent as NotificationBadge } from "../../assets/icons/notificationbadge.svg";
import { ReactComponent as DownArrow } from "../../assets/icons/downarrow.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as HamburgerIcon } from "../../assets/icons/hamburger.svg";
import { ReactComponent as Logo } from "../../assets/icons/header-logo.svg";
import { useHeader } from "./useHeader";

import "../Sidebar/sidebar.scss";
import "./header.scss";
import { DatePicker } from "../DatePicker";

export const Header = ({ childData, handleDrawerToggle }) => {
  const { title, drawerWidth, AppBar, dispatch, matches } = useHeader();
  return (
    <Box className="header">
      <AppBar
        position="fixed"
        className="app-bar"
        sx={{
          background: {
            xs: (theme) => theme.palette.primary.main,
            md: "#fff",
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
          {!matches ? (
            <Grid container flexDirection="column">
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Grid item ml={-1}>
                  <IconButton
                    onClick={() => dispatch({ type: "TOGGLESIDEBAR" })}
                  >
                    <HamburgerIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Logo />
                </Grid>
                <Grid item>
                  <Avatar />
                </Grid>
              </Grid>
              <Grid item mb={3}>
                <TextField
                  fullWidth
                  className="search-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item mb={1}>
                <Typography className="header-title">{title}</Typography>
              </Grid>
            </Grid>
          ) : (
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
          )}
        </Toolbar>
        {/* <Box
          sx={{
            display: { xs: "block", sm: "none" },
            // minHeight: '200px',
            background: (theme) => theme.palette.primary.main,
            borderBottomRightRadius: "20px",
          }}
        ></Box> */}
      </AppBar>
    </Box>
  );
};
