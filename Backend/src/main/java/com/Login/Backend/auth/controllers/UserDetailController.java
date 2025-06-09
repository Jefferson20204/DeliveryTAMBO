package com.Login.Backend.auth.controllers;

import com.Login.Backend.auth.dto.UserDetailsDto;
import com.Login.Backend.auth.dto.UserResponseDto;
import com.Login.Backend.auth.dto.UserUpdateDto;
import com.Login.Backend.auth.entities.User;
import com.Login.Backend.auth.services.UserService;
import com.Login.Backend.dto.AddressDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

// Proporcionar un endpoint seguro para que los usuarios autenticados obtengan su información de perfil
@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserDetailController {

        @Autowired
        private UserDetailsService userDetailsService;

        @Autowired
        UserService userService;

        // Método GET que devuelve los detalles del usuario
        @GetMapping("/profile")
        public ResponseEntity<UserDetailsDto> getUserProfile(Principal principal) {
                User user = (User) userDetailsService.loadUserByUsername(principal.getName());

                // Verificar si el usuario autenticado existe en el sistema
                if (null == user) {
                        // responde con código HTTP 401 Unauthorized
                        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }

                // Transforma la entidad User en un DTO (UserDetailsDto) para la respuesta
                UserDetailsDto userDetailsDto = UserDetailsDto.builder()
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .profileImageUrl(user.getProfileImageUrl())
                                .email(user.getEmail())
                                .phoneNumber(user.getPhoneNumber())
                                .addressList(user.getAddressList().stream()
                                                .map(address -> AddressDTO.builder()
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
                                                                .userId(address.getUser().getId())
                                                                .build())
                                                .toList())
                                .authorityList(user.getAuthorities().stream()
                                                .map(auth -> auth.getAuthority()).toList())
                                .build();

                // Retorna los datos con estado HTTP 200 (OK) si todo es correcto
                return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);

        }

        @PutMapping("/update")
        public ResponseEntity<UserResponseDto> updateUser(@RequestBody UserUpdateDto request) {
                // Verificar si el usuario autenticado existe en el sistema
                User user = (User) userDetailsService.loadUserByUsername(request.getEmail());

                if (null != user) {
                        UserResponseDto updateResponse = userService.updateUser(request);
                        // responde con código HTTP 401 Unauthorized
                        return new ResponseEntity<>(updateResponse, HttpStatus.OK);
                } else {
                        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }

        }
}
