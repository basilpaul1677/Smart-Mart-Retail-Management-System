package com.basil.shoppingcart.model;

import com.basil.shoppingcart.enums.RoleType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "roles")
@EqualsAndHashCode(callSuper = true)
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name", nullable = false, unique = true, length = 30)
    private RoleType roleName;

}