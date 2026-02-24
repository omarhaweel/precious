package com.example.precious.controller;



import java.util.concurrent.atomic.AtomicBoolean;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public AtomicBoolean getIsAuthenticated() {
        return new AtomicBoolean(true);
    }

}   