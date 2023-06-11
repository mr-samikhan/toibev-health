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
import { signOut, auth } from "../../../firebase";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useTheme } from "@mui/system";
import backgroundImage from "../../../assets/images/background.png";
import { resetAuthValues } from "../../../redux/actions/loginActions";

const NavItem = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
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
    <List sx={{ position: "relative" }}>
      <Grid>
        <img src={backgroundImage} className="background" />
      </Grid>
      <ListItemIcon
        sx={{
          textAlign: "right",
          mt: 1,
          mr: 1,
          display: { xs: "block", md: "none" },
        }}
      >
        <IconButton onClick={() => props.handleDrawerToggle()}>
          <CancelOutlinedIcon color="#9DA5AF" />
        </IconButton>
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

        const Icon = isDesktop ? menu.icon : menu.mobileIcon ?? menu.icon;
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
              sx={{ my: 1, pl: { xs: 5, md: 2 } }}
            >
              <div
                className={activeTab === menu.key.toLowerCase() ? "border" : ""}
              ></div>
              <ListItemIcon className={iconColor} sx={{ minWidth: "30px" }}>
                {itemIcon}
              </ListItemIcon>
              <ListItemText
                primary={!!isDesktop ? menu.text : menu.mobileText ?? menu.text}
              />
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
          mb: 6,
          textAlign: "center",
          display: { xs: "block", md: "none" },
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: "10px" }}
          startIcon={<LogoutOutlined />}
          onClick={() => {
            signOut(auth);
            dispatch(resetAuthValues());
          }}
        >
          Log out
        </Button>
      </Box>
    </List>
  );
};

export default NavItem;
