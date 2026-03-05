package com.example.precious.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingImageDto {
    private UUID id;
    private UUID listingId;
    private String imageUrl;
}
