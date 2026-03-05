package com.example.precious.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.precious.dto.ListingRequestDto;
import com.example.precious.dto.ListingResponseDto;
import com.example.precious.entity.Listing.ListingType;
import com.example.precious.service.ListingService;


@RestController
@RequestMapping("/api/listings")
public class ListingController {


    private final ListingService listingService;
    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }


    @PostMapping("/add-listing")
    public ResponseEntity<ListingResponseDto> addListing(@RequestBody ListingRequestDto listingRequestDto) {
        return ResponseEntity.ok(listingService.saveListing(listingRequestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponseDto> getListingById(@PathVariable UUID id) {
        return ResponseEntity.ok(listingService.findListingById(id).orElse(null));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ListingResponseDto>> getListingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(listingService.findListingsByUserId(userId));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<ListingResponseDto>> getListingsByType(@PathVariable ListingType type) {
        return ResponseEntity.ok(listingService.findListingsByType(type));
    }
}