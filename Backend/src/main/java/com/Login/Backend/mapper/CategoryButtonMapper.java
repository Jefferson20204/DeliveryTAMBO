package com.Login.Backend.mapper;
// com.Login.Backend.mapper.CategoryButtonMapper

import com.Login.Backend.entities.CategoryButton;
import com.Login.Backend.dto.CategoryButtonDTO;
import com.Login.Backend.entities.Category;

public class CategoryButtonMapper {

    public static CategoryButtonDTO toDTO(CategoryButton entity) {
        if (entity == null)
            return null;
        CategoryButtonDTO dto = new CategoryButtonDTO();
        dto.setId(entity.getId());
        dto.setCategoryId(entity.getCategory() != null
                ? entity.getCategory().getId()
                : null);
        dto.setPosition(entity.getPosition());
        return dto;
    }

    public static CategoryButton toEntity(CategoryButtonDTO dto) {
        if (dto == null)
            return null;
        CategoryButton entity = new CategoryButton();
        entity.setId(dto.getId());
        // Solo asignamos la referencia mínima a Category
        if (dto.getCategoryId() != null) {
            Category cat = new Category();
            cat.setId(dto.getCategoryId());
            entity.setCategory(cat);
        }
        entity.setPosition(dto.getPosition());
        return entity;
    }
}
