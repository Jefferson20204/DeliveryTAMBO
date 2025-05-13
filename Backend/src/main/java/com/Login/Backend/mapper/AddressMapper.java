package com.Login.Backend.mapper;

import com.Login.Backend.auth.entities.User;
import com.Login.Backend.dto.AddressDto;
import com.Login.Backend.entities.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public AddressDto toDto(Address address) {
        return AddressDto.builder()
                .id(address.getId())
                .street(address.getStreet())
                .number(address.getNumber())
                .reference(address.getReference())
                .district(address.getDistrict())
                .province(address.getProvince())
                .department(address.getDepartment())
                .userId(address.getUser().getId())
                .build();
    }

    public Address toEntity(AddressDto dto, User user) {
        return Address.builder()
                .id(dto.getId())
                .street(dto.getStreet())
                .number(dto.getNumber())
                .reference(dto.getReference())
                .district(dto.getDistrict())
                .province(dto.getProvince())
                .department(dto.getDepartment())
                .user(user)
                .build();
    }
}
