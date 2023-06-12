package com.challenge.hotel.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.challenge.hotel.entities.Apartment;
import com.challenge.hotel.services.ApartmentService;

@RestController
@RequestMapping(value = "/apartments")
public class ApartmentResource {

	@Autowired
	private ApartmentService service;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping
	public ResponseEntity<List<Apartment>> findAll(){
		List<Apartment> list = service.findAll();
		return ResponseEntity.ok().body(list);
		
	}
		
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Apartment> findById(@PathVariable Long id){
		Apartment obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping
	public ResponseEntity<Apartment> insert(@RequestBody Apartment obj){
		obj = service.insert(obj);
		return ResponseEntity.ok().body(obj);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Apartment> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(value = "/{id}")
	public ResponseEntity<Apartment> update(@PathVariable Long id, @RequestBody Apartment obj){
		obj = service.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
}
