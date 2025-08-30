import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const Section = ({ title, items, render }) => (
    <section className="bg-white shadow rounded-2xl p-4">
      <h2 className="text-lg font-bold mb-3 border-b pb-1">{title}</h2>
      {items?.length > 0 ? (
        <div className="grid gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-3 border rounded-xl bg-gray-50 hover:shadow"
            >
              {render(item)}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Aucun {title.toLowerCase()} trouvé</p>
      )}
    </section>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Barre de recherche */}
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border p-3 rounded-2xl shadow"
          placeholder="Ex: fournisseur kia, mécanicien golf..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-blue-700"
        >
          Rechercher
        </button>
      </div>

      {loading && <p className="text-gray-500">🔎 Recherche en cours...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {/* Résultats */}
      {results && (
        <div className="space-y-6">
          <Section
            title="Mécaniciens"
            items={results.mecaniciens}
            render={(m) => (
              <p>
                <span className="font-semibold">{m.nom}</span> —{" "}
                <span className="text-blue-600">{m.specialite}</span>
              </p>
            )}
          />

          <Section
            title="Fournisseurs"
            items={results.fournisseurs}
            render={(f) => (
              <p>
                <span className="font-semibold">{f.nom}</span> —{" "}
                <span className="text-green-600">{f.specialite}</span>
              </p>
            )}
          />

          <Section
            title="Pièces"
            items={results.pieces}
            render={(p) => (
              <p>
                <span className="font-semibold">{p.nom}</span> —{" "}
                <span className="text-purple-600">{p.modele}</span>
              </p>
            )}
          />

          {/* Mots-clés détectés */}
          <section className="bg-white shadow rounded-2xl p-4">
            <h2 className="text-lg font-bold mb-3 border-b pb-1">
              🧠 Mots-clés détectés
            </h2>
            <div className="flex flex-wrap gap-2">
              {results.ai_keywords?.map((kw, i) => (
                <div
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm shadow"
                >
                  <span className="font-semibold">{kw.type || "?"}</span> •{" "}
                  <span className="text-blue-600">{kw.specialite}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
