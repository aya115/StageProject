import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import DashboardCards from '../components/DashboardCards';

function Dashboard() {
  const navigate = useNavigate(); // ⚠️ Ajout ici

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Navbar />
        <DashboardCards />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", padding: "20px" }}>
          <PieChart url="http://localhost:8081/api/dashboard/pie/fournisseur" title="Pièces par Fournisseur" />
          <PieChart url="http://localhost:8081/api/dashboard/pie/mecanicien" title="Pièces par Mécanicien" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
