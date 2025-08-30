import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaList, FaBell, FaMapMarkedAlt, FaPlus } from 'react-icons/fa';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🚗 ICARS</h2>
      <ul>
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="#"><FaUser /> Profil</Link></li>
        <li><Link to="#"><FaList /> Pièces</Link></li>
        <li><Link to="#"><FaMapMarkedAlt /> Localisation</Link></li>
        <li><Link to="#"><FaBell /> Notifications</Link></li>

        <hr />

        <li><Link to="/add-fournisseur"><FaPlus /> Ajouter Fournisseur</Link></li>
        <li><Link to="/add-mecanicien"><FaPlus /> Ajouter Mécanicien</Link></li>
        <li><Link to="/add-piece"><FaPlus /> Ajouter Pièce</Link></li>
        
      </ul>

      <div className="footer">
        © 2025 ICARS
      </div>
    </div>
  );
}

export default Sidebar;
