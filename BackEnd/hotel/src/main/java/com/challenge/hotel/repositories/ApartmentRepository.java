package com.challenge.hotel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.challenge.hotel.entities.Apartment;

public interface ApartmentRepository extends JpaRepository<Apartment, Long>{

}
