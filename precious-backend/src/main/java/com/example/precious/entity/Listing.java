package com.example.precious.entity;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description; 

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private ListingType type;

    @Column(nullable = false)
    private long price;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private ListingStatus status;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "image_urls", nullable = false)
    private List<String> imageUrls;

    public enum ListingType {
        WATCH("Watch"),
        JEWELRY("Jewelry"),
        GEMSTONE("Gemstone"),
        SUNGLASSES("Sunglasses"),
        LEATHER("Leather"),
        SERVICE("Service"),
        OTHER("Other");

        private String displayName;

        ListingType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
    
      
    public enum ListingStatus {
        ACTIVE("Active"),
        INACTIVE("Inactive"),
        SOLD("Sold"),
        DELETED("Deleted");

        private String displayName;

        ListingStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }

    }
        
}
