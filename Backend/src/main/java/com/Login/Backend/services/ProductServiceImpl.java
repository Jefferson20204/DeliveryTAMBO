package com.Login.Backend.services;

import com.Login.Backend.dto.ProductDTO;
import com.Login.Backend.dto.ProductRequestDTO;
import com.Login.Backend.entities.*;
import com.Login.Backend.exceptions.ResourceNotFoundEx;
import com.Login.Backend.mapper.ProductMapper;
import com.Login.Backend.repositories.BrandRepository;
import com.Login.Backend.repositories.CategoryRepository;
import com.Login.Backend.repositories.CategoryTypeRepositoty;
import com.Login.Backend.repositories.DiscountRepository;
import com.Login.Backend.repositories.ProductRepository;
import com.Login.Backend.specification.ProductSpecification;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

        private final ProductRepository productRepository;
        private final CategoryRepository categoryRepository;
        private final CategoryTypeRepositoty categoryTypeRepository;
        private final DiscountRepository discountRepository;
        private final BrandRepository brandRepository;

        // Agregar un nuevo producto
        @Override
        public ProductDTO createProduct(ProductRequestDTO dto) {
                Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow();
                CategoryType categoryType = dto.getCategoryTypeId() != null
                                ? categoryTypeRepository.findById(dto.getCategoryTypeId()).orElse(null)
                                : null;
                Brand brand = brandRepository.findById(dto.getBrandId())
                                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
                List<Discount> discounts = dto.getDiscountIds() != null
                                ? discountRepository.findAllById(dto.getDiscountIds())
                                : List.of();

                Product product = ProductMapper.toEntity(dto, category, categoryType, brand, discounts);
                Product saved = productRepository.save(product);
                return ProductMapper.toDTO(saved);
        }

        // Obtener todos los productos
        @Override
        @Transactional(readOnly = true)
        public List<ProductDTO> getAllProducts(UUID categoryId, UUID typeId, String name, BigDecimal minPrice,
                        BigDecimal maxPrice, Boolean active) {

                Specification<Product> productSpecification = Specification.where(null);

                if (categoryId != null) {
                        productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
                }
                if (typeId != null) {
                        productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
                }
                if (StringUtils.isNotBlank(name)) {
                        productSpecification = productSpecification.and(ProductSpecification.hasNameLike(name));
                }
                if (minPrice != null) {
                        productSpecification = productSpecification.and(ProductSpecification.hasMinPrice(minPrice));
                }
                if (maxPrice != null) {
                        productSpecification = productSpecification.and(ProductSpecification.hasMaxPrice(maxPrice));
                }
                if (active) {
                        productSpecification = productSpecification.and(ProductSpecification.isActive());
                }

                return productRepository.findAll(productSpecification).stream()
                                .map(ProductMapper::toDTO)
                                .collect(Collectors.toList());
        }

        // Obtener todos los productos por categoria
        @Override
        @Transactional(readOnly = true)
        public ProductDTO getProductBySlug(String slug) {
                Product product = productRepository.findBySlug(slug)
                                .orElseThrow(() -> new RuntimeException("Product not found"));
                return ProductMapper.toDTO(product);
        }

        // Obtener un producto por ID
        @Override
        @Transactional(readOnly = true)
        public ProductDTO getProductById(UUID id) {
                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundEx("Product Not Found!"));
                return ProductMapper.toDTO(product);
        }

        // Actualizar un producto por ID
        @Override
        public ProductDTO updateProduct(UUID id, ProductRequestDTO dto) {
                Product existing = productRepository.findById(id).orElseThrow();
                existing.setSlug(dto.getSlug());
                existing.setName(dto.getName());
                existing.setDescription(dto.getDescription());
                existing.setPrice(dto.getPrice());
                existing.setNewArrival(dto.getIsNewArrival());
                existing.setActive(dto.getIsActive());

                Brand brand = brandRepository.findById(dto.getBrandId())
                                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
                existing.setBrand(brand);

                Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow();
                existing.setCategory(category);
                CategoryType categoryType = dto.getCategoryTypeId() != null
                                ? categoryTypeRepository.findById(dto.getCategoryTypeId()).orElse(null)
                                : null;
                existing.setCategoryType(categoryType);

                List<Discount> discounts = dto.getDiscountIds() != null
                                ? discountRepository.findAllById(dto.getDiscountIds())
                                : List.of();
                existing.setDiscounts(discounts);

                // Eliminar recursos antiguos
                existing.getResources().clear();

                // Agregar nuevos recursos
                existing.getResources().addAll(
                                dto.getResources().stream()
                                                .map(rr -> Resources.builder()
                                                                .name(rr.getName())
                                                                .url(rr.getUrl())
                                                                .isPrimary(rr.getIsPrimary())
                                                                .type(rr.getType())
                                                                .product(existing)
                                                                .build())
                                                .collect(Collectors.toList()));

                Product updated = productRepository.save(existing);
                return ProductMapper.toDTO(updated);
        }

}
