package com.example.precious.mapper;

import org.springframework.stereotype.Component;

import com.example.precious.dto.UserCreateDto;
import com.example.precious.dto.UserResponseDto;
import com.example.precious.entity.User;

/**
 * Maps between {@link User} entity and user DTOs. Use this whenever converting
 * entity to/from DTO so the password is never exposed in responses.
 * 
 * @author Omar Haweel
 * @version 1.0
 * @since 2026-02-24
 */

@Component
public class UserMapper {

    /**
     * Converts entity to response DTO. Password is never set on the DTO.
     */
    public UserResponseDto toResponseDto(User user) {
        if (user == null) {
            return null;
        }
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    /**
     * Converts create DTO to entity. Hash the password in the service layer before persisting.
     */
    public User toEntity(UserCreateDto dto) {
        if (dto == null) {
            return null;
        }
        return User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(dto.getPassword()) // service must hash before save
                .role(dto.getRole())
                .build();
    }
}
