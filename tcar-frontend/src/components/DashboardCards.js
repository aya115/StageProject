// src/components/DashboardCards.js
import React from 'react';
import '../styles/DashboardCards.css';

function DashboardCards() {
  return (
    <div className="cards-container">
      <div className="card">
        <h3>Pièces</h3>
        <p>20</p>
      </div>
      <div className="card">
        <h3>Fournisseurs</h3>
        <p>5</p>
      </div>
      <div className="card">
        <h3>Mécaniciens</h3>
        <p>3</p>
      </div>
      <div className="card">
        <h3>Notifications</h3>
        <p>12</p>
      </div>
    </div>
  );
}

export default DashboardCards;
