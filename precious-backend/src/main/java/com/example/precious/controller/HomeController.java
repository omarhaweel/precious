package com.example.precious.controller;

import java.util.concurrent.atomic.AtomicBoolean;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Serves the root endpoint with a simple authenticated flag (e.g. for health or status checks).
 *
 * @author Omar Haweel
 * @version 1.0
 * @since 2026-02-24
 */
@RestController
public class HomeController {

    /**
     * Returns a JSON payload indicating an authenticated state.
     *
     * @return wrapper containing {@code true} for the authenticated flag
     */
    @GetMapping("/")
    public AtomicBoolean getIsAuthenticated() {
        return new AtomicBoolean(true);
    }
}
