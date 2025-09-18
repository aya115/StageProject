import React, { useState, useEffect } from 'react';
import '../styles/FormStyle.css';

function AddMecanicienForm() {
  const [form, setForm] = useState({
    nom: '',
    adresse: '',
    specialite: '',
    pieces: [],
  });

  const [allSpareParts, setAllSpareParts] = useState([]);
  const [mecaniciens, setMecaniciens] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/pieces')
      .then(res => res.json())
      .then(data => setAllSpareParts(data));

    fetchMecaniciens();
  }, []);

  const fetchMecaniciens = () => {
    fetch('http://localhost:8081/mecaniciens')
      .then(res => res.json())
      .then(data => setMecaniciens(data))
      .catch(err => console.error('Erreur chargement mécaniciens :', err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;
    let newPieces = [...form.pieces];

    if (checked) {
      newPieces.push(id);
    } else {
      newPieces = newPieces.filter(pid => pid !== id);
    }

    setForm({ ...form, pieces: newPieces });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:8081/mecaniciens/${editingId}`
      : `http://localhost:8081/mecaniciens`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          pieces: form.pieces.map(id => ({ id })),
        }),
      });

      if (!response.ok) throw new Error('Erreur ajout/modification');

      alert(editingId ? 'Mécanicien modifié' : 'Mécanicien ajouté');
      setForm({ nom: '', adresse: '', specialite: '', pieces: [] });
      setEditingId(null);
      fetchMecaniciens();
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l’enregistrement');
    }
  };

  const handleEdit = (m) => {
    setForm({
      nom: m.nom,
      adresse: m.adresse,
      specialite: m.specialite,
      pieces: m.pieces.map(p => p.id.toString()),
    });
    setEditingId(m.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce mécanicien ?')) return;

    await fetch(`http://localhost:8081/mecaniciens/${id}`, { method: 'DELETE' });
    fetchMecaniciens();
  };

  const handleDetails = (m) => {
    alert(`Nom : ${m.nom}\nAdresse : ${m.adresse}\nSpécialité : ${m.specialite}\nPièces :\n${m.pieces.map(p => `${p.nom} - ${p.modele}`).join('\n')}`);
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>{editingId ? 'Modifier' : 'Ajouter'} un Mécanicien</h2>
        <form onSubmit={handleSubmit} className="styled-form">
          <input
            className="styled-input"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
          <input
            className="styled-input"
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
            placeholder="Adresse"
            required
          />
          <input
            className="styled-input"
            name="specialite"
            value={form.specialite}
            onChange={handleChange}
            placeholder="Spécialité"
            required
          />

          <div className="checkbox-group">
            <label>Associer Pièces :</label>
            <div className="checkbox-list">
              {allSpareParts.map(part => (
                <label key={part.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={part.id}
                    checked={form.pieces.includes(part.id.toString())}
                    onChange={handleCheckboxChange}
                  />
                  {part.nom} - {part.modele}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="styled-button">
            {editingId ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      </div>

      {/* Liste des mécaniciens */}
      <div className="list-card">
        <h3>Liste des Mécaniciens</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Spécialité</th>
              <th>Pièces</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mecaniciens.map(m => (
              <tr key={m.id}>
                <td>{m.nom}</td>
                <td>{m.adresse}</td>
                <td>{m.specialite}</td>
                <td>{m.pieces?.map(p => `${p.nom} - ${p.modele}`).join(', ')}</td>
                <td>
                  <button className="action-btn edit" onClick={() => handleEdit(m)}>📝</button>
                  <button className="action-btn delete" onClick={() => handleDelete(m.id)}>🗑</button>
                  <button className="action-btn info" onClick={() => handleDetails(m)}>ℹ️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddMecanicienForm;
