package com.example.testvoiture.Repository;

import com.example.testvoiture.Entités.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.testvoiture.Entités.SparePartAffectation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SparePartAffectationRepository extends JpaRepository<SparePartAffectation, Long> {
    List<SparePartAffectation> findByParticipantId(Long participantId);

}

