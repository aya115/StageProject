package com.example.testvoiture.Dto;

public class AuthRequestDTO {
    private String username;
    private String password;
    private String role;

    // Champs pour Participant
    private String adresseParticipant;
    private String telephoneParticipant;
    private String emailParticipant;

    // Champs pour Entreprise
    private String nomEntreprise;
    private String adresseEntreprise;
    private String emailEntreprise;

    // Getters et Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAdresseParticipant() { return adresseParticipant; }
    public void setAdresseParticipant(String adresseParticipant) { this.adresseParticipant = adresseParticipant; }

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

    public String getTelephoneParticipant() { return telephoneParticipant; }
    public void setTelephoneParticipant(String telephoneParticipant) { this.telephoneParticipant = telephoneParticipant; }

    public String getNomEntreprise() { return nomEntreprise; }
    public void setNomEntreprise(String nomEntreprise) { this.nomEntreprise = nomEntreprise; }

    public String getAdresseEntreprise() { return adresseEntreprise; }
    public void setAdresseEntreprise(String adresseEntreprise) { this.adresseEntreprise = adresseEntreprise; }
}
