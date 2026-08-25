package com.example.demo.repos;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.example.demo.models.Customer;

@RepositoryRestResource
public interface CustomerRepository extends MongoRepository<Customer, String> {
	
}