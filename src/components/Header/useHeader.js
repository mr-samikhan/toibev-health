import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";

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

export function useHeader() {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width: 600px)");
  const tabMode = useMediaQuery("(max-width: 900px)");
  useEffect(() => {
    setTitle(
      pathname === "/dashboard"
        ? "Dashboard"
        : pathname === "/learn"
        ? "Learn"
        : pathname === "/health"
        ? "Health"
        : pathname === "/events"
        ? "Events"
        : pathname === "/information"
        ? "Information"
        : pathname === "/assesment"
        ? "Assessment"
        : pathname === "/admins"
        ? "Admins"
        : pathname === "/account-settings"
        ? "Account Settings"
        : ""
    );
  }, [pathname]);
  return { title: title, drawerWidth, AppBar, dispatch, matches, tabMode };
}
