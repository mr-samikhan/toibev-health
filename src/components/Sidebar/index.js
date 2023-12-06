import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import NavItem from "./NavItem";
import { useSelector, useDispatch } from "react-redux";
import "./sidebar.scss";

const drawerWidth = 240;

export function Sidebar(props) {
  const { window } = props;
  const { toggle } = useSelector((state) => state.Sidebar);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch({ type: "TOGGLESIDEBAR" });
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={toggle}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#fff",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            },
          }}
        >
          <NavItem handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "0px",
            },
            background: (theme) => theme.palette.primary.main,
          }}
          className="sidebar-class"
          open
        >
          <NavItem />
        </Drawer>
      </Box>
    </Box>
  );
}
