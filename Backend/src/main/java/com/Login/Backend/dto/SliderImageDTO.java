package com.Login.Backend.dto;

// com.Login.Backend.dto.SliderImageDTO

import lombok.Data;
import java.util.UUID;

@Data
public class SliderImageDTO {
    private UUID id;
    private String imageUrl;
    private String redirectUrl;
    private Integer position;
}
