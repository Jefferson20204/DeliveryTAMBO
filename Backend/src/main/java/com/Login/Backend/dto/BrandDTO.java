package com.Login.Backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class BrandDTO {
    private UUID id;
    private String name;
}
