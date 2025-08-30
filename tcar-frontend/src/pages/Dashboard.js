import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCards from '../components/StatCards';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate(); // ⚠️ Ajout ici

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Navbar />
        <StatCards />

    
        <div className="charts">
          <div className="chart-box"><LineChart /></div>
          <div className="chart-box"><PieChart /></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
