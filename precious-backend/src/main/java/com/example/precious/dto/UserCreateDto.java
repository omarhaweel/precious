package com.example.precious.dto;

import com.example.precious.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating a new user (e.g. registration). Password should be hashed in the service layer.
 *
 * @author Omar Haweel
 * @version 1.0
 * @since 2026-02-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCreateDto {

    @NotBlank(message = "Username is required")
    @Size(min = 1, max = 100)
    private String username;

    @NotBlank(message = "Email is required")
    @Email
    @Size(max = 255)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 255)
    private String password;

    @NotBlank(message = "Account type is required")
    private User.Role role;
}
