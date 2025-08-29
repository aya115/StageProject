package com.example.testvoiture.Entités;


import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class ChatMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;                // id du user connecté (participant OU entreprise)
    private String sender;              // "USER" ou "BOT"
    @Column(length = 2000)
    private String content;
    private Instant createdAt = Instant.now();

    public ChatMessage() {}
    public ChatMessage(Long userId, String sender, String content) {
        this.userId = userId;
        this.sender = sender;
        this.content = content;
        this.createdAt = Instant.now();
    }

    // getters/setters
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
