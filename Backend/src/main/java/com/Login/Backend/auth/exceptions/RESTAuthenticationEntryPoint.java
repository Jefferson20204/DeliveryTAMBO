package com.Login.Backend.auth.exceptions;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;

import java.io.IOException;

// maneja los intentos de acceso no autorizados a recursos protegidos
public class RESTAuthenticationEntryPoint implements org.springframework.security.web.AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        // Devuelve siempre un error HTTP 401 (Unauthorized)
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "401 Unauthorized");
    }
}
