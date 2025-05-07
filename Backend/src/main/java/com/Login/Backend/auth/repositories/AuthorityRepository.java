package com.Login.Backend.auth.repositories;

import com.Login.Backend.auth.entities.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, UUID> {
    Authority findByRoleCode(String user);

    boolean existsByRoleCode(String roleCode);
}
