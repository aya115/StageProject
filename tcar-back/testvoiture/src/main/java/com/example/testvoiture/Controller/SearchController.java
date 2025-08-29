package com.example.testvoiture.Controller;

import com.example.testvoiture.Entités.Fournisseur;
import com.example.testvoiture.Entités.Mecanicien;
import com.example.testvoiture.Entités.SparePart;
import com.example.testvoiture.Repository.FournisseurRepository;
import com.example.testvoiture.Repository.MecanicienRepository;
import com.example.testvoiture.Repository.SparePartRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:3000") // ton frontend
public class SearchController {

    @Autowired
    private MecanicienRepository mecanicienRepository;

    @Autowired
    private FournisseurRepository fournisseurRepository;

    @Autowired
    private SparePartRepository sparePartRepository;

    // ✅ Endpoint recherche avec keyword libre
    @PostMapping
    public ResponseEntity<Map<String, Object>> search(@RequestBody Map<String, String> request) {
        String keyword = request.get("keyword");
        if (keyword == null || keyword.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mot-clé manquant"));
        }

        // 🔍 Extraire type et spécialité depuis la phrase
        String lowerKeyword = keyword.toLowerCase();
        String type = "";
        String specialite = "";

        if (lowerKeyword.contains("mecanicien")) type = "mecanicien";
        if (lowerKeyword.contains("fournisseur")) type = "fournisseur";
        if (lowerKeyword.contains("pièce") || lowerKeyword.contains("piece")) type = "piece";

        if (lowerKeyword.contains("golf")) specialite = "golf";
        if (lowerKeyword.contains("mercedes")) specialite = "mercedes";
        if (lowerKeyword.contains("kia")) specialite = "kia";

        // 🔎 Préparer la réponse
        Map<String, Object> result = new HashMap<>();
        List<Mecanicien> mecaniciens = new ArrayList<>();
        List<Fournisseur> fournisseurs = new ArrayList<>();
        List<SparePart> pieces = new ArrayList<>();

        // Exécuter selon type détecté
        switch (type) {
            case "mecanicien":
                mecaniciens = mecanicienRepository.findBySpecialiteContainingIgnoreCase(specialite);
                break;
            case "fournisseur":
                fournisseurs = fournisseurRepository.findBySpecialiteContainingIgnoreCase(specialite);
                break;
            case "piece":
                pieces = sparePartRepository.findByModeleContainingIgnoreCase(specialite);
                break;
            default:
                // si aucun type trouvé → tout chercher
                mecaniciens = mecanicienRepository.findBySpecialiteContainingIgnoreCase(specialite);
                fournisseurs = fournisseurRepository.findBySpecialiteContainingIgnoreCase(specialite);
                pieces = sparePartRepository.findByModeleContainingIgnoreCase(specialite);
        }

        result.put("mecaniciens", mecaniciens);
        result.put("fournisseurs", fournisseurs);
        result.put("pieces", pieces);
        result.put("ai_keywords", Map.of("type", type, "specialite", specialite));

        return ResponseEntity.ok(result);
    }

    // ✅ Endpoint pour charger toutes les données (au démarrage)
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> result = new HashMap<>();
        result.put("mecaniciens", mecanicienRepository.findAll());
        result.put("fournisseurs", fournisseurRepository.findAll());
        result.put("pieces", sparePartRepository.findAll());
        return ResponseEntity.ok(result);
    }
}
