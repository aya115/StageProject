import { useState, useEffect } from "react";
import { Store, Wrench, Package } from "lucide-react"; // Icônes
import '../styles/Searchbar.css'

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger toutes les données au démarrage
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8081/search/all");
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError("Erreur de chargement des données initiales");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Recherche filtrée
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8081/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: query }),
      });

      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Section générique stylisée
  const Section = ({ title, icon: Icon, items }) => (
    <section className="result-section">
      <h2>
        <Icon className="icon" />
        {title}
      </h2>
      {items?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Spécialité</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.nom}</td>
                <td>{item.specialite || item.modele}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty">Aucun {title.toLowerCase()} trouvé</p>
      )}
    </section>
  );

  return (
    <div className="search-container">
      {/* Barre de recherche */}
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔎 Rechercher (ex: fournisseur kia, mécanicien golf...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Rechercher</button>
        </div>
      </div>

      {loading && <p className="loading">🔎 Recherche en cours...</p>}
      {error && <p className="error">❌ {error}</p>}

      {results && (
        <div className="results">
          <Section title="Mécaniciens" icon={Wrench} items={results.mecaniciens} />
          <Section title="Fournisseurs" icon={Store} items={results.fournisseurs} />
          <Section title="Pièces" icon={Package} items={results.pieces} />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
