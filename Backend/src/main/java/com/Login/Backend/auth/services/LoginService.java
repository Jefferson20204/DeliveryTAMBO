package com.Login.Backend.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

import com.Login.Backend.auth.dto.LoginRequest;
import com.Login.Backend.auth.dto.LoginResponse;
import com.Login.Backend.auth.entities.User;
import com.Login.Backend.auth.helper.JWTTokenHelper;
import com.Login.Backend.auth.repositories.UserDetailRepository;

@Service
public class LoginService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailRepository userDetailRepository;

    @Autowired
    JWTTokenHelper jwtTokenHelper;

    public LoginResponse loginUser(LoginRequest request) {

        String userName = request.getUserName();
        String password = request.getPassword();

        try {
            Authentication authentication = new UsernamePasswordAuthenticationToken(userName, password);
            Authentication authResult = authenticationManager.authenticate(authentication);

            User user = (User) authResult.getPrincipal();

            if (!user.isEnabled()) {
                return LoginResponse.builder()
                        .code(401)
                        .message("El usuario está deshabilitado.")
                        .token(null)
                        .build();
            }

            String token = jwtTokenHelper.generateToken(user.getEmail());
            return LoginResponse.builder()
                    .code(200)
                    .message("Inicio de sesión exitoso.")
                    .token(token)
                    .build();

        } catch (DisabledException e) {
            return LoginResponse.builder()
                    .code(401)
                    .message("El usuario está deshabilitado.")
                    .token(null)
                    .build();

        } catch (BadCredentialsException e) {
            return LoginResponse.builder()
                    .code(401)
                    .message("Credenciales incorrectas.")
                    .token(null)
                    .build();
        } catch (Exception e) {
            throw new ServerErrorException("Error interno al autenticar.", e);
        }
    }

}
