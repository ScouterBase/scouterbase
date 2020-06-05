package com.github.scouterbase.scouterbase.domain;

import java.util.Objects;

public class Group {
  private final String name;
  private final String id;

  public Group(String name, String id) {
    this.name = Objects.requireNonNull(name);
    this.id = Objects.requireNonNull(id);
  }

  public String getName() {
    return name;
  }

  public String getId() {
    return id;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Group group = (Group) o;
    return name.equals(group.name) &&
        id.equals(group.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, id);
  }

  @Override
  public String toString() {
    return "Group{" +
        "name='" + name + '\'' +
        ", id='" + id + '\'' +
        '}';
  }

}
