import React from 'react';
import AddPieceForm from '../components/AddPieceForm';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
function AddPiecePage() {

  return (
        <div style={{ display: "flex"}}>
      {/* Sidebar (colonne gauche) */}
      <div style={{ width: "220px", }}>
        <Sidebar />
      </div>

      {/* Colonne droite */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <div style={{  color: "#fff" }}>
          <Navbar />
        </div>

        {/* Contenu Fournisseur */}
        <div style={{ flex: 1 }}>
        <AddPieceForm />
      </div>
    </div>
        </div>

  );
}

export default AddPiecePage;
