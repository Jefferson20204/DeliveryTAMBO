package com.Login.Backend.mapper;

import com.Login.Backend.dto.DiscountDTO;
import com.Login.Backend.dto.ProductDTO;
import com.Login.Backend.dto.ProductRequestDTO;
import com.Login.Backend.dto.ProductVariantDTO;
import com.Login.Backend.dto.ProductVariantRequestDTO;
import com.Login.Backend.dto.ResourceDTO;
import com.Login.Backend.entities.*;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

        public static ProductDTO toDTO(Product product) {
                return ProductDTO.builder()
                                .id(product.getId())
                                .thumbnail(null != product.getResources() && !product.getResources().isEmpty()
                                                ? getProductThumbnail(product.getResources())
                                                : null)
                                .slug(product.getSlug())
                                .name(product.getName())
                                .description(product.getDescription())
                                .price(product.getPrice())
                                .discountPercentage(getPercentageDiscount(product))
                                .discountedPrice(calculateDiscountedPrice(product))
                                .stock(product.getStock())
                                .brand(product.getBrand())
                                .rating(product.getRating())
                                .isNewArrival(product.isNewArrival())
                                .isActive(product.isActive())
                                .createdAt(product.getCreatedAt())
                                .updatedAt(product.getUpdatedAt())
                                .category(CategoryMapper.toDTO(product.getCategory()))
                                .categoryType(
                                                product.getCategoryType() != null
                                                                ? CategoryTypeMapper.toDTO(product.getCategoryType())
                                                                : null)
                                .productVariants(product.getProductVariants().stream()
                                                .map(v -> ProductVariantDTO.builder()
                                                                .id(v.getId())
                                                                .color(v.getColor())
                                                                .size(v.getSize())
                                                                .stockQuantity(v.getStockQuantity())
                                                                .build())
                                                .collect(Collectors.toList()))
                                .resources(product.getResources().stream()
                                                .map(r -> ResourceDTO.builder()
                                                                .id(r.getId())
                                                                .name(r.getName())
                                                                .url(r.getUrl())
                                                                .isPrimary(r.getIsPrimary())
                                                                .type(r.getType())
                                                                .build())
                                                .collect(Collectors.toList()))
                                .discounts(product.getDiscounts().stream()
                                                .map(d -> DiscountDTO.builder()
                                                                .id(d.getId())
                                                                .name(d.getName())
                                                                .percentage(d.getPercentage())
                                                                .build())
                                                .collect(Collectors.toList()))
                                .build();
        }

        public static Product toEntity(ProductRequestDTO dto, Category category, CategoryType categoryType,
                        List<Discount> discounts) {
                Product product = Product.builder()
                                .slug(dto.getSlug())
                                .name(dto.getName())
                                .description(dto.getDescription())
                                .price(dto.getPrice())
                                .stock(dto.getStock())
                                .brand(dto.getBrand())
                                .isNewArrival(dto.getIsNewArrival())
                                .isActive(dto.getIsActive())
                                .category(category)
                                .categoryType(categoryType)
                                .discounts(discounts)
                                .build();

                var variants = dto.getProductVariants().stream()
                                .map(rv -> ProductVariant.builder()
                                                .color(rv.getColor())
                                                .size(rv.getSize())
                                                .stockQuantity(rv.getStockQuantity())
                                                .product(product)
                                                .build())
                                .collect(Collectors.toList());
                product.setProductVariants(variants);

                var resources = dto.getResources().stream()
                                .map(rr -> Resources.builder()
                                                .name(rr.getName())
                                                .url(rr.getUrl())
                                                .isPrimary(rr.getIsPrimary())
                                                .type(rr.getType())
                                                .product(product)
                                                .build())
                                .collect(Collectors.toList());
                product.setResources(resources);

                return product;
        }

        // Calcular el stock total al DTO
        public static int getTotalStockDto(Product product) {

                if (product.getProductVariants() != null && !product.getProductVariants().isEmpty()) {
                        return product.getProductVariants().stream().mapToInt(ProductVariant::getStockQuantity).sum();
                }
                return product.getStock();
        }

        // Calcular el stock total al Entity
        public static int getTotalStockEntity(ProductRequestDTO productDto) {
                if (productDto.getProductVariants() != null && !productDto.getProductVariants().isEmpty()) {
                        System.out.println("Si hay variantes");
                        return productDto.getProductVariants().stream()
                                        .mapToInt(ProductVariantRequestDTO::getStockQuantity)
                                        .sum();
                }
                System.out.println("No hay variantes: " + productDto.getStock());
                return productDto.getStock();
        }

        // Obtener la miniatura del producto
        private static String getProductThumbnail(List<Resources> resources) {
                return resources.stream().filter(Resources::getIsPrimary).findFirst().map(Resources::getUrl)
                                .orElse(null);
        }

        // Calcular el precio con descuento
        private static BigDecimal calculateDiscountedPrice(Product product) {
                BigDecimal originalPrice = product.getPrice();
                Discount activeDiscount = product.getDiscounts().stream()
                                .filter(d -> d.getIsActive() && d.getStartDate().isBefore(LocalDateTime.now())
                                                &&
                                                d.getEndDate().isAfter(LocalDateTime.now()))
                                .findFirst()
                                .orElse(null);

                if (activeDiscount == null) {
                        return originalPrice;
                }

                if (activeDiscount.getPercentage() != null) {
                        return originalPrice
                                        .subtract(originalPrice.multiply(activeDiscount.getPercentage())
                                                        .divide(BigDecimal.valueOf(100)));
                } else {
                        return originalPrice;
                }
        }

        // Obtener el porcentaje de descuento
        private static BigDecimal getPercentageDiscount(Product product) {
                Discount activeDiscount = product.getDiscounts().stream()
                                .filter(d -> d.getIsActive() && d.getStartDate().isBefore(LocalDateTime.now())
                                                &&
                                                d.getEndDate().isAfter(LocalDateTime.now()))
                                .findFirst()
                                .orElse(null);

                if (activeDiscount == null) {
                        return BigDecimal.ZERO;
                }

                return activeDiscount.getPercentage();
        }
}
