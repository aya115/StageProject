package com.example.testvoiture.Service;

import com.example.testvoiture.Entités.Mecanicien;
import com.example.testvoiture.Entités.SparePart;
import com.example.testvoiture.Repository.MecanicienRepository;
import com.example.testvoiture.Repository.SparePartAffectationRepository;
import com.example.testvoiture.Repository.SparePartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MecanicienService {

    @Autowired
    private MecanicienRepository mecanicienRepository;

    @Autowired
    private SparePartRepository sparePartRepository;
    @Transactional


    public List<Mecanicien> getAll() {
        return mecanicienRepository.findAll();
    }

    public void delete(Long id) {
        mecanicienRepository.deleteById(id);
    }

    public void assignPieceToMecanicien(Long idMeca, Long idPiece) {
        Optional<Mecanicien> optFour = mecanicienRepository.findById(idMeca);
        Optional<SparePart> optPiece = sparePartRepository.findById(idPiece);

        if (optFour.isPresent() && optPiece.isPresent()) {
            Mecanicien mecanicien = optFour.get();
            mecanicien.getPieces().add(optPiece.get());
            mecanicienRepository.save(mecanicien);
        }
    }
    public Mecanicien ajouterMecanicien(Mecanicien mecanicien) {
        Set<SparePart> piecesFinales = new HashSet<>();

        if (mecanicien.getPieces() != null) {
            for (SparePart piece : mecanicien.getPieces()) {
                sparePartRepository.findById(piece.getId()).ifPresent(piecesFinales::add);
            }
        }

        mecanicien.setPieces(piecesFinales);
        return mecanicienRepository.saveAndFlush(mecanicien); // FORCER LE LIEN
    }
}
