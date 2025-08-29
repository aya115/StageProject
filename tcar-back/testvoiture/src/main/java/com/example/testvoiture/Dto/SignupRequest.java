package com.example.testvoiture.Dto;

public class SignupRequest {
    public String username;
    public String password;
    public String role;

    public EntrepriseDTO entreprise;
    public ParticipantDTO participant;

    public static class EntrepriseDTO {
        public String nom;
        public String adresse;
        public String email;

    }

    public static class ParticipantDTO {
        public String adresse;
        public String telephone;
        public String email;

    }
}
