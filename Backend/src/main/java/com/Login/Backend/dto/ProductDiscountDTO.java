package com.Login.Backend.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class ProductDiscountDTO {
    private UUID id;
    private String name;
    private BigDecimal price;
}
