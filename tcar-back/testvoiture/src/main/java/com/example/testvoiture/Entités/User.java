package com.example.testvoiture.Entités;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String role;

    // Champs spécifiques au participant
    @Column(name = "adresse_participant")
    private String adresseParticipant;

    @Column(name = "telephone_participant")
    private String telephoneParticipant;
    @Column(name = "email_participant")
    private String emailParticipant;
    // Champs spécifiques à l'entreprise
    @Column(name = "nom_entreprise")
    private String nomEntreprise;

    @Column(name = "adresse_entreprise")
    private String adresseEntreprise;
    @Column(name = "email_entreprise")
    private String emailEntreprise;
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAdresseParticipant() { return adresseParticipant; }
    public void setAdresseParticipant(String adresseParticipant) { this.adresseParticipant = adresseParticipant; }

    public String getTelephoneParticipant() { return telephoneParticipant; }
    public void setTelephoneParticipant(String telephoneParticipant) { this.telephoneParticipant = telephoneParticipant; }

    public String getNomEntreprise() { return nomEntreprise; }
    public void setNomEntreprise(String nomEntreprise) { this.nomEntreprise = nomEntreprise; }

    public String getAdresseEntreprise() { return adresseEntreprise; }
    public void setAdresseEntreprise(String adresseEntreprise) { this.adresseEntreprise = adresseEntreprise; }

    public String getEmailParticipant() {
        return emailParticipant;
    }

    public void setEmailParticipant(String emailParticipant) {
        this.emailParticipant = emailParticipant;
    }

    public String getEmailEntreprise() {
        return emailEntreprise;
    }

    public void setEmailEntreprise(String emailEntreprise) {
        this.emailEntreprise = emailEntreprise;
    }
}
