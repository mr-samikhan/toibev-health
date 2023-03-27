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

import React from "react";

const BottomNav = () => {
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
          <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
          <BottomNavigationAction label="Learn" icon={<LearnIcon />} />
          <BottomNavigationAction label="Health" icon={<HealthIcon />} />
          <BottomNavigationAction label="Event" icon={<EventIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
