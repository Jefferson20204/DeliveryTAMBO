package com.Login.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequestDTO {

    private String name;
    private String code;
    private String description;
    private List<CategoryTypeRequestDTO> categoryTypes;

}
