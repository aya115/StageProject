import React from 'react';
import '../styles/HomePage.css';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';

const HomePage = () => {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">🚗 ICARS</div>
        <ul className="nav-links">
          <li><a href="#hero">Accueil</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">À propos</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/login" className="btn-login">Login</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Bienvenue sur <span className="highlight">ICARS</span></h1>
          <p>La solution complète pour gérer vos véhicules, mécaniciens et pièces simplement.</p>
          <div className="hero-buttons">
            <a href="#services" className="btn-primary">Commencer maintenant</a>
            <a href="#about" className="btn-secondary">En savoir plus</a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <h2>Nos Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>🚗 Gestion de flotte</h3>
            <p>Suivez vos véhicules et planifiez leur entretien facilement.</p>
          </div>
          <div className="service-card">
            <h3>🔧 Gestion des pièces</h3>
            <p>Surveillez vos stocks et évitez les ruptures.</p>
          </div>
          <div className="service-card">
            <h3>🏭 Fournisseurs</h3>
            <p>Centralisez vos partenaires et vos commandes.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-text">
          <h2>À propos</h2>
          <p>
            ICARS vous accompagne dans la gestion efficace de votre flotte automobile. 
            Notre plateforme moderne simplifie vos opérations quotidiennes grâce à une interface intuitive.
          </p>
        </div>
        <div className="about-image">
          <img src={image2} alt="Femme travaillant" />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-text">
          <h2>Contact</h2>
          <p>Email : contact@icars.tn</p>
          <p>Tél : +216 12 345 678</p>

          <form className="contact-form">
            <input type="text" placeholder="Votre nom" required />
            <input type="email" placeholder="Votre email" required />
            <textarea placeholder="Votre message" required></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </div>
        <div className="contact-image">
          <img src={image3} alt="Support client" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 ICARS | Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default HomePage;
