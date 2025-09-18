import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import AdminProfile from "../components/AdminProfile";

function HomeAdmin() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        
        {/* Partie Dashboard */}
        <DashboardCards />

        {/* Partie Profil Admin */}
        <AdminProfile />
      </div>
    </div>
  );
}

export default HomeAdmin;
