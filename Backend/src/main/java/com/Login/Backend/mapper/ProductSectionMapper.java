package com.Login.Backend.mapper;
<<<<<<< HEAD
// com.Login.Backend.mapper.ProductSectionMapper
=======
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

import com.Login.Backend.entities.ProductSection;
import com.Login.Backend.dto.ProductSectionDTO;
import com.Login.Backend.entities.Category;

public class ProductSectionMapper {

    public static ProductSectionDTO toDTO(ProductSection entity) {
        if (entity == null)
            return null;
        ProductSectionDTO dto = new ProductSectionDTO();
        dto.setId(entity.getId());
        dto.setCategoryId(entity.getCategory() != null
                ? entity.getCategory().getId()
                : null);
        dto.setMaxProducts(entity.getMaxProducts());
        dto.setPosition(entity.getPosition());
        return dto;
    }

    public static ProductSection toEntity(ProductSectionDTO dto) {
        if (dto == null)
            return null;
        ProductSection entity = new ProductSection();
        entity.setId(dto.getId());
        if (dto.getCategoryId() != null) {
            Category cat = new Category();
            cat.setId(dto.getCategoryId());
            entity.setCategory(cat);
        }
        entity.setMaxProducts(dto.getMaxProducts() != null
                ? dto.getMaxProducts()
                : 8);
        entity.setPosition(dto.getPosition());
        return entity;
    }
}
