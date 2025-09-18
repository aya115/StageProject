import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; // 👈 Import du Navbar
import { Users, Wrench, Package } from "lucide-react";
import "../styles/NotificationsPage.css";

function NotificationsPage() {
  const [stats, setStats] = useState({
    fournisseurs: 0,
    mecaniciens: 0,
    pieces: 0,
    total: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/chat/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Erreur chargement notifications:", err));
  }, []);

  return (
    <div className="notifications-layout">
      <Navbar /> {/* 👈 Ajout du Navbar */}
      
      <div className="main-container">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="notifications-content">
          <h2>📊 Statistiques & Notifications</h2>
          <div className="stats-container">
            <div className="stat-widget fournisseurs">
              <Users size={32} />
              <h3>Fournisseurs</h3>
              <p>{stats.fournisseurs}</p>
            </div>
            <div className="stat-widget mecaniciens">
              <Wrench size={32} />
              <h3>Mécaniciens</h3>
              <p>{stats.mecaniciens}</p>
            </div>
            <div className="stat-widget pieces">
              <Package size={32} />
              <h3>Pièces</h3>
              <p>{stats.pieces}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
