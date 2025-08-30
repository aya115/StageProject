import { useState, useEffect } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    mecaniciens: [],
    fournisseurs: [],
    pieces: []
  });
  const [error, setError] = useState(null);

  // 🔹 Charger toutes les données au démarrage
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch("http://localhost:8081/search/all");
        if (!response.ok) throw new Error("Erreur lors du chargement initial");
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError("Impossible de charger les données.");
      }
    };
    fetchAll();
  }, []);

  // 🔹 Recherche filtrée
  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch("http://localhost:8081/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: query })
      });
      if (!response.ok) throw new Error("Erreur lors de la recherche");
      const data = await response.json();
      setResults(data);
      setError(null);
    } catch (err) {
      setError("Impossible de charger les résultats.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Chercher un mécanicien, fournisseur, pièce..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 p-3 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleSearch}
          className="bg-teal-600 text-white px-4 rounded-r-lg hover:bg-teal-700 transition"
        >
          Rechercher
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="space-y-6">
        {["Mécaniciens", "Fournisseurs", "Pièces"].map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            <ul className="list-disc list-inside">
              {(results[category.toLowerCase()]?.length > 0
                ? results[category.toLowerCase()]
                : [{ nom: `Aucun ${category.toLowerCase()} trouvé` }]
              ).map((item, i) => (
                <li key={i}>
                  {item.nom} {item.specialite ? `- ${item.specialite}` : ""}{" "}
                  {item.modele ? `- ${item.modele}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {results.ai_keywords && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Mots-clés IA</h3>
            <p>
              Type : {results.ai_keywords.type} <br />
              Spécialité : {results.ai_keywords.specialite}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 

export default SearchBar;
