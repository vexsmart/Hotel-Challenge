package com.challenge.hotel.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.challenge.hotel.entities.Apartment;
import com.challenge.hotel.repositories.ApartmentRepository;
import com.challenge.hotel.services.exceptions.DatabaseException;
import com.challenge.hotel.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ApartmentService {

	@Autowired
	private ApartmentRepository repository;

	public List<Apartment> findAll() {
		return repository.findAll();
	}

	public Apartment findById(Long id) {
		Optional<Apartment> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public Apartment insert(Apartment obj) {
		return repository.save(obj);
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException(e.getMessage());
		}
	}

	public Apartment update(Long id, Apartment obj) {
		try {
			Apartment entity = repository.getReferenceById(id);
			updateData(entity, obj);
			return repository.save(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(Apartment entity, Apartment obj) {
		entity.setStatus(obj.getStatus());
	}

}
