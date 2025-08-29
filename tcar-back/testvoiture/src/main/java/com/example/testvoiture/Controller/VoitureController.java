package com.example.testvoiture.Controller;

import com.example.testvoiture.Entités.User;
import com.example.testvoiture.Entités.Voiture;
import com.example.testvoiture.Repository.UserRepository;
import com.example.testvoiture.Repository.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/voitures")
@CrossOrigin(origins = "*")
public class VoitureController {

    @Autowired
    private VoitureRepository voitureRepo;

    @Autowired
    private UserRepository userRepo;

    // ➕ CREATE
    @PostMapping
    public ResponseEntity<?> ajouterVoiture(@RequestBody Voiture voiture) {
        if (voiture.getParticipant() == null || voiture.getParticipant().getId() == null) {
            return ResponseEntity.badRequest().body("Participant invalide");
        }

        User existingUser = userRepo.findById(voiture.getParticipant().getId()).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.badRequest().body("Utilisateur non trouvé");
        }

        voiture.setParticipant(existingUser);
        return ResponseEntity.ok(voitureRepo.save(voiture));
    }

    // 🔍 READ - Toutes les voitures d'un utilisateur
    @GetMapping("/user/{id}")
    public List<Voiture> getVoituresParUtilisateur(@PathVariable Long id) {
        return voitureRepo.findByParticipantId(id);
    }

    // 🔍 READ - Voiture par ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getVoitureById(@PathVariable Long id) {
        Optional<Voiture> voiture = voitureRepo.findById(id);
        return voiture.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Modifier une voiture
    @PutMapping("/{id}")
    public ResponseEntity<?> modifierVoiture(@PathVariable Long id, @RequestBody Voiture voitureModifiee) {
        return voitureRepo.findById(id).map(voiture -> {
            voiture.setKilometrage(voitureModifiee.getKilometrage());
            voiture.setModele(voitureModifiee.getModele());

            // ✅ Re-lier le participant si fourni
            if (voitureModifiee.getParticipant() != null && voitureModifiee.getParticipant().getId() != null) {
                User participant = userRepo.findById(voitureModifiee.getParticipant().getId()).orElse(null);
                if (participant != null) {
                    voiture.setParticipant(participant);
                }
            }


            return ResponseEntity.ok(voitureRepo.save(voiture));
        }).orElse(ResponseEntity.notFound().build());
    }


    // Supprimer une voiture
    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id).map(voiture -> {
            voitureRepo.delete(voiture);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

}
