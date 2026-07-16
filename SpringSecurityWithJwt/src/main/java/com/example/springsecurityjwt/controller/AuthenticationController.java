package com.example.springsecurityjwt.controller;

import com.example.springsecurityjwt.dto.LoginRequest;
import com.example.springsecurityjwt.dto.LoginResponse;
import com.example.springsecurityjwt.dto.RegisterRequest;
import com.example.springsecurityjwt.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {
    
    private final AuthenticationService authenticationService;
    
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
    
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        try {
            LoginResponse response = authenticationService.register(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                new LoginResponse(null, null, e.getMessage()),
                HttpStatus.BAD_REQUEST
            );
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authenticationService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>(
                new LoginResponse(null, null, "Invalid username or password"),
                HttpStatus.UNAUTHORIZED
            );
        }
    }
    
    @GetMapping("/verify")
    public ResponseEntity<String> verifyToken() {
        return ResponseEntity.ok("Token is valid");
    }
}
