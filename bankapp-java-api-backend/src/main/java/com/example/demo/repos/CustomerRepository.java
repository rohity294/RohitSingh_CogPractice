package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	// Spring Data JPA provides implementations for common CRUD methods.
}
