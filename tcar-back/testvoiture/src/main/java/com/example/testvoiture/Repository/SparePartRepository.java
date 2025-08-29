package com.example.testvoiture.Repository;

import com.example.testvoiture.Entités.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SparePartRepository extends JpaRepository<SparePart,Long> {
    List<SparePart> findTop10ByNomContainingIgnoreCaseOrModeleContainingIgnoreCase(
            String nom, String modele
    );

    @Query("select distinct lower(s.modele) from SparePart s " +
            "where s.modele is not null and s.modele <> ''")
    List<String> findDistinctModeles();
    List<SparePart> findTop10ByModeleContainingIgnoreCase(String modele);

    List<SparePart> findByModeleContainingIgnoreCase(String modele);

    @Query("SELECT DISTINCT p.modele FROM SparePart p")
    List<String> findAllModeles();
}
