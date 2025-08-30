import React from 'react';
import AddFournisseurForm from '../components/AddFournisseurForm';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function AddFournisseurPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
  
      {/* Sidebar */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <AddFournisseurForm />
      </div>
    </div>
  );
}

export default AddFournisseurPage;
