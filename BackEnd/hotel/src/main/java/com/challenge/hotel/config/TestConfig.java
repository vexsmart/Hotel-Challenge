package com.challenge.hotel.config;

//import java.time.Instant;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.challenge.hotel.entities.Apartment;
//import com.challenge.hotel.entities.User;
import com.challenge.hotel.entities.enums.ApartmentStatus;
import com.challenge.hotel.repositories.ApartmentRepository;
//import com.challenge.hotel.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

	@Autowired
	private ApartmentRepository apartmentRepository;
	
//	@Autowired
//	private UserRepository userRepository;
	
	@Override
	public void run(String... args) throws Exception {
		// add to user constructor apartment entity 
//		User us1 = new User(null, "Maria", "99888888");
//		User us2 = new User(null, "Paul", "99777777");
		
//		userRepository.saveAll(Arrays.asList(us1, us2));
		// relate user and apartment
		//check methods delete put post
		Apartment ap1 = new Apartment(null, ApartmentStatus.LIVRE, 1 /*Instant.parse("2023-06-20T19:53:07Z")*/);
		Apartment ap2 = new Apartment(null, ApartmentStatus.LOCADO, 2 /*Instant.parse("2023-06-20T21:53:07Z")*/);
		
		
		apartmentRepository.saveAll(Arrays.asList(ap1, ap2));
		
	}
	
}
