package com.example.testvoiture.Controller;

import com.example.testvoiture.Dto.AuthRequestDTO;
import com.example.testvoiture.Dto.SignupRequest;
import com.example.testvoiture.Entités.User;
import com.example.testvoiture.Repository.UserRepository;
import com.example.testvoiture.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

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
        //Récupère l’objet envoyé (username, password) depuis le frontend.
        //
        //Transmet au service pour vérifier.
        try {
            User user = authService.login(dto);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}