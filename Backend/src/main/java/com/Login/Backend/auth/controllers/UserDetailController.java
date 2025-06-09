package com.Login.Backend.auth.controllers;

import com.Login.Backend.auth.dto.UserDetailsDto;
import com.Login.Backend.auth.dto.UserResponseDto;
import com.Login.Backend.auth.dto.UserUpdateDto;
import com.Login.Backend.auth.entities.User;
import com.Login.Backend.auth.services.UserService;
import com.Login.Backend.dto.AddressDTO;
import com.Login.Backend.services.AddressService;

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
import java.util.List;

// Proporcionar un endpoint seguro para que los usuarios autenticados obtengan su información de perfil
@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserDetailController {

        @Autowired
        private UserDetailsService userDetailsService;

        @Autowired
        private UserService userService;

        @Autowired
        private AddressService addressService;

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

        // Obtener todas las direcciones del usuario autenticado
        @GetMapping("/getMyAddressses")
        public ResponseEntity<List<AddressDTO>> getUserAddresses(Principal principal) {
                List<AddressDTO> addresses = addressService.getUserAddresses(principal);
                return ResponseEntity.ok(addresses);
        }
}
