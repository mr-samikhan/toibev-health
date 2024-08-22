import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
//imports
import { signOut, auth } from "../../firebase";
import { resetAuthValues } from "../../redux/actions/loginActions";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.Auth) ?? {};

  const matches = useMediaQuery("(min-width: 600px)");
  const tabMode = useMediaQuery("(max-width: 900px)");

  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDateModal, setShowDateModal] = React.useState(false);

  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  const dipatch = useDispatch();
  console.log(pathname, "pathname");

  React.useEffect(() => {
    if (dateRange.startDate == null && dateRange.endDate == null) {
      dipatch({
        type: "RESET_DASHBOARD_VALUES",
      });
    }
  }, []);

  useEffect(() => {
    if (pathname !== "/dashboard") {
      dipatch({
        type: "RESET_DASHBOARD_VALUES",
      });
      setDateRange({
        startDate: null,
        endDate: null,
      });
    }
  }, [pathname]);

  const handleOpenMenu = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hanldeLogout = () => {
    signOut(auth);
    dispatch(resetAuthValues());
  };

  const onGotoSettingPage = () => navigate("/account-settings");

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
  return {
    user,
    open,
    AppBar,
    matches,
    tabMode,
    setOpen,
    dispatch,
    anchorEl,
    dateRange,
    handleClose,
    title: title,
    hanldeLogout,
    drawerWidth,
    setDateRange,
    showDateModal,
    handleOpenMenu,
    setShowDateModal,
    onGotoSettingPage,
  };
}
