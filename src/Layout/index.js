import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import BottomNav from "../components/BottomNavBar";
import { Header } from "../components/Header";
import { useMediaQuery, Box } from "@mui/material";
import { useBreakpints } from "../common/helpers";
import "./layout.scss";
import { useSelector } from "react-redux";

export default function Layout() {
  const { mobileMode, tabMode } = useBreakpints();
  const { isLoading } = useSelector((state) => state.Auth);
  if (isLoading) return "Loading...";
  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar" id="sidebar">
        <Sidebar />
      </div>
      <div className={tabMode ? "main-content-mobile" : "main-content"}>
        <Header />
        <main className={mobileMode ? "main-mobile" : "main"} id="detail">
          <Outlet />
        </main>
      </div>
      {mobileMode && (
        <Box sx={{ display: { xs: "block", md: "none" }, marginTop: "50px" }}>
          <BottomNav />
        </Box>
      )}
    </div>
  );
}
