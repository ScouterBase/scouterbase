package com.github.scouterbase.scouterbase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class ScouterbaseApplication  {

	public static void main(String[] args) {
		SpringApplication.run(ScouterbaseApplication.class, args);
	}
}
