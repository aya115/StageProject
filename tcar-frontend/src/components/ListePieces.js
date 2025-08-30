import React, { useEffect, useState } from 'react';

function ListePieces() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/pieces')
      .then(res => res.json())
      .then(data => setPieces(data));
  }, []);

  return (
    <div>
      <h2>Liste des Pièces de Rechange</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Nom</th><th>Modèle</th>
          </tr>
        </thead>
        <tbody>
          {pieces.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nom}</td>
              <td>{p.modele}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListePieces;
