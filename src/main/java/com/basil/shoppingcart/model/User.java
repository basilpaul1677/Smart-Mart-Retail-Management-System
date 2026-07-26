package com.basil.shoppingcart.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {

    @NotBlank(message = "First name is required")
    @Size(max = 100)
    @Column(
            name = "first_name",
            nullable = false,
            length = 100
    )
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100)
    @Column(
            name = "last_name",
            nullable = false,
            length = 100
    )
    private String lastName;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    @Size(max = 150)
    @Column(
            name = "email",
            nullable = false,
            unique = true,
            length = 150
    )
    private String email;

    @NotBlank(message = "Password is required")
    @Column(
            name = "password",
            nullable = false
    )
    private String password;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    @Column(
            name = "phone_number",
            length = 15
    )
    private String phoneNumber;

    @Column(
            name = "enabled",
            nullable = false
    )
    private boolean enabled = true;

    @Column(
            name = "account_non_locked",
            nullable = false
    )
    private boolean accountNonLocked = true;

    /*
     * Admin user activation/deactivation status
     */
    @Column(
            name = "active",
            nullable = false
    )
    private boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "role_id",
            nullable = false
    )
    private Role role;
}