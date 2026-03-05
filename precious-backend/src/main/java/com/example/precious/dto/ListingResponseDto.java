package com.example.precious.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import com.example.precious.entity.Listing.ListingStatus;
import com.example.precious.entity.Listing.ListingType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for listing in API responses. Includes image URLs for full display.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingResponseDto {
    private UUID id;
    private Long userId;
    private String title;
    private String description;
    private ListingType type;
    private Long price;
    private ListingStatus status;
}
