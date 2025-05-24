package com.Login.Backend.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Login.Backend.entities.ProductSection;

public interface ProductSectionRepository extends JpaRepository<ProductSection, UUID> {
    List<ProductSection> findAllByOrderByPositionAsc();
}
