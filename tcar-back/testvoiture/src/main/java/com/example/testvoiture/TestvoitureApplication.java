package com.example.testvoiture;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling

@SpringBootApplication
public class TestvoitureApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestvoitureApplication.class, args);
	}

}
