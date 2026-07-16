
package com.example.springsecurityjwt.exceptions;

import org.springframework.security.core.AuthenticationException;

/**
 * We extend AuthenticationException so that Spring Security's 
 * exception handling mechanisms recognize this as an authentication failure.
 */
public class JwtValidationException extends AuthenticationException {
    public JwtValidationException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public JwtValidationException(String msg) {
        super(msg);
    }
}