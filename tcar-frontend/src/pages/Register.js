import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function Register() {
  const [role, setRole] = useState('Participant');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    adresse: '',
    numtel: '',
    nomEntreprise: '',
    adresseEntreprise: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password,
      role: role.toUpperCase(),
      ...(role === 'Participant' && {
        participant: {
          adresse: formData.adresse,
          telephone: formData.numtel
        }
      }),
      ...(role === 'Entreprise' && {
        entreprise: {
          nom: formData.nomEntreprise,
          adresse: formData.adresseEntreprise
        }
      })
    };

    try {
      const response = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Compte créé !");
        navigate('/login');
      } else {
        const errText = await response.text();
        alert("Erreur lors de l'inscription : " + errText);
      }
    } catch (error) {
      alert("Problème réseau !");
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* ✅ LEFT SIDE AVEC background-image et overlay */}
        <div className="login-left">
          <div className="overlay">
            <p>Vous avez déjà un compte ? <a href="/login">Connexion</a></p>
          </div>
        </div>

        {/* ✅ RIGHT SIDE AVEC FORMULAIRE */}
        <div className="login-right">
          <div className="logo">
            <i className="fas fa-car-side"></i>
            <span>ICARS</span>
          </div>
          <h2>Créer un compte</h2>
          <form onSubmit={handleRegister}>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Entreprise">Entreprise</option>
              <option value="Participant">Participant</option>
            </select>

            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {role === 'Participant' && (
              <>
                <input
                  type="text"
                  name="adresse"
                  placeholder="Adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="numtel"
                  placeholder="Téléphone"
                  value={formData.numtel}
                  onChange={handleChange}
                />
                 <input
                  type="text"
                  name="email"
                  placeholder="Email Participant"
                  value={formData.email}
                  onChange={handleChange}
                />
              </>
            )}

            {role === 'Entreprise' && (
              <>
                <input
                  type="text"
                  name="nomEntreprise"
                  placeholder="Nom de l'entreprise"
                  value={formData.nomEntreprise}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="adresseEntreprise"
                  placeholder="Adresse entreprise"
                  value={formData.adresseEntreprise}
                  onChange={handleChange}
                />
                   <input
                  type="text"
                  name="emailEntreprise"
                  placeholder="Email Entreprise"
                  value={formData.emailEntreprise}
                  onChange={handleChange}
                />
              </>
            )}

            <button type="submit" className="login-btn">
              Créer le compte {role}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
