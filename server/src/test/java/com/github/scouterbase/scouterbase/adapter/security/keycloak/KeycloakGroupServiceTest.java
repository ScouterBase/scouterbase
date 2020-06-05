package com.github.scouterbase.scouterbase.adapter.security.keycloak;

import com.github.scouterbase.scouterbase.containers.ApplicationDatabaseContainer;
import com.github.scouterbase.scouterbase.containers.KeycloakContainer;
import com.github.scouterbase.scouterbase.containers.KeycloakContainer.KeycloakSpringContextInitializer;
import com.github.scouterbase.scouterbase.domain.Group;
import java.security.Principal;
import java.util.List;
import javax.ws.rs.core.Response;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@ExtendWith(SpringExtension.class)
@SpringBootTest()
@ActiveProfiles("keycloak")
@Testcontainers
@ContextConfiguration(initializers = {KeycloakSpringContextInitializer.class,
    ApplicationDatabaseContainer.ApplicationDatabaseSpringContextInitializer.class})
// TODO: Refactor test, clean up and preparation is very ugly
class KeycloakGroupServiceTest {

  @Container
  private static final KeycloakContainer KEYCLOAK_CONTAINER = KeycloakContainer.getInstance();
  @Container
  private static final ApplicationDatabaseContainer APPLICATION_DATABASE_CONTAINER = ApplicationDatabaseContainer
      .getInstance();


  @Autowired
  private Keycloak keycloak;
  @Autowired
  private KeycloakGroupService keycloakGroupService;

  @BeforeEach
  void setUp() {
    try {
      deleteUser("Alpha");
    } catch (Exception e) {
    }
    try {
      deleteGroup("Beta");
    } catch (Exception e) {
    }
    try {
      deleteGroup("Gamma");
    } catch (Exception e) {
    }
  }

  @Test
  void addGroupToUser_WhenUserIsAlphaAndGroupIsBeta_ThenUserAlphaHasGroupBeta() {
    UserRepresentation user = createUser("Alpha");
    GroupRepresentation group = createGroup("Beta");

    keycloakGroupService.addGroupToUser(new Group(group.getName(), group.getId()), new SimplePrincipal(user.getId()));

    Assertions.assertThat(searchUser("Alpha").get(0).getGroups()).contains("Beta");
  }

  @Test
  void isInGroup_WhenUserAlphaIsAddedToGroupBeta_ReturnTrue() {
    UserRepresentation user = createUser("Alpha");
    GroupRepresentation group = createGroup("Beta");
    SimplePrincipal userPrincipal = new SimplePrincipal(user.getId());

    keycloakGroupService.addGroupToUser(new Group(group.getName(), group.getId()),
        userPrincipal);
    boolean inGroup = keycloakGroupService.isInGroup(userPrincipal, new Group(group.getName(), group.getId()));

    Assertions.assertThat(inGroup).isTrue();
  }

  @Test
  void isInGroup_WhenUserAlphaIsNotInGroupBeta_ReturnFalse() {
    UserRepresentation user = createUser("Alpha");
    GroupRepresentation group = createGroup("Beta");
    SimplePrincipal userPrincipal = new SimplePrincipal(user.getId());
    boolean inGroup = keycloakGroupService.isInGroup(userPrincipal, new Group(group.getName(), group.getId()));

    Assertions.assertThat(inGroup).isFalse();
  }

  @Test
  void getAllGroupsFromUser_WhenUserHasGroupBetaAndGamma_ReturnBetaAndGamma() {
    UserRepresentation user = createUser("Alpha");
    GroupRepresentation groupBeta = createGroup("Beta");
    GroupRepresentation groupGamma = createGroup("Gamma");
    SimplePrincipal userPrincipal = new SimplePrincipal(user.getId());
    keycloakGroupService.addGroupToUser(new Group(groupBeta.getName(), groupBeta.getId()),
        userPrincipal);
    keycloakGroupService.addGroupToUser(new Group(groupGamma.getName(), groupGamma.getId()),
        userPrincipal);

    List<Group> inGroup = keycloakGroupService.getAllGroupsFromUser(userPrincipal);

    Assertions.assertThat(inGroup).contains(new Group(groupBeta.getName(), groupBeta.getId()));
    Assertions.assertThat(inGroup).contains(new Group(groupGamma.getName(), groupGamma.getId()));
  }


  private void deleteUser(String username) {
    keycloak().users().search(username).forEach(user -> keycloak().users().delete(user.getId()));
  }

  private void deleteGroup(String groupName) {
    keycloak().groups().groups().stream().filter(group -> group.getName().equals(groupName))
        .forEach(group -> keycloak().groups().group(group.getId()).remove());
  }

  private List<UserRepresentation> searchUser(String username) {
    return keycloak().users().search(username);
  }

  private RealmResource keycloak() {
    return keycloak.realm("Scouterbase");
  }

  private GroupRepresentation createGroup(String name) {
    var groupRepresentation = new GroupRepresentation();
    groupRepresentation.setName(name);
    var groupId = CreatedResponseUtil.getCreatedId(keycloak()
        .groups()
        .add(groupRepresentation));
    return keycloak().groups().group(groupId).toRepresentation();
  }

  private UserRepresentation createUser(String name) {
    UserRepresentation userRepresentation = new UserRepresentation();
    userRepresentation.setUsername(name);
    Response response = keycloak()
        .users()
        .create(userRepresentation);
    response.readEntity(String.class);
    String userId = CreatedResponseUtil.getCreatedId(response);
    return keycloak().users().get(userId).toRepresentation();
  }

  static class SimplePrincipal implements Principal {

    private final String name;

    public SimplePrincipal(String name) {
      this.name = name;
    }

    @Override
    public String getName() {
      return name;
    }

  }
}
