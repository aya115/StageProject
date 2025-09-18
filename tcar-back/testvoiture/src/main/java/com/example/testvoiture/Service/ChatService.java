// ChatService.java
package com.example.testvoiture.Service;

import com.example.testvoiture.Entités.ChatMessage;
import com.example.testvoiture.Entités.Fournisseur;
import com.example.testvoiture.Entités.Mecanicien;
import com.example.testvoiture.Entités.SparePart;
import com.example.testvoiture.Repository.ChatMessageRepository;
import com.example.testvoiture.Repository.FournisseurRepository;
import com.example.testvoiture.Repository.MecanicienRepository;
import com.example.testvoiture.Repository.SparePartRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatMessageRepository chatRepo;
    private final FournisseurRepository fournisseurRepo;
    private final MecanicienRepository mecanicienRepo;
    private final SparePartRepository spareRepo;

    // Lexiques dynamiques (alimentés depuis la BD)
    private volatile List<String> specFournisseurs = List.of();
    private volatile List<String> specMecaniciens  = List.of();
    private volatile List<String> modelesPieces    = List.of();

    public ChatService(ChatMessageRepository chatRepo,
                       FournisseurRepository fournisseurRepo,
                       MecanicienRepository mecanicienRepo,
                       SparePartRepository spareRepo) {
        this.chatRepo = chatRepo;
        this.fournisseurRepo = fournisseurRepo;
        this.mecanicienRepo = mecanicienRepo;
        this.spareRepo = spareRepo;
    }

    public List<ChatMessage> history(Long userId) {
        return chatRepo.findByUserIdOrderByCreatedAtAsc(userId);
    }
    public ChatMessage addUserMessage(Long userId, String content) {
        return chatRepo.save(new ChatMessage(userId, "USER", content));
    }
    public ChatMessage addBotMessage(Long userId, String content) {
        return chatRepo.save(new ChatMessage(userId, "BOT", content));
    }

    @jakarta.annotation.PostConstruct
    public void warmupLexicons() { refreshLexicons(); }

    @org.springframework.scheduling.annotation.Scheduled(fixedDelay = 5 * 60 * 1000L)
    public void refreshLexicons() {
        this.specFournisseurs = safeList(fournisseurRepo.findDistinctSpecialites());
        this.specMecaniciens  = safeList(mecanicienRepo.findDistinctSpecialites());
        this.modelesPieces    = safeList(spareRepo.findDistinctModeles());
    }
    private static List<String> safeList(List<String> in) {
        if (in == null) return List.of();
        return in.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .map(String::toLowerCase)
                .filter(s -> !s.isBlank())
                .distinct()
                .toList();
    }

    private static final List<String> KW_FOURNISSEUR = List.of("fournisseur","supplier","vendeur","grossiste","distributeur");
    private static final List<String> KW_MECANICIEN  = List.of("mecanicien","mécanicien","garage","garagiste","reparation","réparation","atelier");
    private static final List<String> KW_PIECE       = List.of("piece","pièce","pieces","pièces","spare","sparepart","spare part");

    public String generateReply(String question) {
        if (question == null || question.isBlank()) {
            return "Pose ta question 😉 (ex: *fournisseur kia*, *mécanicien renault*, *pièce filtre à huile*).";
        }

        String raw = question.trim();
        String q   = normalize(raw);

        boolean isFournisseur = containsAny(q, KW_FOURNISSEUR);
        boolean isMecanicien  = containsAny(q, KW_MECANICIEN);
        boolean isPiece       = containsAny(q, KW_PIECE);

        List<String> candidates = concat(specFournisseurs, specMecaniciens, modelesPieces /*, marquesPieces*/);
        String detected = bestDBTokenMatch(q, candidates);

        String critere = extractAfterAny(q, "pour","de","du","des","d","chez","a","à","sur");
        if (critere == null || critere.length() < 2) critere = q;

        if (isFournisseur) {
            String key = (detected != null ? detected : critere);
            List<Fournisseur> res = searchFournisseurs(key);
            if (res.isEmpty()) return "Aucun fournisseur trouvé pour: **" + raw + "**.";
            return formatFournisseurs(res);
        }

        if (isMecanicien) {
            String key = (detected != null ? detected : critere);
            List<Mecanicien> res = searchMecaniciens(key);
            if (res.isEmpty()) return "Aucun mécanicien trouvé pour: **" + raw + "**.";
            return formatMecaniciens(res);
        }

        if (isPiece) {
            String key = (detected != null ? detected : critere);
            List<SparePart> res = searchPieces(key);
            if (res.isEmpty()) return "Aucune pièce trouvée pour: **" + raw + "**.";
            return formatPieces(res);
        }

        if (detected != null) {
            List<Fournisseur> fs = searchFournisseurs(detected);
            List<Mecanicien>  ms = searchMecaniciens(detected);
            if (!fs.isEmpty() || !ms.isEmpty()) {
                StringBuilder sb = new StringBuilder();
                if (!fs.isEmpty()) sb.append("Fournisseurs **").append(detected).append("**:\n").append(formatFournisseurs(fs)).append("\n");
                if (!ms.isEmpty()) sb.append("Mécaniciens **").append(detected).append("**:\n").append(formatMecaniciens(ms));
                return sb.toString().trim();
            }
        }

        if (q.contains("ajout") && q.contains("voitur")) {
            return "Ajouter une voiture : **Mes Voitures** → Modèle + Kilométrage → **Ajouter**.";
        }
        if (q.contains("supprim") && q.contains("voitur")) {
            return "Supprimer une voiture : **Mes Voitures** → 🗑️ (si pas de pièces affectées).";
        }
        if (q.contains("affect") && (q.contains("piece") || q.contains("pièce"))) {
            return "Affecter une pièce : **Spare Parts** → voiture + pièce + durée → **Associer**.";
        }

        return "Je comprends **fournisseur**, **mécanicien**, **pièce** puis je compare ta spécialité/marque avec la base (même si je ne la “connais” pas).\n" +
                "Exemples : *fournisseur kia*, *garage mercedes*, *pièce filtre à huile toyota*.";
    }

    private List<Fournisseur> searchFournisseurs(String query) {
        List<Fournisseur> bySpec = fournisseurRepo.findTop10BySpecialiteContainingIgnoreCase(query);
        if (!bySpec.isEmpty()) return bySpec;
        return fournisseurRepo
                .findTop10ByNomContainingIgnoreCaseOrSpecialiteContainingIgnoreCaseOrAdresseContainingIgnoreCase(query, query, query);
    }

    private List<Mecanicien> searchMecaniciens(String query) {
        List<Mecanicien> bySpec = mecanicienRepo.findTop10BySpecialiteContainingIgnoreCase(query);
        if (!bySpec.isEmpty()) return bySpec;
        return mecanicienRepo.findTop10ByNomContainingIgnoreCaseOrAdresseContainingIgnoreCase(query, query);
    }

    private List<SparePart> searchPieces(String query) {
        return spareRepo.findTop10ByNomContainingIgnoreCaseOrModeleContainingIgnoreCase(query, query);
    }

    private String formatFournisseurs(List<Fournisseur> list) {
        return list.stream().map(f ->
                "- " + safe(f.getNom())
                        + opt(" — spécialité: ", f.getSpecialite())
                        + opt(" — adresse: ", f.getAdresse())
        ).collect(Collectors.joining("\n"));
    }

    private String formatMecaniciens(List<Mecanicien> list) {
        return list.stream().map(m ->
                "- " + safe(m.getNom())
                        + opt(" — spécialité: ", m.getSpecialite())
                        + opt(" — adresse: ", m.getAdresse())
        ).collect(Collectors.joining("\n"));
    }

    private String formatPieces(List<SparePart> list) {
        return list.stream().map(p ->
                "- " + safe(p.getNom())
                        + opt(" — modèle: ", p.getModele())
        ).collect(Collectors.joining("\n"));
    }

    private static String normalize(String s) {
        String n = java.text.Normalizer.normalize(s, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{M}", ""); // supprime accents
        n = n.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s-]", " ")
                .replaceAll("\\s+", " ")
                .trim();
        return n;
    }

    private static boolean containsAny(String text, List<String> kws) {
        for (String k : kws) if (text.contains(k)) return true;
        return false;
    }

    private static String extractAfterAny(String text, String... tokens) {
        for (String t : tokens) {
            Pattern p = Pattern.compile("\\b" + Pattern.quote(t) + "\\s+([^?.,:;!]+)");
            Matcher m = p.matcher(text);
            if (m.find()) return m.group(1).trim();
        }
        return null;
    }

    private static String opt(String label, String v) { return (v != null && !v.isBlank()) ? label + v : ""; }
    private static String safe(Object o){ return o==null? "" : o.toString(); }

    private static List<String> concat(List<String>... lists) {
        return Arrays.stream(lists).flatMap(List::stream).distinct().toList();
    }

    private static String bestDBTokenMatch(String question, List<String> candidates) {
        if (candidates == null || candidates.isEmpty()) return null;

        String[] qTokens = question.split("\\s+");
        String best = null;
        int bestScore = Integer.MAX_VALUE;

        for (String cand : candidates) {
            if (cand.length() < 2) continue;

            for (String t : qTokens) {
                if (t.length() >= 2 && (t.equals(cand) || cand.contains(t) || t.contains(cand))) {
                    return cand;
                }
            }
            for (String t : qTokens) {
                if (t.length() < 2) continue;
                int d = levenshtein(t, cand);
                if (d < bestScore) { bestScore = d; best = cand; }
            }
        }
        if (best != null && (bestScore <= 1 || (bestScore <= 2 && best.length() >= 5))) return best;
        return null;
    }

    private static int levenshtein(String a, String b) {
        int[][] dp = new int[a.length()+1][b.length()+1];
        for (int i=0;i<=a.length();i++) dp[i][0]=i;
        for (int j=0;j<=b.length();j++) dp[0][j]=j;
        for (int i=1;i<=a.length();i++) {
            for (int j=1;j<=b.length();j++) {
                int cost = (a.charAt(i-1)==b.charAt(j-1)) ? 0 : 1;
                dp[i][j] = Math.min(Math.min(dp[i-1][j]+1, dp[i][j-1]+1), dp[i-1][j-1]+cost);
            }
        }
        return dp[a.length()][b.length()];
    }
    // ChatService.java
    public Map<String, Long> countAsks() {
        List<ChatMessage> messages = chatRepo.findAll();

        long fournisseurs = messages.stream()
                .filter(m -> "USER".equals(m.getSender()))
                .filter(m -> containsAny(normalize(m.getContent()), KW_FOURNISSEUR))
                .count();

        long mecaniciens = messages.stream()
                .filter(m -> "USER".equals(m.getSender()))
                .filter(m -> containsAny(normalize(m.getContent()), KW_MECANICIEN))
                .count();

        long pieces = messages.stream()
                .filter(m -> "USER".equals(m.getSender()))
                .filter(m -> containsAny(normalize(m.getContent()), KW_PIECE))
                .count();

        Map<String, Long> stats = new HashMap<>();
        stats.put("fournisseurs", fournisseurs);
        stats.put("mecaniciens", mecaniciens);
        stats.put("pieces", pieces);

        return stats;
    }

}
