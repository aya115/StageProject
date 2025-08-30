import React, { useEffect, useState } from 'react';

function ListeMecaniciens() {
  const [mecaniciens, setMecaniciens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/mecaniciens')
      .then(res => res.json())
      .then(data => setMecaniciens(data));
  }, []);

  return (
    <div>
      <h2>Liste des Mécaniciens</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Nom</th><th>Adresse</th><th>Spécialité</th><th>Pièces</th>
          </tr>
        </thead>
        <tbody>
          {mecaniciens.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nom}</td>
              <td>{m.adresse}</td>
              <td>{m.specialite}</td>
              <td>{m.pieces?.map(p => `${p.nom} (${p.modele})`).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeMecaniciens;
