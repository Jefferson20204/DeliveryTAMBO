package com.Login.Backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ProductVariantDTO {
    private UUID id;
    private String color;
    private String size;
    private Integer stockQuantity;
}
