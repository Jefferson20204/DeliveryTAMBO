package com.Login.Backend.mapper;

import org.springframework.stereotype.Component;

import com.Login.Backend.dto.CategoryTypeDTO;
import com.Login.Backend.dto.CategoryTypeRequestDTO;
import com.Login.Backend.entities.Category;
import com.Login.Backend.entities.CategoryType;

@Component
public class CategoryTypeMapper {

    public static CategoryType toEntity(CategoryTypeRequestDTO dto, Category category) {
        CategoryType categoryType = new CategoryType();
        categoryType.setName(dto.getName());
        categoryType.setCode(dto.getCode());
        categoryType.setDescription(dto.getDescription());
        categoryType.setCategory(category);

        return categoryType;
    }

    public static CategoryTypeDTO toDTO(CategoryType categoryType) {
        return CategoryTypeDTO.builder()
                .id(categoryType.getId())
                .name(categoryType.getName())
                .code(categoryType.getCode())
                .description(categoryType.getDescription())
                .build();
    }
}
