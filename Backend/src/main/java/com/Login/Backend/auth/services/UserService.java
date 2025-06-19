package com.Login.Backend.auth.services;

import com.Login.Backend.auth.dto.RegistrationRequest;
import com.Login.Backend.auth.dto.UserResponseDto;
import com.Login.Backend.auth.dto.UserUpdateDto;
import com.Login.Backend.auth.entities.User;
import com.Login.Backend.auth.helper.VerificationCodeGenerator;
import com.Login.Backend.auth.repositories.UserDetailRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

@Service
public class UserService {

    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // Registro de usuarios
    public UserResponseDto createUser(RegistrationRequest request) {

        try {
            // Validar el nombre
            String firstName = request.getFirstName();
            if (firstName == null || firstName.isEmpty()) {
                return UserResponseDto.builder()
                        .code(400)
                        .message("Ingrese el nombre.")
                        .build();
            }

            // Validar el apellido
            String lastName = request.getLastName();
            if (lastName == null || lastName.isEmpty()) {
                return UserResponseDto.builder()
                        .code(400)
                        .message("Ingrese el apellido.")
                        .build();
            }

            // Validar el email
            String email = request.getEmail();
            if (email == null || email.isEmpty()) {
                return UserResponseDto.builder()
                        .code(400)
                        .message("Ingrese el email.")
                        .build();
            }

            // Validar la contraseña
            String password = request.getPassword().toString();
            if (password == null || password.isEmpty()) {
                return UserResponseDto.builder()
                        .code(400)
                        .message("Ingrese la contraseña.")
                        .build();
            }

            // Validar el número telefónico
            String phoneNumber = request.getPhoneNumber();
            if (phoneNumber == null || phoneNumber.isEmpty()) {
                return UserResponseDto.builder()
                        .code(400)
                        .message("Ingrese el número telefónico.")
                        .build();
            }

            // Validar que el número telefónico tenga 9 digitos
            if (phoneNumber == null || !phoneNumber.matches("\\d{9}")) {
                return UserResponseDto.builder()
                        .code(400)
                        .message("El número telefónico debe tener exactamente 9 dígitos.")
                        .build();
            }

            // Validar si el usuario ya existe
            User existing = userDetailRepository.findByEmail(request.getEmail());
            if (existing != null) {
                if (existing.isEnabled()) {
                    // Usuario ya verificado
                    return UserResponseDto.builder()
                            .code(400)
                            .message("El correo electrónico ingresado ya está registrado y verificado.")
                            .build();
                } else {
                    // Usuario no verificado: actualizar y reenviar código
                    String newCode = VerificationCodeGenerator.generateCode();
                    existing.setVerificationCode(newCode);
                    existing.setFirstName(request.getFirstName());
                    existing.setLastName(request.getLastName());
                    existing.setPhoneNumber(request.getPhoneNumber());
                    existing.setPassword(passwordEncoder.encode(request.getPassword()));
                    existing.setProvider("manual");

                    userDetailRepository.save(existing);
                    emailService.sendEmail(existing);

                    return UserResponseDto.builder()
                            .code(200)
                            .message("Ya habías iniciado el registro. Se ha reenviado el código de verificación.")
                            .build();
                }
            }
            // Crea usuarios con estado "no verificado" (enabled=false)
            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setProfileImageUrl(null);
            user.setPhoneNumber(request.getPhoneNumber());
            user.setEmail(request.getEmail());
            user.setEnabled(false);
            // Codifica contraseñas de forma segura
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setProvider("manual");

            // Genera y envía código de verificación
            String code = VerificationCodeGenerator.generateCode();

            user.setVerificationCode(code);
            user.setAuthorities(authorityService.getUserAuthority());
            userDetailRepository.save(user);
            emailService.sendEmail(user);

            return UserResponseDto.builder()
                    .code(200)
                    .message("Usuario creado!")
                    .build();

        } catch (Exception e) {
            System.out.println("error: " + e.getMessage());
            throw new ServerErrorException(e.getMessage(), e.getCause());
        }
    }

    // Verificación de usuarios
    public void verifyUser(String userName) {
        User user = userDetailRepository.findByEmail(userName);
        // Activa cuentas al verificar el código (cambia enabled a true)
        user.setEnabled(true);
        userDetailRepository.save(user);
    }

    // Actualizar usuario
    public UserResponseDto updateUser(UserUpdateDto request) {
        User existing = userDetailRepository.findByEmail(request.getEmail());

        try {

            if (existing == null) {
                return UserResponseDto.builder()
                        .code(404)
                        .message("Usuario no encontrado")
                        .build();
            }

            // Validar el número telefónico
            String phoneNumber = request.getPhoneNumber();
            if (phoneNumber == null || phoneNumber.isEmpty()) {
                return UserResponseDto.builder()
                        .code(400)
                        .message("Ingrese el número telefónico.")
                        .build();
            }

            // Validar que el número telefónico tenga 9 digitos
            if (phoneNumber == null || !phoneNumber.matches("\\d{9}")) {
                return UserResponseDto.builder()
                        .code(400)
                        .message("El número telefónico debe tener exactamente 9 dígitos.")
                        .build();
            }
            // Actualizar solo los campos permitidos
            existing.setFirstName(request.getFirstName());
            existing.setLastName(request.getLastName());

            // Validar y actualizar teléfono si es diferente
            if (request.getPhoneNumber() != null &&
                    !request.getPhoneNumber().equals(existing.getPhoneNumber())) {
                existing.setPhoneNumber(request.getPhoneNumber());
            }

            userDetailRepository.save(existing);

            return UserResponseDto.builder()
                    .code(200)
                    .message("Usuario actualizado correctamente")
                    .build();
        } catch (Exception e) {
            return UserResponseDto.builder()
                    .code(500)
                    .message("Error al actualizar usuario: " + e.getMessage())
                    .build();
        }
    }

    public List<User> getAllUsers() {
        return userDetailRepository.findAll();
    }

    public User getUserFindByEmail(String email) {
        return userDetailRepository.findByEmail(email);
    }

}
