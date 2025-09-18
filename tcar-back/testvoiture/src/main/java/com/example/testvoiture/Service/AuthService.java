package com.example.testvoiture.Service;

import com.example.testvoiture.Dto.AuthRequestDTO;
import com.example.testvoiture.Dto.SignupRequest;
import com.example.testvoiture.Entités.User;
import com.example.testvoiture.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private  EmailService emailService;


    public User register(SignupRequest dto) {

        //tchoufuser mawjoud fil base wala le
        if (userRepository.existsByUsername(dto.username)) {
            throw new RuntimeException("Nom d'utilisateur déjà utilisé !");
        }

        if ("ADMIN".equalsIgnoreCase(dto.role)) {
            throw new RuntimeException("Création de compte ADMIN non autorisée !");
        }

        User user = new User();
        user.setUsername(dto.username);
        user.setPassword(passwordEncoder.encode(dto.password));
        user.setRole(dto.role);

        if ("PARTICIPANT".equalsIgnoreCase(dto.role) && dto.participant != null) {
            user.setAdresseParticipant(dto.participant.adresse);
            user.setTelephoneParticipant(dto.participant.telephone);
            user.setEmailParticipant(dto.participant.email);
        }

        if ("ENTREPRISE".equalsIgnoreCase(dto.role) && dto.entreprise != null) {
            user.setNomEntreprise(dto.entreprise.nom);
            user.setAdresseEntreprise(dto.entreprise.adresse);
            user.setEmailEntreprise(dto.entreprise.email);
        }

        return userRepository.save(user);
    }

    public User login(AuthRequestDTO dto) {
        //On va chercher l’utilisateur en base avec le username.
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("Nom d'utilisateur ou mot de passe incorrect"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect !");
        }

        System.out.println("Mot de passe entré : " + dto.getPassword());
        System.out.println("Mot de passe en base : " + user.getPassword());
        System.out.println("Résultat de passwordEncoder.matches : " + passwordEncoder.matches(dto.getPassword(), user.getPassword()));

        return user;
    }
    public void forgotPassword(String email) {
        // Cherche l'utilisateur soit dans PARTICIPANT soit ENTREPRISE
        User user = userRepository.findByEmailParticipant(email)
                .orElseGet(() -> userRepository.findByEmailEntreprise(email)
                        .orElseThrow(() -> new RuntimeException("Email non trouvé")));

        // Générer un mot de passe temporaire en clair
        String tempPassword = generateRandomPassword(8);

        // Encoder le mot de passe temporaire
        String encodedPassword = passwordEncoder.encode(tempPassword);
        user.setPassword(encodedPassword);

        // Sauvegarder et forcer le flush pour s'assurer que c'est mis à jour immédiatement
        userRepository.saveAndFlush(user);

        // Log pour debug
        System.out.println("Mot de passe temporaire (clair) : " + tempPassword);
        System.out.println("Mot de passe encodé sauvegardé en base : " + encodedPassword);

        // Envoyer le mot de passe temporaire par email
        emailService.sendEmail(email,
                "Réinitialisation de votre mot de passe",
                "Bonjour " + user.getUsername() + ",\n\nVotre nouveau mot de passe temporaire est : " + tempPassword);
    }


    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int idx = (int) (Math.random() * chars.length());
            sb.append(chars.charAt(idx));
        }
        return sb.toString();
    }


}
