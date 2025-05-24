package com.Login.Backend.mapper;
// com.Login.Backend.mapper.SliderImageMapper

import com.Login.Backend.entities.SliderImage;
import com.Login.Backend.dto.SliderImageDTO;

public class SliderImageMapper {

    public static SliderImageDTO toDTO(SliderImage entity) {
        if (entity == null)
            return null;
        SliderImageDTO dto = new SliderImageDTO();
        dto.setId(entity.getId());
        dto.setImageUrl(entity.getImageUrl());
        dto.setRedirectUrl(entity.getRedirectUrl());
        dto.setPosition(entity.getPosition());
        return dto;
    }

    public static SliderImage toEntity(SliderImageDTO dto) {
        if (dto == null)
            return null;
        SliderImage entity = new SliderImage();
        entity.setId(dto.getId()); // si es creación, dto.getId() puede ser null
        entity.setImageUrl(dto.getImageUrl());
        entity.setRedirectUrl(dto.getRedirectUrl());
        entity.setPosition(dto.getPosition());
        return entity;
    }
}
