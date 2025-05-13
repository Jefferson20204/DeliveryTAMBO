package com.Login.Backend.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Login.Backend.entities.CategoryType;

public interface CategoryTypeRepositoty extends JpaRepository<CategoryType, UUID> {

    Optional<CategoryType> findById(UUID id);
}
