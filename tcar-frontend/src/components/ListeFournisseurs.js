import React, { useEffect, useState } from 'react';

function ListeFournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/fournisseurs')
      .then(res => res.json())
      .then(data => setFournisseurs(data));
  }, []);

  return (
    <div>
      <h2>Liste des Fournisseurs</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Nom</th><th>Adresse</th><th>Spécialité</th><th>Pièces</th>
          </tr>
        </thead>
        <tbody>
          {fournisseurs.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.nom}</td>
              <td>{f.adresse}</td>
              <td>{f.specialite}</td>
              <td>{f.pieces?.map(p => `${p.nom} (${p.modele})`).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeFournisseurs;
