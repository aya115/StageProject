import React from 'react';
import AddMecanicienForm from '../components/AddMecanicienForm';
import Sidebar from '../components/Sidebar';

function AddMecanicienPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
  
      {/* Sidebar */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <AddMecanicienForm />
      </div>
    </div>
  );
}

export default AddMecanicienPage;
