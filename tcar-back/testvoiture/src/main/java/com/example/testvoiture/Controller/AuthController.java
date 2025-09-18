package com.example.testvoiture.Controller;

import com.example.testvoiture.Dto.AuthRequestDTO;
import com.example.testvoiture.Dto.SignupRequest;
import com.example.testvoiture.Entités.User;
import com.example.testvoiture.Repository.UserRepository;
import com.example.testvoiture.Service.AuthService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository; // ✅ injecté correctement

    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ injecté

    @Autowired
    private JavaMailSender mailSender; // ✅ injecté

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest dto) {
        try {
            User user = authService.register(dto);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDTO dto) {
        try {
            User user = authService.login(dto);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // ✅ Forgot password
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email introuvable"));

        // Générer un mot de passe aléatoire
        String newPassword = RandomStringUtils.randomAlphanumeric(8);

        // Hasher le mot de passe
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Envoyer email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Nouveau mot de passe ICARS");
        message.setText("Votre nouveau mot de passe est : " + newPassword);
        mailSender.send(message);

        return ResponseEntity.ok("Un email avec le nouveau mot de passe a été envoyé !");
    }
   
}
