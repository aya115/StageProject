// src/main/java/com/example/testvoiture/Controller/ChatController.java
package com.example.testvoiture.Controller;

import com.example.testvoiture.Entités.ChatMessage;
import com.example.testvoiture.Service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {
    private final ChatService service;

    public ChatController(ChatService service) {
        this.service = service;
    }

    // GET historique
    @GetMapping("/history/{userId}")
    public List<ChatMessage> history(@PathVariable Long userId) {
        return service.history(userId);
    }

    // POST question
    @PostMapping("/ask")
    public List<ChatMessage> ask(@RequestBody Map<String, String> body) {
        Long userId = Long.parseLong(body.get("userId"));
        String message = body.get("message");

        service.addUserMessage(userId, message);
        String reply = service.generateReply(message);
        service.addBotMessage(userId, reply);

        return service.history(userId);
    }
}
