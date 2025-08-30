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

        // 🔎 Détection du type
        String type = "";
        if (q.contains("mecanicien")) type = "mecanicien";
        else if (q.contains("fournisseur")) type = "fournisseur";
        else if (q.contains("piece") || q.contains("pièce")) type = "piece";

        // 🔎 Récupérer toutes les spécialités depuis la base
        Set<String> specialitesDB = new HashSet<>();
        specialitesDB.addAll(mecanicienRepo.findAll().stream()
                .map(m -> m.getSpecialite().toLowerCase())
                .toList());
        specialitesDB.addAll(fournisseurRepo.findAll().stream()
                .map(f -> f.getSpecialite().toLowerCase())
                .toList());
        specialitesDB.addAll(sparePartRepo.findAll().stream()
                .map(p -> p.getModele().toLowerCase())
                .toList());

        // 🔎 Détection dynamique de la spécialité dans la phrase
        String specialite = Arrays.stream(mots)
                .filter(specialitesDB::contains) // garde seulement les mots qui existent dans la base
                .findFirst()
                .orElse("");

        // 🔎 Résultats
        List<Mecanicien> mecaniciens = new ArrayList<>();
        List<Fournisseur> fournisseurs = new ArrayList<>();
        List<SparePart> pieces = new ArrayList<>();

        if (type.equals("mecanicien") || type.isEmpty()) {
            mecaniciens = mecanicienRepo.findAll().stream()
                    .filter(m -> containsAny(m.getNom() + " " + m.getSpecialite() + " " + m.getAdresse(), mots))
                    .filter(m -> specialite.isEmpty() || m.getSpecialite().equalsIgnoreCase(specialite))
                    .collect(Collectors.toList());
        }

        if (type.equals("fournisseur") || type.isEmpty()) {
            fournisseurs = fournisseurRepo.findAll().stream()
                    .filter(f -> containsAny(f.getNom() + " " + f.getSpecialite() + " " + f.getAdresse(), mots))
                    .filter(f -> specialite.isEmpty() || f.getSpecialite().equalsIgnoreCase(specialite))
                    .collect(Collectors.toList());
        }

        if (type.equals("piece") || type.isEmpty()) {
            pieces = sparePartRepo.findAll().stream()
                    .filter(p -> containsAny(p.getNom() + " " + p.getModele(), mots))
                    .filter(p -> specialite.isEmpty() || p.getModele().equalsIgnoreCase(specialite))
                    .collect(Collectors.toList());
        }

        Map<String, List<?>> results = new HashMap<>();
        results.put("mecaniciens", mecaniciens);
        results.put("fournisseurs", fournisseurs);
        results.put("pieces", pieces);
        results.put("ai_keywords", List.of(Map.of("raw", keyword, "type", type, "specialite", specialite)));

        return results;
    }

    private boolean containsAny(String text, String[] mots) {
        text = text.toLowerCase();
        for (String mot : mots) {
            if (text.contains(mot)) return true;
        }
        return false;
    }

    // 🔹 pour /all
    public List<Mecanicien> getAllMecaniciens() { return mecanicienRepo.findAll(); }
    public List<Fournisseur> getAllFournisseurs() { return fournisseurRepo.findAll(); }
    public List<SparePart> getAllPieces() { return sparePartRepo.findAll(); }
}
