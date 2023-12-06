import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { ReactComponent as DashboardIcon } from "../../assets/navbar/dashboardIcon.svg";
import { ReactComponent as DashboardSelectedIcon } from "../../assets/navbar/primary/dashboardIcon.svg";
import { ReactComponent as EventIcon } from "../../assets/navbar/eventsIcon.svg";
import { ReactComponent as EventSelectedIcon } from "../../assets/navbar/primary/eventsIcon.svg";
import { ReactComponent as HealthIcon } from "../../assets/navbar/healthIcon.svg";
import { ReactComponent as HealthSelectedIcon } from "../../assets/navbar/primary/healthIcon.svg";
import { ReactComponent as LearnIcon } from "../../assets/navbar/learnIcon.svg";
import { ReactComponent as LearnSelectedIcon } from "../../assets/navbar/primary/learnIcon.svg";

import React from "react";

const navItems = [
  {
    label: "Dashboard",
    Icon: DashboardIcon,
    SelectedIcon: DashboardSelectedIcon,
  },
  { label: "Learn", Icon: LearnIcon, SelectedIcon: LearnSelectedIcon },
  { label: "Health", Icon: HealthIcon, SelectedIcon: HealthSelectedIcon },
  { label: "Event", Icon: EventIcon, SelectedIcon: EventSelectedIcon },
];

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
