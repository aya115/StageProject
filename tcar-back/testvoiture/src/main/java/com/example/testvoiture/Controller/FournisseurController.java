package com.example.testvoiture.Controller;

import com.example.testvoiture.Entités.Fournisseur;
import com.example.testvoiture.Service.FournisseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fournisseurs")
@CrossOrigin(origins = "http://localhost:3000")
public class FournisseurController {

    @Autowired
    private FournisseurService service;

    @PostMapping
    public Fournisseur create(@RequestBody Fournisseur fournisseur) {
        return service.ajouterFournisseur(fournisseur);
    }

    @GetMapping
    public List<Fournisseur> getAll() {
        return service.getAllFournisseurs();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/assign")
    public void assignPiece(@RequestParam Long idpfour, @RequestParam Long idpiece) {
        service.assignPieceToFournisseur(idpfour, idpiece);
    }
    @PutMapping("/{id}")
    public Fournisseur updateFournisseur(@PathVariable Long id, @RequestBody Fournisseur fournisseur) {
        fournisseur.setId(id); // très important
        return service.ajouterFournisseur(fournisseur); // même méthode que create si elle fait save()
    }

}
