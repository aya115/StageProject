  import React, { useState, useEffect } from 'react';
import '../styles/FormStyle.css'; // selon le chemin réel

  function AddFournisseurForm() {
    const [form, setForm] = useState({
      nom: '',
      adresse: '',
      specialite: '',
      pieces: [], // tableau d'IDs (string)
    });

    const [allSpareParts, setAllSpareParts] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
      fetch('http://localhost:8081/pieces')
        .then(res => res.json())
        .then(data => setAllSpareParts(data));

      fetchFournisseurs();
    }, []);

    const fetchFournisseurs = () => {
      fetch('http://localhost:8081/fournisseurs')
        .then(res => res.json())
        .then(data => setFournisseurs(data));
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
        ? `http://localhost:8081/fournisseurs/${editingId}`
        : `http://localhost:8081/fournisseurs`;

      const method = editingId ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            pieces: form.pieces.map(id => ({ id })), // reconstruire pour backend
          }),
        });

        if (!response.ok) throw new Error('Erreur');

        alert(editingId ? 'Fournisseur modifié' : 'Fournisseur ajouté');
        setForm({ nom: '', adresse: '', specialite: '', pieces: [] });
        setEditingId(null);
        fetchFournisseurs();
      } catch (error) {
        alert('Erreur lors de l’enregistrement');
      }
    };

    const handleDelete = async (id) => {
      if (!window.confirm('Confirmer la suppression ?')) return;

      await fetch(`http://localhost:8081/fournisseurs/${id}`, {
        method: 'DELETE',
      });

      fetchFournisseurs();
    };

    const handleEdit = (f) => {
      setForm({
        nom: f.nom,
        adresse: f.adresse,
        specialite: f.specialite,
        pieces: f.pieces.map(p => p.id.toString()), // tableau d'IDs (string)
      });
      setEditingId(f.id);
    };

    const handleDetails = (f) => {
      alert(`Nom : ${f.nom}\nAdresse : ${f.adresse}\nSpécialité : ${f.specialite}\nPièces :\n${f.pieces.map(p => `${p.nom} - ${p.modele}`).join('\n')}`);
    };

    return (
<div className="page-container">

      <div style={{ color: 'white', padding: '20px' }}>
        <h2>{editingId ? 'Modifier' : 'Ajouter'} un Fournisseur</h2>
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
                  />{' '}
                  {part.nom} - {part.modele}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" style={{ marginTop: '15px' }}>
            {editingId ? 'Modifier' : 'Ajouter'}
          </button>
        </form>

        {/* Tableau des fournisseurs */}
        <div style={{ marginTop: '30px' }}>
          <h3>Liste des Fournisseurs</h3>
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
              {fournisseurs.map(f => (
                <tr key={f.id}>
                  <td>{f.nom}</td>
                  <td>{f.adresse}</td>
                  <td>{f.specialite}</td>
                  <td>{f.pieces?.map(p => `${p.nom} - ${p.modele}`).join(', ')}</td>
                  <td>
                    <button onClick={() => handleEdit(f)}>📝</button>{' '}
                    <button onClick={() => handleDelete(f.id)}>🗑</button>{' '}
                    <button onClick={() => handleDetails(f)}>ℹ️</button>
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

  export default AddFournisseurForm;
