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

    
        <div className="charts">
          <div className="chart-box"><LineChart /></div>
          <div className="chart-box"><PieChart /></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
