package com.basil.shoppingcart.startup;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.basil.shoppingcart.enums.RoleType;
import com.basil.shoppingcart.model.Role;
import com.basil.shoppingcart.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {

        createRole(RoleType.ROLE_ADMIN);

        createRole(RoleType.ROLE_CUSTOMER);

    }

    private void createRole(RoleType roleType) {

        if (roleRepository.findByRoleName(roleType).isEmpty()) {

            Role role = new Role();

            role.setRoleName(roleType);

            roleRepository.save(role);

            System.out.println(roleType + " created.");

        }

    }

}