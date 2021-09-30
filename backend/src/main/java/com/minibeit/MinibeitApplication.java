package com.minibeit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MinibeitApplication {
	public static void main(String[] args) {
		SpringApplication.run(MinibeitApplication.class, args);
	}
}
