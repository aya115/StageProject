package com.example.testvoiture.Entités;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Fournisseur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String adresse;
    private String specialite;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "fournisseur_piece",
            joinColumns = @JoinColumn(name = "fournisseur_id"),
            inverseJoinColumns = @JoinColumn(name = "piece_id")
    )
    private Set<SparePart> pieces ;


    // Getters & Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }

    public void setNom(String nom) { this.nom = nom; }

    public String getAdresse() { return adresse; }

    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getSpecialite() { return specialite; }

    public void setSpecialite(String specialite) { this.specialite = specialite; }

    public Set<SparePart> getPieces() { return pieces; }

    public void setPieces(Set<SparePart> pieces) { this.pieces = pieces; }
}
