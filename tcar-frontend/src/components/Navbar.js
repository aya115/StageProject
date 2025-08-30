import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token ou les infos utilisateur du localStorage
    localStorage.removeItem('token'); // si tu stockes un token
    localStorage.removeItem('role');  // si tu stockes le rôle
    localStorage.removeItem('username'); // etc.

    // Redirection vers la page de login
    navigate('/');
  };  return (
    <nav className="navbar">
      <span>Dashboard</span>
      <div className="right">
        <span>Search 🔍</span>
        <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
