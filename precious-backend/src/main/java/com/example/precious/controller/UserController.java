package com.example.precious.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.precious.dto.UserCreateDto;
import com.example.precious.dto.UserResponseDto;
import com.example.precious.service.UserService;
import lombok.RequiredArgsConstructor;

/**
 * REST API for user operations. All responses use DTOs so the password is never exposed.
 *
 * @author Omar Haweel
 * @version 1.0
 * @since 2026-02-24
 */

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Returns a user by id (without password).
     */
    @GetMapping("/find-user/{id}")
    public ResponseEntity<UserResponseDto> getById(@PathVariable Long id) {
        UserResponseDto user = userService.findById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    /**
     * Creates a new user from the request body.
     */
    @PostMapping("/create-user")
    public ResponseEntity<UserResponseDto> create(@RequestBody UserCreateDto userCreateDto) {
        UserResponseDto user = userService.createUserFromDto(userCreateDto);
        return ResponseEntity.ok(user);
    }

    /**
     * Deletes a user by id.
     */
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = userService.deleteUserById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
