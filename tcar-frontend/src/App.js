import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard"; // remplacé Home par Dashboard
import LoginPage from '../src/pages/LoginPage';
import AddFournisseurPage from './pages/AddFournisseurPage';
import AddMecanicienPage from './pages/AddMecanicienPage';
import AddPiecePage from './pages/AddPiecePage';
import ListeMecaniciens from './components/ListeMecaniciens';
import ListeFournisseurs from './components/ListeFournisseurs';
import ListePieces from './components/ListePieces';
import HomePage from './pages/HomePage';
import AccueilParticipant from "./pages/AccueilParticipant";
import AccueilEntreprise from "./pages/AccueilEntreprise";
import SearchPage from "./pages/SearchBar";
// Exemple de route dans React Router v6+

function App() {
  return (
    <Router>
      <Routes>


        <Route path="/add-fournisseur" element={<AddFournisseurPage />} />
        <Route path="/homeparticipant" element={<AccueilParticipant />} />
        <Route path="/homeentreprise" element={<AccueilEntreprise />} />



<Route path="/add-mecanicien" element={<AddMecanicienPage />} />
<Route path="/add-piece" element={<AddPiecePage />} />
<Route path="/liste-mecaniciens" element={<ListeMecaniciens />} />
<Route path="/liste-fournisseurs" element={<ListeFournisseurs />} />
<Route path="/liste-pieces" element={<ListePieces />} />

        <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<Register />} />
        
        <Route path="/homeadmin" element={
            <Dashboard />
        } />
      </Routes>
    </Router>
  );
}

export default App;