import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
    const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:8081/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Erreur réseau !");
      console.error(err);
    }
  };

  return (
<div className="login-wrapper">
      <div className="login-container">
        <div className="login-left">
          <div className="overlay">
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-google"></i>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="logo">
            <i className="fas fa-car-side"></i>
            <span>ICARS</span>
          </div>
		        <h2>Mot de passe oublié</h2>

          <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Réinitialiser</button>
    <button type="button" onClick={() => navigate("/login")}>
  Login
</button>
       

      </form>
	   {message && <p>{message}</p>}
    </div>
        </div>
    </div>

  );
}
      

export default ForgotPassword;
