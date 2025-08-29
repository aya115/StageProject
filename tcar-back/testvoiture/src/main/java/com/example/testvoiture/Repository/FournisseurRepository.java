package com.example.testvoiture.Repository;

import com.example.testvoiture.Entités.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {
    List<Fournisseur> findTop10BySpecialiteContainingIgnoreCase(String specialite);

    List<Fournisseur> findTop10ByNomContainingIgnoreCaseOrSpecialiteContainingIgnoreCaseOrAdresseContainingIgnoreCase(
            String nom, String specialite, String adresse
    );

    @Query("select distinct lower(f.specialite) from Fournisseur f " +
            "where f.specialite is not null and f.specialite <> ''")
    List<String> findDistinctSpecialites();

    List<Fournisseur> findBySpecialiteContainingIgnoreCase(String specialite);

    @Query("SELECT DISTINCT f.specialite FROM Fournisseur f")
    List<String> findAllSpecialites();
}
