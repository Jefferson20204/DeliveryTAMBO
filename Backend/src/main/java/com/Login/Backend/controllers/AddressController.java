package com.Login.Backend.controllers;

import com.Login.Backend.dto.AddressDto;
import com.Login.Backend.entities.Address;
import com.Login.Backend.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/address")
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    // Crear una nueva dirección
    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody AddressDto addressRequest, Principal principal) {
        Address address = addressService.createAddress(addressRequest, principal);
        return new ResponseEntity<>(address, HttpStatus.OK);
    }

    // Eliminar una dirección
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable UUID id) {
        addressService.deleteAddress(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Obtener todas las direcciones del usuario autenticado
    @GetMapping
    public ResponseEntity<List<AddressDto>> getUserAddresses(Principal principal) {
        List<AddressDto> addresses = addressService.getUserAddresses(principal);
        return ResponseEntity.ok(addresses);
    }
}
