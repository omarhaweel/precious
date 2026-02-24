package com.example.precious.service;

/**
 * User service.
 * 
 * @author Omar Haweel
 * @version 1.0
 * @since 2026-02-24
 */

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.precious.dto.UserCreateDto;
import com.example.precious.dto.UserResponseDto;
import com.example.precious.entity.User;
import com.example.precious.mapper.UserMapper;
import com.example.precious.repository.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * Application service for user operations. Returns only DTOs so that
 * the password is never exposed. Use {@link UserMapper} for entity-DTO conversion.
 */

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    /**
     * Get user by id as response DTO (no password).
     */
    @Transactional(readOnly = true)
    public UserResponseDto findById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toResponseDto)
                .orElse(null);
    }

    /**
     * Get user by username as response DTO (no password).
     */
    @Transactional(readOnly = true)
    public UserResponseDto findByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::toResponseDto)
                .orElse(null);
    }

    /**
     * Get user entity by id (for internal use, e.g. security context). Prefer returning DTOs in APIs.
     */
    @Transactional(readOnly = true)
    public User findEntityById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    /**
     * Create a new user from a DTO.
     */
    @Transactional
    public UserResponseDto createUserFromDto(UserCreateDto userCreateDto) {
        User user = userMapper.toEntity(userCreateDto);
        user = userRepository.save(user);
        return userMapper.toResponseDto(user); // returning the user response dto without the password
    }

    /**
     * Delete a user by id.
     */
    @Transactional
    public boolean deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
