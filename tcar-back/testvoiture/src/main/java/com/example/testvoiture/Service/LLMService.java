package com.example.testvoiture.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class LLMService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String analyzeQuery(String query) {
        try {
            String url = "https://api.openai.com/v1/chat/completions";

            // ⚡ Prompt : on force l’IA à renvoyer du JSON simple
            String prompt = "Analyse la requête utilisateur et renvoie uniquement un JSON avec deux champs : " +
                    "type (fournisseur, mecanicien ou piece) et specialite (ex: kia, toyota, etc). " +
                    "Exemple: {\"type\":\"fournisseur\", \"specialite\":\"kia\"}. " +
                    "Requête : \"" + query + "\"";

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-4o-mini");
            body.put("messages", new Object[]{
                    Map.of("role", "system", "content", "Tu es un assistant qui répond toujours en JSON."),
                    Map.of("role", "user", "content", prompt)
            });

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

            JsonNode root = objectMapper.readTree(response.getBody());
            String content = root.path("choices").get(0).path("message").path("content").asText();

            return content;

        } catch (Exception e) {
            return "{\"type\":\"generic\", \"specialite\":\"\"}";
        }
    }
}
