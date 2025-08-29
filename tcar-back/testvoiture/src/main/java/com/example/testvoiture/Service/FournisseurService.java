package com.example.testvoiture.Service;

import com.example.testvoiture.Entités.Fournisseur;
import com.example.testvoiture.Entités.SparePart;
import com.example.testvoiture.Repository.FournisseurRepository;
import com.example.testvoiture.Repository.SparePartAffectationRepository;
import com.example.testvoiture.Repository.SparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FournisseurService {

    @Autowired
    private FournisseurRepository fournisseurRepository;

    @Autowired
    private SparePartRepository sparePartRepository;


    public Fournisseur ajouterFournisseur(Fournisseur fournisseur) {
        Set<SparePart> piecesFinales = new HashSet<>();

        if (fournisseur.getPieces() != null) {
            for (SparePart piece : fournisseur.getPieces()) {
                sparePartRepository.findById(piece.getId()).ifPresent(piecesFinales::add);
            }
        }

        fournisseur.setPieces(piecesFinales);
        return fournisseurRepository.saveAndFlush(fournisseur); // FORCER LE LIEN
    }

    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurRepository.findAll();
    }

    public void delete(Long id) {
        fournisseurRepository.deleteById(id);
    }

    public void assignPieceToFournisseur(Long idFournisseur, Long idPiece) {
        Optional<Fournisseur> optFour = fournisseurRepository.findById(idFournisseur);
        Optional<SparePart> optPiece = sparePartRepository.findById(idPiece);

        if (optFour.isPresent() && optPiece.isPresent()) {
            Fournisseur fournisseur = optFour.get();
            fournisseur.getPieces().add(optPiece.get());
            fournisseurRepository.save(fournisseur);
        }
    }

}
