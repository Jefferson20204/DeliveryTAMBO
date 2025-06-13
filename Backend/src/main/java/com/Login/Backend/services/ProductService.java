package com.Login.Backend.services;

import com.Login.Backend.dto.ProductDTO;
import com.Login.Backend.dto.ProductRequestDTO;
import com.Login.Backend.entities.Product;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface ProductService {

    public ProductDTO createProduct(ProductRequestDTO dto);

    public List<ProductDTO> getAllProducts(UUID categoryId, UUID typeId, String name, BigDecimal minPrice,
            BigDecimal maxPrice, Boolean active);

    ProductDTO getProductBySlug(String slug);

    ProductDTO getProductById(UUID id);

    Product getProductEntityById(UUID id);

    ProductDTO updateProduct(UUID id, ProductRequestDTO productDto);

    boolean deleteProduct(UUID id);

}
