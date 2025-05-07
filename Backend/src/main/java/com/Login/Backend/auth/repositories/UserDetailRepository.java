package com.Login.Backend.auth.repositories;

import com.Login.Backend.auth.entities.User;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailRepository extends JpaRepository<User, UUID> {
    User findByEmail(String username);

    User findByResetToken(String resetToken);

}
