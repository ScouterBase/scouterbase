package com.github.scouterbase.scouterbase.adapter.security;

import com.github.scouterbase.scouterbase.domain.Group;
import java.security.Principal;
import java.util.List;

public interface GroupService {

  boolean isInGroup(Principal principal, Group group);

  Group createGroup(String name);

  void addGroupToUser(Group group, Principal principal);

  List<Group> getAllGroupsFromUser(Principal principal);
}
