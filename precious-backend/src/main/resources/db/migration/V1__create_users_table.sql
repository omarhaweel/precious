-- Create users table
CREATE TABLE users (
    id         BIGSERIAL PRIMARY KEY,
    username   VARCHAR(100) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    buyer      BOOLEAN NOT NULL DEFAULT FALSE,
    seller     BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT uk_users_email    UNIQUE (email)
);

-- Create unique index on email
CREATE UNIQUE INDEX idx_users_email ON users (email);