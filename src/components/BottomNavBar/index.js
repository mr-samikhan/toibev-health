import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { ReactComponent as DashboardIcon } from "../../assets/icons/BottonNav/DashboardIcon.svg";
import { ReactComponent as EventIcon } from "../../assets/icons/BottonNav/EventsIcon.svg";
import { ReactComponent as HealthIcon } from "../../assets/icons/BottonNav/HealthIcon.svg";
import { ReactComponent as LearnIcon } from "../../assets/icons/BottonNav/LearnIcon.svg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./style.scss";

const BottomNav = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);
  console.log(path);
  return (
    <Box>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "0px 0px 20px rgba(36, 41, 41, 0.1)",
        }}
      >
        <BottomNavigation
          showLabels
          sx={{
            padding: "6px 0px 10px",
            "& .MuiBottomNavigationAction-label": {
              marginTop: 1,
              fontFamily: "DM Sans",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "11px",
              lineHeight: "14px",
              color: true ? "#D1DEDE" : "#3B7D7D",
            },
          }}
        >
          <BottomNavigationAction
            className={path === "/dashboard" ? "active" : ""}
            label="Dashboard"
            icon={<DashboardIcon />}
            onClick={() => {
              navigate("/dashboard");
            }}
          />
          <BottomNavigationAction
            className={path === "/learn" ? "active" : ""}
            label="Learn"
            icon={<LearnIcon />}
            onClick={() => {
              navigate("/learn");
            }}
          />
          <BottomNavigationAction
            className={path === "/health" ? "active" : ""}
            label="Health"
            icon={<HealthIcon />}
            onClick={() => {
              navigate("/health");
            }}
          />
          <BottomNavigationAction
            className={path === "/events" ? "active" : ""}
            label="Events"
            icon={<EventIcon />}
            onClick={() => {
              navigate("/events");
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
