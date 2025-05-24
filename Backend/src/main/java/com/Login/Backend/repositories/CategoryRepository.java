package com.Login.Backend.repositories;

import com.Login.Backend.entities.Category;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    @EntityGraph(attributePaths = "categoryTypes")
    List<Category> findAll();

    @EntityGraph(attributePaths = "categoryTypes")
    Optional<Category> findById(UUID id);
}
