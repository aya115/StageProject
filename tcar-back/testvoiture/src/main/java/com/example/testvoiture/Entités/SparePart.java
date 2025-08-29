package com.example.testvoiture.Entités;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class SparePart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String modele;

    @ManyToMany(mappedBy = "pieces")
    @JsonIgnore // évite les références circulaires
    private Set<Fournisseur> fournisseurs;

    @ManyToMany(mappedBy = "pieces")
    @JsonIgnore
    private Set<Mecanicien> mecaniciens;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public Set<Fournisseur> getFournisseurs() {
        return fournisseurs;
    }

    public void setFournisseurs(Set<Fournisseur> fournisseurs) {
        this.fournisseurs = fournisseurs;
    }

    public Set<Mecanicien> getMecaniciens() {
        return mecaniciens;
    }

    public void setMecaniciens(Set<Mecanicien> mecaniciens) {
        this.mecaniciens = mecaniciens;
    }


}