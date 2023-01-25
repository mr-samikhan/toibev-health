import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import NavItem from "./NavItem";
import "./sidebar.scss";
import { drawerWidth } from "../mocks/menuList";
import BottomNav from "./BottomNav";
import { Navbar } from "../Header";

export default ({ children }, props) => {
  const { window } = props;
  const [childData, setChildData] = useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar childData={childData} handleDrawerToggle={handleDrawerToggle} />

      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#fff",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            },
          }}
        >
          <NavItem
            passChild={setChildData}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          className="sidebar-class"
          open
        >
          <NavItem passChild={setChildData} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: (theme) => theme.palette.primary.main,
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3, background: (theme) => theme.palette.primary.light }}>
          {children}
          <Box sx={{ display: { sx: "block", sm: "none" }, marginTop: "50px" }}>
            <BottomNav />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
