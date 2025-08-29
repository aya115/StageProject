package com.example.testvoiture.Repository;

import com.example.testvoiture.Entités.Mecanicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MecanicienRepository extends JpaRepository<Mecanicien, Long> {
    List<Mecanicien> findTop10BySpecialiteContainingIgnoreCase(String specialite);

    List<Mecanicien> findTop10ByNomContainingIgnoreCaseOrAdresseContainingIgnoreCase(
            String nom, String adresse
    );

    @Query("select distinct lower(m.specialite) from Mecanicien m " +
            "where m.specialite is not null and m.specialite <> ''")
    List<String> findDistinctSpecialites();


    // 🔹 Recherche par spécialité (ignore majuscules/minuscules)
    List<Mecanicien> findBySpecialiteContainingIgnoreCase(String specialite);

    // 🔹 Récupérer toutes les spécialités distinctes
    @Query("SELECT DISTINCT m.specialite FROM Mecanicien m")
    List<String> findAllSpecialites();

}
