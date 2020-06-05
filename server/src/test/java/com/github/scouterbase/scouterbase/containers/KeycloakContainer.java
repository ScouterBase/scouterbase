package com.github.scouterbase.scouterbase.containers;

import com.github.dockerjava.api.command.InspectContainerResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Objects;
import org.jetbrains.annotations.NotNull;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.testcontainers.containers.BindMode;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.HttpWaitStrategy;
import org.testcontainers.utility.MountableFile;

public class KeycloakContainer extends GenericContainer<KeycloakContainer> {

  private static KeycloakContainer instance;

  public KeycloakContainer() {
    super("jboss/keycloak");
    addExposedPort(8080);
    withNetworkAliases("keycloak");
    withEnv("KEYCLOAK_USER", "admin");
    withEnv("KEYCLOAK_PASSWORD", "password");
    withEnv("KEYCLOAK_IMPORT", "/tmp/test-realm.json");
    withClasspathResourceMapping("test-realm.json", "/tmp/test-realm.json", BindMode.READ_ONLY);
    withCopyFileToContainer(MountableFile.forClasspathResource("create-keycloak-user.sh", 700),
        "/opt/jboss/create-keycloak-user.sh");

    waitingFor(new HttpWaitStrategy().forPath("/auth").withStartupTimeout(Duration.ofSeconds(300)));
    // waitingFor(new LogMessageWaitStrategy().withRegEx(".*Keycloak.*started.*").withTimes(2));
  }

  public static KeycloakContainer getInstance() {
    if (Objects.isNull(instance)) {
      instance = new KeycloakContainer();
    }
    return instance;
  }

  @Override
  protected void containerIsStarted(InspectContainerResponse containerInfo, boolean reused) {
    super.containerIsStarted(containerInfo, reused);
    try {
      ExecResult result = execInContainer("sh", "/opt/jboss/create-keycloak-user.sh");
      logger().warn(result.toString());
    } catch (IOException | InterruptedException e) {
      e.printStackTrace();
    }
  }

  public static class KeycloakSpringContextInitializer implements
      ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(@NotNull ConfigurableApplicationContext applicationContext) {
      TestPropertyValues.of(
          "keycloak.enabled=true",
          "keycloak.auth-server-url=http://localhost:" + instance.getMappedPort(8080) + "/auth",
          "keycloak.realm=Scouterbase",
          "keycloak.resource=scouterbase",
          "keycloak.public-client=true",
          "keycloak-admin.username=ScouterbaseAdmin",
          "keycloak-admin.password=ScouterbaseAdmin"
      ).applyTo(applicationContext);
    }
  }

}
