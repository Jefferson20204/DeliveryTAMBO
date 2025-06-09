package com.Login.Backend.dto;

import lombok.Data;

@Data
public class ResourceRequestDTO {
    private String name;
    private String url;
    private Boolean isPrimary;
    private String type;
}
