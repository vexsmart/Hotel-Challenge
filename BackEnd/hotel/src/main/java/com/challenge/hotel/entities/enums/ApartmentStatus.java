package com.challenge.hotel.entities.enums;

public enum ApartmentStatus {
	LIVRE(1),
	LOCADO(2);
	
	private int code;
	
	private ApartmentStatus(int code) {
		this.code = code;
	}
	
	public int getCode() {
		return code;
	}
	
	public static ApartmentStatus valueOf(int code) {
		for(ApartmentStatus value : ApartmentStatus.values()) {
			if(value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Invalid ApartmentStatus code!");
	}
}
