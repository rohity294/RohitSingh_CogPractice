package com.example.demo.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Customer;
import com.example.demo.services.CustomerService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api")
// Allows CORS requests from any domain/origin
@CrossOrigin(
    origins = {
        "https://laughing-yodel-jqwx5r66rg92p4x5-5173.app.github.dev",
        "http://localhost:5173",
        "http://localhost:3000"
    },
    allowedHeaders = "*",
    allowCredentials = "true"
)
public class CustomerController {
	
	private CustomerService customerService;
   
	@Autowired
    public CustomerController(CustomerService customerService) {
 	  	   this.customerService = customerService;
	}
	
	@GetMapping("/customers") //www.localhost:8080/api/customers
	public List<Customer> getAllCustomers(){
	   System.out.println("Getting all customers...");
 	   return customerService.getAllCustomers();
	}
	
//	 @GetMapping("/customers/{id}")
//	    public Customer getCustomerById(@PathVariable int id) {
//	        return customerService.getCustomerById(id);
//	   }
	 
	 @GetMapping("/customers/{id}")
	 public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {

	     Customer customer = customerService.getCustomerById(id);

	     return ResponseEntity.ok(customer);
	 }
}