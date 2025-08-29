package com.example.testvoiture.Repository;

import com.example.testvoiture.Entités.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoitureRepository extends JpaRepository<Voiture, Long> {
    List<Voiture> findByParticipantId(Long participantId);
    long countByParticipantId(Long participantId);

}
