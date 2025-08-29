package com.example.testvoiture.Service;

import com.example.testvoiture.Entités.Fournisseur;
import com.example.testvoiture.Entités.Mecanicien;
import com.example.testvoiture.Entités.SparePart;
import com.example.testvoiture.Repository.FournisseurRepository;
import com.example.testvoiture.Repository.MecanicienRepository;
import com.example.testvoiture.Repository.SparePartRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final MecanicienRepository mecanicienRepo;
    private final FournisseurRepository fournisseurRepo;
    private final SparePartRepository sparePartRepo;

    public SearchService(MecanicienRepository m, FournisseurRepository f, SparePartRepository s) {
        this.mecanicienRepo = m;
        this.fournisseurRepo = f;
        this.sparePartRepo = s;
    }

    public Map<String, List<?>> search(String keyword) {
        String q = keyword.toLowerCase().trim();
        String[] mots = q.split("[,\\s]+");

        List<Mecanicien> mecaniciens = mecanicienRepo.findAll().stream()
                .filter(m -> containsAny(m.getNom() + " " + m.getSpecialite() + " " + m.getAdresse(), mots))
                .collect(Collectors.toList());

        List<Fournisseur> fournisseurs = fournisseurRepo.findAll().stream()
                .filter(f -> containsAny(f.getNom() + " " + f.getSpecialite() + " " + f.getAdresse(), mots))
                .collect(Collectors.toList());

        List<SparePart> pieces = sparePartRepo.findAll().stream()
                .filter(p -> containsAny(p.getNom() + " " + p.getModele(), mots))
                .collect(Collectors.toList());

        Map<String, List<?>> results = new HashMap<>();
        results.put("mecaniciens", mecaniciens);
        results.put("fournisseurs", fournisseurs);
        results.put("pieces", pieces); // 🔹 clé correspond au frontend
        results.put("ai_keywords", List.of(keyword));
        return results;
    }

    private boolean containsAny(String text, String[] mots) {
        text = text.toLowerCase();
        for (String mot : mots) {
            if (text.contains(mot)) return true;
        }
        return false;
    }
}
