package com.example.testvoiture;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderTool {

    public static void main(String[] args) {
        // Tape ici ton mot de passe en clair
        String plainPassword = "adminadmin";

        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(plainPassword);

        System.out.println("Mot de passe en clair : " + plainPassword);
        System.out.println("Mot de passe chiffré (à copier dans la base) :");
        System.out.println(encodedPassword);
    }
}
