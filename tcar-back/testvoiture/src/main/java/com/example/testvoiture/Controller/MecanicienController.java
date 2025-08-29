package com.example.testvoiture.Controller;

import com.example.testvoiture.Entités.Fournisseur;
import com.example.testvoiture.Entités.Mecanicien;
import com.example.testvoiture.Service.MecanicienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/mecaniciens")
@CrossOrigin(origins = "http://localhost:3000")
public class MecanicienController {

    @Autowired
    private MecanicienService service;

    @GetMapping
    public List<Mecanicien> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Mecanicien create(@RequestBody Mecanicien mecanicien) {
        return service.ajouterMecanicien(mecanicien);  // délègue au service
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    @PutMapping("/assign")
    public void assignPiece(@RequestParam Long idpmec, @RequestParam Long idpiece) {
        service.assignPieceToMecanicien(idpmec,idpiece);
    }
    @PutMapping("/{id}")
    public Mecanicien updateMecanicien(@PathVariable Long id, @RequestBody Mecanicien mecanicien) {
        mecanicien.setId(id); // très important
        return service.ajouterMecanicien(mecanicien); // même méthode que create si elle fait save()
    }
}
