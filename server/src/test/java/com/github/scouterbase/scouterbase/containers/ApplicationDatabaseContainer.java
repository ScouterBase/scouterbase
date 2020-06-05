package com.github.scouterbase.scouterbase.containers;

import java.util.Objects;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.testcontainers.containers.PostgreSQLContainer;

public class ApplicationDatabaseContainer extends PostgreSQLContainer<ApplicationDatabaseContainer> {

  private static ApplicationDatabaseContainer instance;

  public ApplicationDatabaseContainer() {
    super("postgres:alpine");
  }

  public static ApplicationDatabaseContainer getInstance() {
    if (Objects.isNull(instance)) {
      instance = new ApplicationDatabaseContainer();
    }
    return instance;
  }

  public static class ApplicationDatabaseSpringContextInitializer implements
      ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
      TestPropertyValues.of("spring.datasource.url=" + instance.getJdbcUrl(),
          "spring.datasource.username=" + instance.getUsername(),
          "spring.datasource.password=" + instance.getPassword()).applyTo(applicationContext);
    }
  }
}
