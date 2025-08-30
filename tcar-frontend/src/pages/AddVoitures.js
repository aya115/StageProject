import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddVoitures = ({ userId }) => {
  const [voitures, setVoitures] = useState([]);
  const [nom, setNom] = useState('');
  const [modele, setModele] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/voitures/user/${userId}`)
      .then(res => setVoitures(res.data));
  }, [userId]);

  const ajouterVoiture = () => {
    if (voitures.length >= 2) {
      setError("Vous ne pouvez pas ajouter plus de 2 voitures.");
      return;
    }

    axios.post("/api/voitures", {
      nom, modele, participant: { id: userId }
    }).then(res => {
      setVoitures([...voitures, res.data]);
      setNom('');
      setModele('');
      setError('');
    }).catch(err => {
      setError("Erreur : " + err.response.data);
    });
  };

  return (
    <div>
      <h2>Mes Voitures</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {voitures.map(v => (
          <li key={v.id}>{v.nom} - {v.modele}</li>
        ))}
      </ul>
      <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
      <input placeholder="Modèle" value={modele} onChange={e => setModele(e.target.value)} />
      <button onClick={ajouterVoiture}>Ajouter Voiture</button>
    </div>
  );
};

export default AddVoitures;
