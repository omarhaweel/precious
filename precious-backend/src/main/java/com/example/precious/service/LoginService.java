package com.example.precious.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.precious.dto.UserResponseDto;
import com.example.precious.entity.User;
import com.example.precious.mapper.UserMapper;
import com.example.precious.repository.UserRepository;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public LoginService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    /**
     * Login with email and password.
     * 
     * @param email
     * @param password
     * @return
     */
    public UserResponseDto loginWithEmailAndPassword(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        try {
            if (user.isPresent()) {
                User userEntity = user.get();
                if (passwordEncoder.matches(password, userEntity.getPassword())) {
                    return userMapper.toResponseDto(userEntity);
                }
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }
}