package com.Login.Backend.mapper;

import com.Login.Backend.auth.entities.User;
import com.Login.Backend.dto.AddressDTO;
import com.Login.Backend.dto.AddressRequestDTO;
import com.Login.Backend.entities.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public AddressDTO toDto(Address address) {
        return AddressDTO.builder()
                .id(address.getId())
                .alias(address.getAlias())
                .address(address.getAddress())
                .district(address.getDistrict())
                .city(address.getCity())
                .country(address.getCountry())
                .latitude(address.getLatitude())
                .longitude(address.getLongitude())
                .floor(address.getFloor())
                .office(address.getOffice())
                .apartment(address.getApartment())
                .reference(address.getReference())
                .isPrimary(address.getIsPrimary())
                .build();
    }

    public Address toEntity(AddressRequestDTO dto, User user) {
        return Address.builder()
                .alias(dto.getAlias())
                .address(dto.getAddress())
                .district(dto.getDistrict())
                .city(dto.getCity())
                .country(dto.getCountry())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .floor(dto.getFloor())
                .office(dto.getOffice())
                .apartment(dto.getApartment())
                .reference(dto.getReference())
                .isPrimary(dto.isPrimary())
                .user(user)
                .build();
    }
}
