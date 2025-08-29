package com.example.testvoiture.Service;

import com.example.testvoiture.Entités.Fournisseur;
import com.example.testvoiture.Entités.Mecanicien;
import com.example.testvoiture.Entités.SparePart;
import com.example.testvoiture.Repository.FournisseurRepository;
import com.example.testvoiture.Repository.MecanicienRepository;
import com.example.testvoiture.Repository.SparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class SparePartService {

    @Autowired
    private SparePartRepository repo;

    @Autowired
    private FournisseurRepository fournisseurRepo;

    @Autowired
    private MecanicienRepository mecanicienRepo;

    public SparePart create(SparePart part, Set<Long> fournisseurIds, Set<Long> mecanicienIds) {
        // Récupérer les fournisseurs associés
        if (fournisseurIds != null) {
            List<Fournisseur> fournisseurs = fournisseurRepo.findAllById(fournisseurIds);
            part.getFournisseurs().addAll(fournisseurs);
        }

        // Récupérer les mécaniciens associés
        if (mecanicienIds != null) {
            List<Mecanicien> mecaniciens = mecanicienRepo.findAllById(mecanicienIds);
            part.getMecaniciens().addAll(mecaniciens);
        }

        return repo.save(part);
    }

    public SparePart save(SparePart piece) {
        return repo.save(piece);
    }

    public List<SparePart> findAll() {
        return repo.findAll();
    }


}
