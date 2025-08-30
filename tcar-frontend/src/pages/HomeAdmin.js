import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardCards from '../components/DashboardCards';

function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <DashboardCards />
      </div>
    </div>
  );
}

export default Home;
