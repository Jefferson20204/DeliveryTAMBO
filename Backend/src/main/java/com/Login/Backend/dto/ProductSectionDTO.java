package com.Login.Backend.dto;

// com.Login.Backend.dto.ProductSectionDTO

import lombok.Data;
import java.util.UUID;

@Data
public class ProductSectionDTO {
    private UUID id;
    private UUID categoryId;
    private Integer maxProducts;
    private Integer position;
}
