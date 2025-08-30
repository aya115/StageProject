const API_BASE_URL = "http://localhost:8081/auth";

// Enregistrement
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Échec de l'inscription");
  }

  return await response.json();
};

// Connexion
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Échec de la connexion");
  }

  return await response.json();
};
