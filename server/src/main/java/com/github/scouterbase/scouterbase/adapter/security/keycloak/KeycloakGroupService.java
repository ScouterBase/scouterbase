package com.github.scouterbase.scouterbase.adapter.security.keycloak;

import com.github.scouterbase.scouterbase.adapter.security.GroupService;
import com.github.scouterbase.scouterbase.domain.Group;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;
import org.keycloak.adapters.springboot.KeycloakSpringBootProperties;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.GroupRepresentation;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(value = "security.enabled", matchIfMissing = true)
public class KeycloakGroupService implements GroupService {

  private final Keycloak keycloak;
  private final String keycloakRealm;

  public KeycloakGroupService(Keycloak keycloak, KeycloakSpringBootProperties keycloakSpringBootProperties) {
    this.keycloak = keycloak;
    this.keycloakRealm = keycloakSpringBootProperties.getRealm();
  }

  @Override
  public boolean isInGroup(Principal principal, Group group) {
    return getAllGroupsFromUser(principal)
        .stream()
        .anyMatch(group::equals);
  }

  @Override
  public Group createGroup(String name) {
    GroupRepresentation groupRepresentation = new GroupRepresentation();
    GroupRepresentation createdGroup = keycloak.realm(keycloakRealm)
        .groups()
        .add(groupRepresentation)
        .readEntity(GroupRepresentation.class);
    return new Group(createdGroup.getName(), groupRepresentation.getId());
  }

  @Override
  public void addGroupToUser(Group group, Principal principal) {
    keycloak.realm(keycloakRealm)
        .users()
        .get(principal.getName())
        .joinGroup(group.getId());
  }

  @Override
  public List<Group> getAllGroupsFromUser(Principal principal) {
    return keycloak.realm(keycloakRealm)
        .users()
        .get(principal.getName())
        .groups()
        .stream()
        .map(this::keycloakGroupToGroup)
        .collect(Collectors.toList());
  }

  private Group keycloakGroupToGroup(GroupRepresentation groupRepresentation) {
    return new Group(groupRepresentation.getName(), groupRepresentation.getId());
  }

}
