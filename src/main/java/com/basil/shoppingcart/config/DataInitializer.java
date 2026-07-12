package com.basil.shoppingcart.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.basil.shoppingcart.enums.RoleType;
import com.basil.shoppingcart.model.Role;
import com.basil.shoppingcart.repository.RoleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {

        createRole(RoleType.ROLE_ADMIN);

        createRole(RoleType.ROLE_CUSTOMER);

        log.info("Default roles verified successfully.");

    }

    private void createRole(RoleType roleType) {

        if (roleRepository.findByRoleName(roleType).isEmpty()) {

            Role role = new Role();
            role.setRoleName(roleType);

            roleRepository.save(role);

            log.info("{} created successfully.", roleType);

        } else {

            log.info("{} already exists.", roleType);

        }
    }

}