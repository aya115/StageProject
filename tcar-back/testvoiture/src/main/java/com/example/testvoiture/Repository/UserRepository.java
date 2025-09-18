package com.example.testvoiture.Repository;

import com.example.testvoiture.Entités.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;



public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username); // ✅ PAS besoin du password ici

    boolean existsByUsername(String username);

    // Chercher par email participant
    Optional<User> findByEmailParticipant(String emailParticipant);

    // Chercher par email entreprise
    Optional<User> findByEmailEntreprise(String emailEntreprise);

    ///////////////////////////

    // Méthode utilitaire pour ne pas dupliquer
    default Optional<User> findByEmail(String email) {
        Optional<User> user = findByEmailParticipant(email);
        if (user.isPresent()) return user;
        return findByEmailEntreprise(email);
    }
}