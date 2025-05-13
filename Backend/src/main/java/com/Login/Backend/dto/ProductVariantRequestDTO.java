package com.Login.Backend.dto;

import lombok.Data;

@Data
public class ProductVariantRequestDTO {
    private String color;
    private String size;
    private Integer stockQuantity;
}
