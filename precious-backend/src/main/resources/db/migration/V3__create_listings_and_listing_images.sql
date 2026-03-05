-- Listings table: one row per product/listing, owned by a user
CREATE TABLE listings (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      BIGINT NOT NULL,
    title        VARCHAR(255) NOT NULL,
    description  TEXT NOT NULL,
    type         VARCHAR(50) NOT NULL,
    price        BIGINT NOT NULL,
    status       VARCHAR(50) NOT NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_listings_user FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX idx_listings_user_id ON listings (user_id);
CREATE INDEX idx_listings_status ON listings (status);
CREATE INDEX idx_listings_type ON listings (type);

-- Listing images: multiple images per listing
CREATE TABLE listing_images (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id   UUID NOT NULL,
    image_url   VARCHAR(1024) NOT NULL,
    CONSTRAINT fk_listing_images_listing FOREIGN KEY (listing_id) REFERENCES listings (id) ON DELETE CASCADE
);

CREATE INDEX idx_listing_images_listing_id ON listing_images (listing_id);
