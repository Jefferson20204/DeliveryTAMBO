package com.Login.Backend.services;

import com.Login.Backend.auth.entities.User;
import com.Login.Backend.dto.AddressDto;
import com.Login.Backend.entities.Address;
import com.Login.Backend.mapper.AddressMapper;
import com.Login.Backend.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AddressService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AddressMapper addressMapper;

    // Crear una nueva dirección
    public Address createAddress(AddressDto addressRequest, Principal principal) {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());
        Address address = addressMapper.toEntity(addressRequest, user);
        return addressRepository.save(address);
    }

    // Obtener todas las direcciones del usuario
    public List<AddressDto> getUserAddresses(Principal principal) {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());
        return addressRepository.findByUser(user)
                .stream()
                .map(addressMapper::toDto)
                .collect(Collectors.toList());
    }

    // Eliminar una dirección
    public void deleteAddress(UUID id) {
        addressRepository.deleteById(id);
    }

}
