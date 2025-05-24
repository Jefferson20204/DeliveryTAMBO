package com.Login.Backend.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Login.Backend.entities.CategoryButton;

public interface CategoryButtonRepository extends JpaRepository<CategoryButton, UUID> {
    List<CategoryButton> findAllByOrderByPositionAsc();
}