package com.example.demo.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Customer;
import com.example.demo.services.CustomerService;


@RestController
@RequestMapping("/api")
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
}