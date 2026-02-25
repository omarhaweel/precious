package com.example.precious.exception;

/**
 * This is an Email exception handler for the UserService class.
 */
public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
