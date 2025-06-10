package com.Login.Backend.auth.services;

import com.Login.Backend.auth.entities.Authority;
import com.Login.Backend.auth.repositories.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    // Proporciona la autoridad básica para usuarios normales
    public List<Authority> getUserAuthority() {
        List<Authority> authorities = new ArrayList<>();
        // Busca el rol con código "USER" en la base de datos
        Authority authority = authorityRepository.findByRoleCode("USER");
        authorities.add(authority);
        // Lo devuelve dentro de una lista (formato que espera Spring Security)
        return authorities;
    }

    // Crear nuevos roles/permisos en el sistema
    public Authority createAuthority(String role, String description) {
        // role: Código del rol (ej. "ADMIN", "EDITOR")
        // description: Descripción legible del rol
        Authority authority = Authority.builder().roleCode(role).roleDescription(description).build();
        return authorityRepository.save(authority);
    }

}
