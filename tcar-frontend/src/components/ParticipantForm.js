import React, { useState } from 'react';

function ParticipantForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'PARTICIPANT' }),
      });

      if (response.ok) {
        alert("Compte Participant créé !");
      } else {
        alert("Erreur lors de l'inscription !");
      }
    } catch (error) {
      console.error(error);
      alert("Problème réseau !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit">Créer un compte Participant</button>
    </form>
  );
}

export default ParticipantForm;
