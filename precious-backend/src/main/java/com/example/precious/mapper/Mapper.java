package com.example.precious.mapper;

import java.time.Instant;
import org.springframework.stereotype.Component;
import com.example.precious.dto.ListingRequestDto;
import com.example.precious.dto.ListingResponseDto;
import com.example.precious.dto.UserCreateDto;
import com.example.precious.dto.UserResponseDto;
import com.example.precious.entity.Listing;
import com.example.precious.entity.Listing.ListingStatus;
import com.example.precious.entity.User;

/**
 * Maps between {@link User} entity and user DTOs. Use this whenever converting
 * entity to/from DTO so the password is never exposed in responses.
 */

@Component
public class Mapper {

    /**
     * Converts entity to response DTO. Password is never set on the DTO.
     */
    public UserResponseDto toResponseDto(User user) {
        if (user == null) {
            return null;
        }
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    /**
     * Converts create DTO to entity. Hash the password in the service layer before persisting.
     */
    public User toEntity(UserCreateDto dto) {
        if (dto == null) {
            return null;
        }
        return User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(dto.getPassword()) // service must hash before save
                .role(dto.getRole())
                .build();
    }

    /**
     * convert ListingRequestDto to Listing entity
     */
    public Listing toEntity(ListingRequestDto dto) {
        if (dto == null) {
            return null;
        }
        return Listing.builder()
                .userId(dto.getUserId())
                .type(dto.getType())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .status(ListingStatus.ACTIVE)
                .createdAt(Instant.now())
                .imageUrls(dto.getImageUrls())
                .build();
    }

    /**
     * convert Listing entity to ListingResponseDto
     */
    public ListingResponseDto toResponseDto(Listing listing) {
        if (listing == null) {
            return null;
        }
        return ListingResponseDto.builder()
                .id(listing.getId())
                .userId(listing.getUserId())
                .title(listing.getTitle())
                .description(listing.getDescription())
                .type(listing.getType())
                .price(listing.getPrice())
                .status(listing.getStatus())
                .build();
    }
}