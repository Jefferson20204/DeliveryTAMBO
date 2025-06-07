package com.Login.Backend.services;

import com.Login.Backend.dto.BrandDTO;
import com.Login.Backend.dto.BrandRequest;
import com.Login.Backend.entities.Brand;
import com.Login.Backend.repositories.BrandRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandDTO createBrand(BrandRequest request) {
        Brand brand = new Brand();
        brand.setName(request.getName());

        Brand saved = brandRepository.save(brand);

        return mapToDTO(saved);
    }

    public List<BrandDTO> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public BrandDTO getBrandById(UUID id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
        return mapToDTO(brand);
    }

    public BrandDTO updateBrand(UUID id, BrandRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));

        brand.setName(request.getName());
        Brand updated = brandRepository.save(brand);
        return mapToDTO(updated);
    }

    public void deleteBrand(UUID id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
        brandRepository.delete(brand);
    }

    private BrandDTO mapToDTO(Brand brand) {
        BrandDTO dto = BrandDTO.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
        return dto;
    }
}
