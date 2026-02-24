package com.example.precious.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * After OAuth success, Spring redirects here. We redirect to the app deep link
 * so the mobile app can complete the auth session and navigate to homescreen.
 */
@RestController
public class LoginController {

    private static final String APP_AUTH_CALLBACK = "app://auth/callback";

    @GetMapping("/login")
    public ResponseEntity<Void> loginSuccessRedirect() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(java.net.URI.create(APP_AUTH_CALLBACK));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }
}
