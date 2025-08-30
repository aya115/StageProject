import React, { useState, useEffect } from 'react';
import '../styles/FormStyle.css'; // selon le chemin réel

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

    <div style={{ color: 'white', padding: '20px' }}>
      <h2>{editingId ? 'Modifier' : 'Ajouter'} un Mécanicien</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" required style={{ margin: '5px' }} />
        <input name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse" required style={{ margin: '5px' }} />
        <input name="specialite" value={form.specialite} onChange={handleChange} placeholder="Spécialité" required style={{ margin: '5px' }} />

        <div style={{ marginTop: '10px' }}>
          <label>Associer Pièces :</label>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
            {allSpareParts.map(part => (
              <label key={part.id}>
                <input
                  type="checkbox"
                  value={part.id}
                  checked={form.pieces.includes(part.id.toString())}
                  onChange={handleCheckboxChange}
                />
                {' '}
                {part.nom} - {part.modele}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" style={{ marginTop: '15px' }}>{editingId ? 'Modifier' : 'Ajouter'}</button>
      </form>

      {/* Liste des mécaniciens */}
      <div style={{ marginTop: '30px' }}>
        <h3>Liste des Mécaniciens</h3>
        <table border="1" style={{ backgroundColor: 'white', color: 'black', width: '100%' }}>
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
                  <button onClick={() => handleEdit(m)}>📝</button>{' '}
                  <button onClick={() => handleDelete(m.id)}>🗑</button>{' '}
                  <button onClick={() => handleDetails(m)}>ℹ️</button>
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

export default AddMecanicienForm;
