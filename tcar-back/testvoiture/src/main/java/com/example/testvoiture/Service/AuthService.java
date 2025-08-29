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

}
