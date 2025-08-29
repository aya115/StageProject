    package com.example.testvoiture.Controller;

    import com.example.testvoiture.Entités.SparePartAffectation;
    import com.example.testvoiture.Service.SparePartAffectationService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/affectations")
    @CrossOrigin(origins = "*")
    public class SparePartAffectationController {

        @Autowired
        private SparePartAffectationService service;

        @PostMapping
        public SparePartAffectation create(@RequestBody SparePartAffectation affectation) {
            System.out.println("Données reçues : " + affectation);

            return service.save(affectation);
        }

        @GetMapping("/participant/{id}")
        public List<SparePartAffectation> getByParticipant(@PathVariable Long id) {
            return service.getByParticipant(id);
        }

        @GetMapping
        public List<SparePartAffectation> getAll() {
            return service.getAll();
        }

        @DeleteMapping("/{id}")
        public void delete(@PathVariable Long id) {
            service.delete(id);
        }
        @PutMapping("/{id}")
        public SparePartAffectation update(@PathVariable Long id, @RequestBody SparePartAffectation updatedAffectation) {
            updatedAffectation.setId(id); // assure-toi que l'ID est bien défini
            return service.save(updatedAffectation);
        }

    }
