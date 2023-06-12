package com.challenge.hotel.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.challenge.hotel.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
