package com.example.precious.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.example.precious.entity.Listing;
import com.example.precious.entity.Listing.ListingType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingRepository extends JpaRepository<Listing, UUID> {

    Optional<Listing> findById(UUID id);

    List<Listing> findListingsByUserId(Long userId);

    List<Listing> findListingsByType(ListingType type);

}
