package com.challenge.hotel.entities;

import java.io.Serializable;
//import java.time.Instant;
import java.util.Objects;

import com.challenge.hotel.entities.enums.ApartmentStatus;
//import com.fasterxml.jackson.annotation.JsonFormat;

//import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_Apartment")
public class Apartment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
//	private Instant moment;
//	
	private ApartmentStatus status;
	private Integer number;

//	@OneToOne(mappedBy = "apartment", cascade = CascadeType.ALL)
//	private User user;

	public Apartment() {
	}

	public Apartment(Long id, ApartmentStatus status, Integer number/* , Instant moment */ /*User user*/) {
		super();
		this.id = id;
		setStatus(status);
		this.number = number;
//		this.moment = moment;
//		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ApartmentStatus getStatus() {
		return status;
	}

	public void setStatus(ApartmentStatus status) {
		this.status = status;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

//	public Instant getMoment() {
//		return moment;
//	}
//
//	public void setMoment(Instant moment) {
//		this.moment = moment;
//	}

//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}

	@Override
	public int hashCode() {
		return Objects.hash(id, number);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Apartment other = (Apartment) obj;
		return Objects.equals(id, other.id) && Objects.equals(number, other.number);
	}

}
