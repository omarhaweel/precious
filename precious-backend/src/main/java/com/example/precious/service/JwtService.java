package com.example.precious.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JwtService {

    private final String secretKey;
    private final long expirationMs;

    public JwtService(
            @Value("${jwt.secret:}") String secretKey,
            @Value("${jwt.expiration:86400000}") long expirationMs) {
        this.secretKey = (secretKey != null && !secretKey.isBlank()) ? secretKey : System.getenv("JWT_SECRET");
        this.expirationMs = expirationMs > 0 ? expirationMs : 86400000L;
    }

    public String generateToken(Long userId) {
        if (userId == null || getSigningKey() == null) return null;
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .issuedAt(new Date(now))
                .expiration(new Date(now + expirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean isValid(String token) {
        if (token == null || token.isBlank()) return false;
        try {
            Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /** Returns the subject (user id as string) or null if token invalid. */
    public String getSubject(String token) {
        if (token == null || token.isBlank()) return null;
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    private SecretKey getSigningKey() {
        String secret = this.secretKey;
        if (secret == null || secret.isBlank()) return null;
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }
}