package com.example.precious.controller;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.precious.dto.UserResponseDto;
import com.example.precious.service.LoginService;

/**
 * After OAuth success, Spring redirects here. Redirects to the app deep link so the mobile app
 * can complete the auth session and navigate to homescreen.
 *
 * @author Omar Haweel
 * @version 1.0
 * @since 2026-02-24
 */
@RestController
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    private static final String APP_AUTH_CALLBACK = "app://auth/callback";

    /**
     * Handles GET /api/login/google after successful OAuth. Redirects to the app callback URL.
     *
     * @return 302 redirect to {@value #APP_AUTH_CALLBACK}
     */
    @GetMapping("/api/login/google")
    public ResponseEntity<Void> loginSuccessRedirect() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(java.net.URI.create(APP_AUTH_CALLBACK));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("/api/login/email-and-password")
    public ResponseEntity<Map<String, Object>> loginWithEmailAndPassword(@RequestParam String email, @RequestParam String password) {
        UserResponseDto userResponseDto = loginService.loginWithEmailAndPassword(email, password);
        return ResponseEntity.ok(Map.of("success", true, "user", userResponseDto));
    }
}
