package com.example.precious.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Serves the root endpoint with a simple authenticated flag (e.g. for health or status checks).
 */

@RestController
public class HomeController {

    @GetMapping("/api/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }
    
}
