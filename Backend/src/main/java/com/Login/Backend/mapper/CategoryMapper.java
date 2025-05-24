package com.Login.Backend.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.Login.Backend.dto.CategoryDTO;
import com.Login.Backend.dto.CategoryRequestDTO;
import com.Login.Backend.dto.CategoryTypeDTO;
import com.Login.Backend.entities.Category;
import com.Login.Backend.entities.CategoryType;

@Component
public class CategoryMapper {

    public static Category toEntity(CategoryRequestDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setCode(dto.getCode());
        category.setDescription(dto.getDescription());

        List<CategoryType> types = dto.getCategoryTypes().stream()
                .map(typeDTO -> {
                    CategoryType type = new CategoryType();
                    type.setName(typeDTO.getName());
                    type.setCode(typeDTO.getCode());
                    type.setDescription(typeDTO.getDescription());
                    type.setCategory(category);
                    return type;
                })
                .toList();

        category.setCategoryTypes(types);
        return category;
    }

    public static CategoryDTO toDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .code(category.getCode())
                .description(category.getDescription())
                .categoryTypes(category.getCategoryTypes().stream()
                        .map(type -> CategoryTypeDTO.builder()
                                .id(type.getId())
                                .name(type.getName())
                                .code(type.getCode())
                                .description(type.getDescription())
                                .build())
                        .toList())
                .build();
    }

}
