import React from 'react';
import AddPieceForm from '../components/AddPieceForm';
import Sidebar from '../components/Sidebar';

function AddPiecePage() {

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
  
      {/* Sidebar */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <AddPieceForm />
      </div>
    </div>
  );
}

export default AddPiecePage;
