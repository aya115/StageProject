import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboards.css';
import {
  FaCar, FaTools, FaHome, FaSignOutAlt,
  FaSearch, FaTrash, FaPen, FaEye
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AccueilParticipant = () => {
  const [view, setView] = useState('affectations'); // vue par défaut
  const [voitures, setVoitures] = useState([]);
  const [kilometrage, setKilometrage] = useState('');
  const [modele, setModele] = useState('');
  const [error, setError] = useState('');
  const [modalVoiture, setModalVoiture] = useState(null);
  const [modalType, setModalType] = useState('');

  const [pieces, setPieces] = useState([]);
  const [affectations, setAffectations] = useState([]);
  const [voitureId, setVoitureId] = useState('');
  const [pieceId, setPieceId] = useState('');
  const [duree, setDuree] = useState('');

  const utilisateurConnecte = JSON.parse(localStorage.getItem("user"));
  const userId = utilisateurConnecte?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("Vous devez être connecté.");
      navigate("/");
      return;
    }
    axios.get(`http://localhost:8081/api/voitures/user/${userId}`).then(res => setVoitures(res.data));
    axios.get(`http://localhost:8081/api/spareparts`).then(res => setPieces(res.data));
    axios.get(`http://localhost:8081/api/affectations/participant/${userId}`).then(res => setAffectations(res.data));
  }, [userId]);

  const ajouterVoiture = async () => {
    if (voitures.length >= 2) {
      setError("Vous ne pouvez ajouter que 2 voitures.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8081/api/voitures", {
        kilometrage: parseInt(kilometrage),
        modele,
        participant: { id: userId }
      });
      setVoitures([...voitures, res.data]);
      setKilometrage('');
      setModele('');
      setError('');
    } catch (err) {
      setError("Erreur lors de l'ajout de la voiture.");
    }
  };

  const supprimerVoiture = async (id) => {
    if (!window.confirm("Confirmez la suppression de cette voiture ?")) return;
    await axios.delete(`http://localhost:8081/api/voitures/${id}`);
    setVoitures(voitures.filter(v => v.id !== id));
  };

  const modifierVoiture = async () => {
    const res = await axios.put(`http://localhost:8081/api/voitures/${modalVoiture.id}`, {
      ...modalVoiture,
      kilometrage: parseInt(modalVoiture.kilometrage),
      participant: { id: userId }
    });
    setVoitures(voitures.map(v => v.id === res.data.id ? res.data : v));
    closeModal();
  };

  const openModal = (voiture, type) => {
    setModalVoiture({ ...voiture });
    setModalType(type);
  };

  const closeModal = () => {
    setModalVoiture(null);
    setModalType('');
  };

  const ajouterAffectation = async () => {
    const res = await axios.post(`http://localhost:8081/api/affectations`, {
      voiture: { id: voitureId },
      sparePart: { id: pieceId },
      duree: parseInt(duree),
      participant: { id: userId }
    });
    setAffectations([...affectations, res.data]);
    setDuree('');
    setVoitureId('');
    setPieceId('');
  };

  const supprimerAffectation = async (id) => {
    await axios.delete(`http://localhost:8081/api/affectations/${id}`);
    setAffectations(affectations.filter(a => a.id !== id));
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2><FaCar /> ICARS</h2>
        <nav>
          <ul>
            <li onClick={() => navigate('/landing')}><FaHome /> Home</li>
            <li onClick={() => setView('voitures')}><FaCar /> Mes Voitures</li>
            <li onClick={() => setView('affectations')}><FaTools /> Spare Parts</li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <header className="navbar">
          <span className="welcome">Bienvenue</span>
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Recherche..." />
          </div>
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}><FaSignOutAlt /> Logout</button>
        </header>

        {/* Vue 1 - Gestion des affectations */}
        {view === 'affectations' && (
          <div>
            <h3>Associer Pièces à Voitures</h3>
            <div className="input-group">
              <select value={voitureId} onChange={e => setVoitureId(e.target.value)}>
                <option value="">-- Choisir une voiture --</option>
                {voitures.map(v => (
                  <option key={v.id} value={v.id}>{v.modele}</option>
                ))}
              </select>
              <select value={pieceId} onChange={e => setPieceId(e.target.value)}>
                <option value="">-- Choisir une pièce --</option>
                {pieces.map(p => (
                  <option key={p.id} value={p.id}>{p.nom} - {p.modele}</option>
                ))}
              </select>
              <input type="number" value={duree} placeholder="Durée (mois)" onChange={e => setDuree(e.target.value)} />
              <button onClick={ajouterAffectation}>Associer</button>
            </div>

            <table className="styled-table">
              <thead>
                <tr>
                  <th>Voiture</th>
                  <th>Pièce</th>
                  <th>Durée (mois)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {affectations.map(a => (
                  <tr key={a.id}>
                    <td>{a.voiture.modele}</td>
                    <td>{a.sparePart.nom} - {a.sparePart.modele}</td>
                    <td>{a.duree}</td>
                    <td><button onClick={() => supprimerAffectation(a.id)}>🗑</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Vue 2 - Mes Voitures */}
        {view === 'voitures' && (
          <div>
            <h3>Mes Voitures</h3>
            {error && <p className="error-message">{error}</p>}

            <table className="styled-table">
              <thead>
                <tr>
                  <th><FaCar /> Modèle</th>
                  <th>📏 Kilométrage (km)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {voitures.map(v => (
                  <tr key={v.id}>
                    <td>{v.modele}</td>
                    <td>{v.kilometrage}</td>
                    <td>
                      <button onClick={() => openModal(v, 'details')}><FaEye /></button>
                      <button onClick={() => openModal(v, 'edit')}><FaPen /></button>
                      <button onClick={() => supprimerVoiture(v.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="input-group">
              <input placeholder="kilométrage" value={kilometrage} onChange={e => setKilometrage(e.target.value)} />
              <input placeholder="Modèle" value={modele} onChange={e => setModele(e.target.value)} />
              <button onClick={ajouterVoiture}>Ajouter Voiture</button>
            </div>
          </div>
        )}

        {/* Modal */}
        {modalVoiture && (
          <div className="modal">
            <div className="modal-content">
              <h3>{modalType === 'details' ? 'Détails Voiture' : 'Modifier Voiture'}</h3>
              <p><strong>ID:</strong> {modalVoiture.id}</p>
              {modalType === 'details' ? (
                <>
                  <p><strong>Modèle:</strong> {modalVoiture.modele}</p>
                  <p><strong>Kilométrage:</strong> {modalVoiture.kilometrage}</p>
                </>
              ) : (
                <>
                  <input value={modalVoiture.modele} onChange={e => setModalVoiture({ ...modalVoiture, modele: e.target.value })} />
                  <input value={modalVoiture.kilometrage} onChange={e => setModalVoiture({ ...modalVoiture, kilometrage: e.target.value })} />
                  <button onClick={modifierVoiture}>Enregistrer</button>
                </>
              )}
              <button onClick={closeModal}>Fermer</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccueilParticipant;
