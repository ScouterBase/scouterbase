package com.github.scouterbase.scouterbase;

import java.sql.Connection;
import java.sql.Statement;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableConfigurationProperties
public class ScouterbaseApplication implements CommandLineRunner {

	@Autowired
	private DataSource dataSource;

	public static void main(String[] args) {
		SpringApplication.run(ScouterbaseApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.err.println("Hello its me");
		Connection connection = dataSource.getConnection();
		Statement statement = connection.createStatement();
		statement.execute("select 1");
	}
}
