package com.example.precious.dto;

import com.example.precious.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for returning user data in API responses. Never contains password.
 * 
 * @author Omar Haweel
 * @version 1.0
 * @since 2026-02-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private Long id;
    private String username;
    private String email;
    private Enum<User.Role> role;
}
