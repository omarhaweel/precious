package com.example.precious.dto;

import java.util.List;

import com.example.precious.entity.Listing.ListingType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating a listing. userId is set server-side from the authenticated user.
 * status and createdAt are set by the server (ACTIVE, now()).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingRequestDto {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Category/type is required")
    private ListingType type;


    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 255)
    private String title;


    @NotBlank(message = "Description is required")
    @Size(max = 10_000)
    private String description;


    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be non-negative")
    private Long price;

    /** Image URLs after upload (e.g. from your ImageUploadService). Can be empty. */
    @NotNull(message = "Image list is required (can be empty)")
    @Size(max = 20, message = "At most 20 images per listing")
    @Builder.Default
    private List<String> imageUrls = List.of();
}
