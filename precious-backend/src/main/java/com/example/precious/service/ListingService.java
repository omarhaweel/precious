package com.example.precious.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import com.example.precious.dto.ListingRequestDto;
import com.example.precious.dto.ListingResponseDto;
import com.example.precious.entity.Listing.ListingType;
import com.example.precious.mapper.Mapper;
import com.example.precious.repository.ListingRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ListingService {
    private final ListingRepository listingRepository;
    private final Mapper mapper;

    
    public ListingService(ListingRepository listingRepository, Mapper mapper) {
        this.mapper = mapper;
        this.listingRepository = listingRepository;
    }

    @Transactional
    public ListingResponseDto saveListing(ListingRequestDto listingRequestDto) {
        return mapper.toResponseDto(listingRepository.save(mapper.toEntity(listingRequestDto)));
    }

    @Transactional
    public Optional<ListingResponseDto> findListingById(UUID id) {
        return listingRepository.findById(id).map(mapper::toResponseDto);
    }

    @Transactional
    public List<ListingResponseDto> findListingsByUserId(Long userId) {
        return listingRepository.findListingsByUserId(userId).stream().map(mapper::toResponseDto).collect(Collectors.toList());
    }

    @Transactional
    public List<ListingResponseDto> findListingsByType(ListingType type) {
        return listingRepository.findListingsByType(type).stream().map(mapper::toResponseDto).collect(Collectors.toList());
    }

    @Transactional
    public void deleteListingById(UUID id) {
        listingRepository.deleteById(id);
    }

}