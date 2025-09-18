import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:8081/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();

    // ✅ Sauvegarde du token
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // ✅ Sauvegarde des infos user
    localStorage.setItem('user', JSON.stringify({
      id: data.id,
      username: data.username,
      role: data.role
    }));

    // ✅ Redirection selon rôle
    if (data.role === 'ADMIN') {
      navigate('/homeadmin');
    } else if (data.role === 'PARTICIPANT') {
      navigate('/homeparticipant');
    } else if (data.role === 'ENTREPRISE') {
      navigate('/homeentreprise');
    } else {
      alert("Rôle non reconnu !");
    }
  } catch (error) {
    alert("Identifiants invalides !");
  }
};


  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left">
          <div className="overlay">
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-google"></i>
            </div>
            <p>Don’t have an account? <a href="/register">Signup</a></p>
          </div>
        </div>

        <div className="login-right">
          <div className="logo">
            <i className="fas fa-car-side"></i>
            <span>ICARS</span>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">LOGIN</button>
<button type="button" onClick={() => navigate("/forgot-password")}>
  Forgot Password?
</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
