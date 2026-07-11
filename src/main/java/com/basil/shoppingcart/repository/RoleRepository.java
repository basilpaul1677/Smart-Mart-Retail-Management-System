package com.basil.shoppingcart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.basil.shoppingcart.enums.RoleType;
import com.basil.shoppingcart.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(RoleType roleName);

    boolean existsByRoleName(RoleType roleName);

}