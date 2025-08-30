import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboards.css';
import '../styles/AccueilParticipant.css';
import ChatBot from '../components/ChatBot';
import SearchPage from "./SearchBar";

import {
  FaCar, FaTools, FaHome, FaSignOutAlt,
  FaSearch, FaTrash, FaPen, FaEye
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AccueilParticipant = () => {
  const [view, setView] = useState('tableauParDefaut');
  const [voitures, setVoitures] = useState([]);
  const [kilometrage, setKilometrage] = useState('');
  const [modele, setModele] = useState('');
  const [error, setError] = useState('');
  const [modalVoiture, setModalVoiture] = useState(null);
  const [modalAffectation, setModalAffectation] = useState(null);
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
    axios.get(`http://localhost:8081/pieces`).then(res => setPieces(res.data));
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
    try {
      await axios.delete(`http://localhost:8081/api/voitures/${id}`);
      setVoitures(voitures.filter(v => v.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("❌ Impossible de supprimer cette voiture : elle est liée à des pièces détachées.");
      } else {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const modifierVoiture = async () => {
    if (!modalVoiture || !modalVoiture.id) return;

    const km = parseInt(modalVoiture.kilometrage);
    if (isNaN(km) || !modalVoiture.modele) {
      alert("Modèle ou kilométrage invalide");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8081/api/voitures/${modalVoiture.id}`, {
        ...modalVoiture,
        kilometrage: km,
        participant: { id: userId }
      });

      const updatedVoiture = res.data;
      setVoitures(voitures.map(v => v.id === updatedVoiture.id ? updatedVoiture : v));
      closeModal();
    } catch (error) {
      alert("Échec de la modification");
    }
  };
const openModal = (item, type) => {
  if (type === 'edit-affectation' || type === 'details-affectation') {
    setModalAffectation({ ...item });
  } else if (type === 'edit' || type === 'details') {
    setModalVoiture({ ...item });
  }
  setModalType(type);
};

  const closeModal = () => {
    setModalVoiture(null);
    setModalAffectation(null);
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

const modifierAffectation = async () => {
  if (!modalAffectation || !modalAffectation.id) return;

  try {
    const res = await axios.put(`http://localhost:8081/api/affectations/${modalAffectation.id}`, {
      id: modalAffectation.id,
      voiture: { id: parseInt(modalAffectation.voiture.id) },
      sparePart: { id: parseInt(modalAffectation.sparePart.id) },
      duree: parseInt(modalAffectation.duree),
      participant: { id: userId }
    });

    const updated = res.data;
    setAffectations(affectations.map(a => a.id === updated.id ? updated : a));
    closeModal();
  } catch (error) {
    alert("Erreur modification affectation");
  }
};


  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2><FaCar /> ICARS</h2>
        <nav>
          <ul>
            <li onClick={() => navigate('/')}><FaHome /> Home</li>
            <li onClick={() => setView('voitures')}><FaCar /> Mes Voitures</li>
            <li onClick={() => setView('affectations')}><FaTools /> Spare Parts</li>
            <li onClick={() => setView('chat')}>💬 Chat</li>
            <li onClick={() => setView('search')}> Recherche intelligente</li>


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
{(view === 'tableauParDefaut' || view === '') && (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h3>Tableau Voitures & Pièces Affectées</h3>
    <table className="styled-table">
      <thead>
        <tr>
          <th>Voiture</th>
          <th>Pièce</th>
          <th>Durée (mois)</th>
        </tr>
      </thead>
      <tbody>
        {affectations.map((a) => (
          <tr key={a.id}>
            <td>{a.voiture?.modele}</td>
            <td>{a.sparePart?.nom} - {a.sparePart?.modele}</td>
            <td>{a.duree}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
{view === 'chat' && <ChatBot />}
{view === 'search' && <SearchPage />}


        {/* === AFFECTATIONS === */}
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
                    <td>
                      <button onClick={() => openModal(a, 'details-affectation')}><FaEye /></button>
                      <button onClick={() => openModal(a, 'edit-affectation')}><FaPen /></button>
                      <button onClick={() => supprimerAffectation(a.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* === MODAL AFFECTATION === */}
        {(modalType === 'edit-affectation' || modalType === 'details-affectation') && modalAffectation && (
          <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
              <h3>{modalType === 'details-affectation' ? 'Détails Affectation' : 'Modifier Affectation'}</h3>
              <p><strong>ID:</strong> {modalAffectation.id}</p>

              {modalType === 'details-affectation' ? (
                <>
                  <p><strong>Voiture:</strong> {modalAffectation.voiture.modele}</p>
                  <p><strong>Pièce:</strong> {modalAffectation.sparePart.nom} - {modalAffectation.sparePart.modele}</p>
                  <p><strong>Durée:</strong> {modalAffectation.duree} mois</p>
                </>
              ) : (
                <>
                  <select value={modalAffectation.voiture?.id} onChange={e => setModalAffectation({ ...modalAffectation, voiture: { id: e.target.value } })}>
                    {voitures.map(v => <option key={v.id} value={v.id}>{v.modele}</option>)}
                  </select>
                  <select value={modalAffectation.sparePart?.id} onChange={e => setModalAffectation({ ...modalAffectation, sparePart: { id: e.target.value } })}>
                    {pieces.map(p => <option key={p.id} value={p.id}>{p.nom} - {p.modele}</option>)}
                  </select>
                  <input
                    type="number"
                    value={modalAffectation.duree || ''}
                    onChange={e => setModalAffectation({ ...modalAffectation, duree: e.target.value })}
                  />
                  <button onClick={modifierAffectation}>Enregistrer</button>
                </>
              )}
              <button onClick={closeModal}>Fermer</button>
            </div>
          </div>
        )}

        {/* === TABLE VOITURES === */}
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

        {/* === MODAL VOITURE === */}
        {(modalType === 'edit' || modalType === 'details') && modalVoiture && (
          <div className="modal" style={{ display: 'flex' }}>
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
                  <input
                    type="text"
                    value={modalVoiture.modele || ''}
                    onChange={(e) =>
                      setModalVoiture({ ...modalVoiture, modele: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={modalVoiture.kilometrage || ''}
                    onChange={(e) =>
                      setModalVoiture({ ...modalVoiture, kilometrage: e.target.value })
                    }
                  />
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
