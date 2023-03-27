import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import BottomNav from "../components/BottomNavBar";
import { Header } from "../components/Header";
import { useMediaQuery, Box } from "@mui/material";
import "./layout.scss";

export default function Layout() {
  const matches = useMediaQuery("(max-width: 900px)");
  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar" id="sidebar">
        <Sidebar />
      </div>
      {/* {!matches && (
        <div className="sidebar" id="sidebar">
          <Sidebar />
        </div>
      )} */}
      <div className="main-content">
        <Header />
        <main className={matches ? "main-mobile" : "main"} id="detail">
          <Outlet />
        </main>
      </div>
      {matches && (
        <Box sx={{ display: { xs: "block", md: "none" }, marginTop: "50px" }}>
          <BottomNav />
        </Box>
      )}
    </div>
  );
}
