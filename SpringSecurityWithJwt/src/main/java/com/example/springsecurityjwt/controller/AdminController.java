package com.example.springsecurityjwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @GetMapping
    public ResponseEntity<Map<String, String>> getAdminData(Authentication authentication) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to Admin Dashboard");
        response.put("username", authentication.getName());
        response.put("role", "ADMIN");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/users")
    public ResponseEntity<Map<String, String>> getAllUsers(Authentication authentication) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin can view all users");
        response.put("admin", authentication.getName());
        response.put("users", "[User1, User2, User3]");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/config")
    public ResponseEntity<Map<String, String>> updateConfig(
        @RequestBody Map<String, String> config,
        Authentication authentication
    ) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Configuration updated by " + authentication.getName());
        response.put("config", config.toString());
        return ResponseEntity.ok(response);
    }
}
