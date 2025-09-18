import React, { useEffect, useState } from "react";
import "../styles/DashboardCards.css";

function DashboardCards() {
  const [stats, setStats] = useState({
    pieces: 0,
    fournisseurs: 0,
    mecaniciens: 0,
  });

  const [notifTotal, setNotifTotal] = useState(0);

  useEffect(() => {
    // Charger stats générales
    fetch("http://localhost:8081/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Erreur chargement stats générales:", err));

    // Charger stats notifications
    fetch("http://localhost:8081/api/chat/stats")
      .then((res) => res.json())
      .then((data) => setNotifTotal(data.total || 0))
      .catch((err) => console.error("Erreur chargement stats notifications:", err));
  }, []);

  return (
    <div className="cards-container">
      <div className="card">
        <h3>Pièces</h3>
        <p>{stats.pieces}</p>
      </div>
      <div className="card">
        <h3>Fournisseurs</h3>
        <p>{stats.fournisseurs}</p>
      </div>
      <div className="card">
        <h3>Mécaniciens</h3>
        <p>{stats.mecaniciens}</p>
      </div>
      <div className="card">
        <h3>Notifications</h3>
        <p>{notifTotal}</p>
      </div>
    </div>
  );
}

export default DashboardCards;
