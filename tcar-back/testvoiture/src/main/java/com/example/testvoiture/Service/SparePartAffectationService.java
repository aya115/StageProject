package com.example.testvoiture.Service;

import com.example.testvoiture.Entités.SparePartAffectation;
import com.example.testvoiture.Repository.SparePartAffectationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SparePartAffectationService {

    @Autowired
    private SparePartAffectationRepository repository;

    public SparePartAffectation save(SparePartAffectation affectation) {
        return repository.save(affectation);
    }

    public List<SparePartAffectation> getByParticipant(Long participantId) {
        return repository.findByParticipantId(participantId);
    }

    public List<SparePartAffectation> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
