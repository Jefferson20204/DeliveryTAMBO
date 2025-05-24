package com.Login.Backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class ProductRequestDTO {
    private String slug;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String brand;
    private Boolean isNewArrival;
    private Boolean isActive;
    private UUID categoryId;
    private UUID categoryTypeId;
    private List<ProductVariantRequestDTO> productVariants;
    private List<ResourceRequestDTO> resources;
    private List<UUID> discountIds;
}
