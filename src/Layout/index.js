import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar" id="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />
        <main className="main" id="detail">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
