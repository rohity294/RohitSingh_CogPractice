package com.example.springsecurityjwt.config;

import com.example.springsecurityjwt.entity.Role;
import com.example.springsecurityjwt.entity.User;
import com.example.springsecurityjwt.repository.RoleRepository;
import com.example.springsecurityjwt.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataInitializer {
    
    @Bean
    @Transactional
    public CommandLineRunner initializeData(
        RoleRepository roleRepository,
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        return args -> {
            // Create roles
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role adminRole = new Role();
                adminRole.setName("ADMIN");
                adminRole.setDescription("Administrator role");
                roleRepository.save(adminRole);
            }
            
            if (roleRepository.findByName("USER").isEmpty()) {
                Role userRole = new Role();
                userRole.setName("USER");
                userRole.setDescription("Regular user role");
                roleRepository.save(userRole);
            }
            
            // Create test admin user
            if (!userRepository.existsByUsername("admin")) {
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setEmail("admin@example.com");
                adminUser.setPassword(passwordEncoder.encode("admin123"));
                adminUser.setEnabled(true);
                
                Role adminRole = roleRepository.findByName("ADMIN").orElse(null);
                if (adminRole != null) {
                    adminUser.addRole(adminRole);
                }
                
                userRepository.save(adminUser);
                System.out.println("✓ Admin user created: username=admin, password=admin123");
            }
            
            // Create test regular user
            if (!userRepository.existsByUsername("user")) {
                User regularUser = new User();
                regularUser.setUsername("user");
                regularUser.setEmail("user@example.com");
                regularUser.setPassword(passwordEncoder.encode("user123"));
                regularUser.setEnabled(true);
                
                Role userRole = roleRepository.findByName("USER").orElse(null);
                if (userRole != null) {
                    regularUser.addRole(userRole);
                }
                
                userRepository.save(regularUser);
                System.out.println("✓ Regular user created: username=user, password=user123");
            }
            
            System.out.println("\n✓ Application initialized successfully!");
            System.out.println("  Try: POST /api/v1/auth/login with admin/admin123 or user/user123");
            System.out.println("  Then: GET /api/v1/admin (needs ADMIN role)\n");
        };
    }
}