package com.Login.Backend.repositories;

import com.Login.Backend.entities.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DiscountRepository extends JpaRepository<Discount, UUID> {
    List<Discount> findByIsActiveTrue();

    List<Discount> findAllById(UUID id);

}
