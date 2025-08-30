package com.example.testvoiture.Controller;

import com.example.testvoiture.Entités.Fournisseur;
import com.example.testvoiture.Entités.Mecanicien;
import com.example.testvoiture.Entités.SparePart;
import com.example.testvoiture.Repository.FournisseurRepository;
import com.example.testvoiture.Repository.MecanicienRepository;
import com.example.testvoiture.Repository.SparePartRepository;
import com.example.testvoiture.Service.SearchService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    // ✅ Endpoint recherche
    @PostMapping
    public ResponseEntity<Map<String, List<?>>> search(@RequestBody Map<String, String> request) {
        String keyword = request.get("keyword");
        if (keyword == null || keyword.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of());
        }
        return ResponseEntity.ok(searchService.search(keyword));
    }

    // ✅ Endpoint pour charger toutes les données (au démarrage)
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> result = new HashMap<>();
        result.put("mecaniciens", searchService.getAllMecaniciens());
        result.put("fournisseurs", searchService.getAllFournisseurs());
        result.put("pieces", searchService.getAllPieces());
        return ResponseEntity.ok(result);
    }
}
