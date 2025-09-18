package com.example.testvoiture.Controller;

import com.example.testvoiture.Repository.FournisseurRepository;
import com.example.testvoiture.Repository.MecanicienRepository;
import com.example.testvoiture.Repository.SparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private MecanicienRepository mecanicienRepo;

    @Autowired
    private FournisseurRepository fournisseurRepo;

    @Autowired
    private SparePartRepository pieceRepo;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("mecaniciens", mecanicienRepo.count());
        stats.put("fournisseurs", fournisseurRepo.count());
        stats.put("pieces", pieceRepo.count());
        stats.put("notifications", 12); // Exemple fixe ou dynamique
        return stats;
    }
    // ---- PIECHART : Pièces affectées par mécanicien ----
    @GetMapping("/pie/mecanicien")
    public Map<String, Object> getPieByMecanicien() {
        Map<String, Long> repartition = pieceRepo.findAll()
                .stream()
                .flatMap(p -> p.getMecaniciens().stream()
                        .map(m -> p.getNom())) // pièces liées aux mécaniciens
                .collect(Collectors.groupingBy(
                        pieceName -> pieceName,
                        Collectors.counting()
                ));

        Map<String, Object> response = new HashMap<>();
        response.put("labels", repartition.keySet());   // noms des pièces
        response.put("values", repartition.values());   // combien de fois affectées
        return response;
    }

    @GetMapping("/pie/fournisseur")
    public Map<String, Object> getPieByFournisseur() {
        Map<String, Long> repartition = pieceRepo.findAll()
                .stream()
                .flatMap(p -> p.getFournisseurs().stream()
                        .map(f -> p.getNom())) // au lieu de compter par fournisseur, on prend les noms de pièces
                .collect(Collectors.groupingBy(
                        pieceName -> pieceName,
                        Collectors.counting()
                ));

        Map<String, Object> response = new HashMap<>();
        response.put("labels", repartition.keySet());   // noms des pièces
        response.put("values", repartition.values());   // combien de fois chaque pièce est affectée à un fournisseur
        return response;
    }


    // ---- LINECHART ----
    @GetMapping("/line")
    public Map<String, Object> getLineChartData() {
        long fournisseurs = fournisseurRepo.count();
        long mecaniciens = mecanicienRepo.count();

        Map<String, Object> response = new HashMap<>();
        response.put("labels", Arrays.asList("Fournisseurs", "Mécaniciens"));
        response.put("values", Arrays.asList(fournisseurs, mecaniciens));
        return response;

}
}

