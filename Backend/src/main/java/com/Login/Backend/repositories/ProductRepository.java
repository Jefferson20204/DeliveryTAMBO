package com.Login.Backend.repositories;

import com.Login.Backend.entities.CategoryType;
import com.Login.Backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {

    Optional<Product> findBySlug(String slug);

    List<Product> findAllByIsActiveTrue();

    Optional<Product> findBySlugAndIsActiveTrue(String slug);

    boolean existsBySlug(String slug);

    List<Product> findAllByCategoryType(CategoryType categoryType);

}
