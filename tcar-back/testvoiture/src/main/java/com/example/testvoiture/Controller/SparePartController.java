package com.example.testvoiture.Controller;

import com.example.testvoiture.Entités.Mecanicien;
import com.example.testvoiture.Entités.SparePart;
import com.example.testvoiture.Service.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/pieces")
@CrossOrigin(origins = "*")
public class SparePartController {

    @Autowired
    private SparePartService service;

    @PostMapping
    public SparePart createPiece(@RequestBody SparePart piece) {
        return service.save(piece);
    }

    @GetMapping
    public List<SparePart> getAll() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public SparePart updatePiece(@PathVariable Long id, @RequestBody SparePart piece) {
        piece.setId(id); // très important pour que JPA sache qu'on met à jour
        return service.save(piece); // save() fonctionne pour create et update
    }

}
