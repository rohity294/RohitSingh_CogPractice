package com.example.demo.services;

import java.util.*;

import org.springframework.stereotype.Service;

import com.example.demo.models.Customer;
import com.example.demo.repos.CustomerRepository;

@Service
public class CustomerService {
   private CustomerRepository customerRepository;
 
  
   public CustomerService(CustomerRepository customerRepository) {
	   this.customerRepository = customerRepository;
   }
   
   public List<Customer> getAllCustomers(){
       return customerRepository.findAll();
   }

   public Customer getCustomerById(String id) {
    	return customerRepository.findById(id).orElse(null);
   }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
}
