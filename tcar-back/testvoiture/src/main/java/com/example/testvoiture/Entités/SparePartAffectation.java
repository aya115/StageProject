package com.example.testvoiture.Entités;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;


import jakarta.persistence.*;

@Entity
public class SparePartAffectation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int duree; // durée de vie en mois


    @ManyToOne
    @JoinColumn(name = "voiture_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Voiture voiture;

    @ManyToOne
    @JoinColumn(name = "spare_part_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private SparePart sparePart;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User participant;

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public Voiture getVoiture() {
        return voiture;
    }

    public void setVoiture(Voiture voiture) {
        this.voiture = voiture;
    }

    public SparePart getSparePart() {
        return sparePart;
    }

    public void setSparePart(SparePart sparePart) {
        this.sparePart = sparePart;
    }

    public User getParticipant() {
        return participant;
    }

    public void setParticipant(User participant) {
        this.participant = participant;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

