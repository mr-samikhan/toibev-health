import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import { sidebarTabsList } from "../menuList";
import appLogo from "../../../assets/images/app.svg";
import mobileLogo from "../../../assets/images/mobilelogo.svg";
import classNames from "classnames";
import { Box, Button, useMediaQuery } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useTheme } from "@mui/system";

const NavItem = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    highlightActiveTab();
  }, []);
  const highlightActiveTab = () => {
    let pathname = location.pathname.split("/");
    let activeTab = pathname[pathname.length - 1];
    if (activeTab) {
      setActiveTab(activeTab);
    }
  };

  const onTabHandler = (e, tab) => {
    e.preventDefault();
    let tabKey = tab.key.toLowerCase();
    if (tabKey !== activeTab) {
      if (tabKey === "login") {
        navigate("/login");
      }
      if (tabKey === "dashboard") {
        navigate("/dashboard");
      } else {
        navigate(`/${tabKey}`);
      }
      setActiveTab(tabKey);
      props.passChild(tabKey);
    } else {
      navigate(`/${tabKey}`);
    }
  };

  return (
    <List>
      <ListItemIcon
        sx={{ textAlign: "right", mr: 1, display: { xs: "block", sm: "none" } }}
        onClick={() => props.handleDrawerToggle()}
      >
        <CancelOutlinedIcon color="#9DA5AF" />
      </ListItemIcon>

      <ListItemIcon
        className="app-logo"
        sx={{ textAlign: "center", width: "100%", mb: 2, mt: 3 }}
      >
        <img src={isDesktop ? appLogo : mobileLogo} alt="app-logo" />
      </ListItemIcon>
      {!isDesktop && <div className="divider" />}
      {sidebarTabsList.map((menu, index) => {
        let [textClass, iconColor] = ["sidebar-tab-text", "white_icon"];
        [textClass, iconColor] =
          activeTab === menu.key.toLowerCase()
            ? ["active-tab", "white_icon"]
            : ["sidebar-tab-text", "white_icon"];

        const Icon = menu.icon;
        const itemIcon = menu?.icon ? (
          <Icon stroke={1.5} size="1rem" />
        ) : (
          <FiberManualRecordOutlinedIcon />
        );
        return (
          <>
            <ListItem
              button
              key={menu.key}
              onClick={(e) => onTabHandler(e, menu)}
              className={classNames(textClass)}
              sx={{ my: 1 }}
            >
              <ListItemIcon className={iconColor} sx={{ minWidth: "30px" }}>
                {itemIcon}
              </ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItem>
            {isDesktop && menu.text === "Information" && (
              <div className="divider"></div>
            )}
          </>
        );
      })}
      <Box
        sx={{
          mt: 16,
          textAlign: "center",
          display: { xs: "block", sm: "none" },
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: "10px" }}
          startIcon={<LogoutOutlined />}
        >
          Log out
        </Button>
      </Box>
    </List>
  );
};

export default NavItem;
