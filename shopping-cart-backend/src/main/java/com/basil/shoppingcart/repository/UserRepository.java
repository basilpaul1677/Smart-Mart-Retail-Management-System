package com.basil.shoppingcart.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.basil.shoppingcart.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = "role")
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    long countByActiveTrue();

    long countByActiveFalse();

    List<User> findAllByOrderByCreatedAtDesc();

    List<User> findByEnabledTrueOrderByCreatedAtDesc();

    List<User> findByEnabledFalseOrderByCreatedAtDesc();
}