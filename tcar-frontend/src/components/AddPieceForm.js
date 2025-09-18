import React, { useState, useEffect } from 'react';
import '../styles/FormStyle.css'; // selon le chemin réel

function AddPieceForm() {
  const [form, setForm] = useState({ nom: '', modele: '' });
  const [pieces, setPieces] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPieces();
  }, []);

  const fetchPieces = () => {
    fetch('http://localhost:8081/pieces')
      .then(res => res.json())
      .then(data => setPieces(data))
      .catch(err => console.error('Erreur chargement pièces:', err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:8081/pieces/${editingId}`
      : 'http://localhost:8081/pieces';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Erreur ajout/modif pièce');

      alert(editingId ? 'Pièce modifiée' : 'Pièce ajoutée');
      setForm({ nom: '', modele: '' });
      setEditingId(null);
      fetchPieces();
    } catch (error) {
      console.error('Erreur :', error);
      alert('Échec de l’enregistrement');
    }
  };

  const handleEdit = (p) => {
    setForm({ nom: p.nom, modele: p.modele });
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette pièce ?')) return;

    await fetch(`http://localhost:8081/pieces/${id}`, { method: 'DELETE' });
    fetchPieces();
  };

  const handleDetails = (p) => {
    alert(`Nom : ${p.nom}\nModèle : ${p.modele}`);
  };

  return (
    <div className="page-container">

    <div style={{ padding: '2px', color: 'white' }}>
      <h2>{editingId ? 'Modifier' : 'Ajouter'} une Pièce</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" required style={{ margin: '5px' }} />
        <input name="modele" value={form.modele} onChange={handleChange} placeholder="Modèle" required style={{ margin: '5px' }} />
        <button type="submit" style={{ marginTop: '10px' }}>{editingId ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <div style={{ marginTop: '40px' }}>
        <h3>Liste des Pièces</h3>
        <table border="1" style={{ backgroundColor: 'white', color: 'black', width: '100%' }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Modèle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pieces.map(p => (
              <tr key={p.id}>
                <td>{p.nom}</td>
                <td>{p.modele}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>📝</button>{' '}
                  <button onClick={() => handleDelete(p.id)}>🗑</button>{' '}
                  <button onClick={() => handleDetails(p)}>ℹ️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default AddPieceForm;
