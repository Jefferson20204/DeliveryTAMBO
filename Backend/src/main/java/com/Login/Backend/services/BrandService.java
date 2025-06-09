package com.Login.Backend.services;

import com.Login.Backend.dto.BrandDTO;
import com.Login.Backend.dto.BrandRequest;
import com.Login.Backend.entities.Brand;
import com.Login.Backend.repositories.BrandRepository;
import com.google.common.base.Preconditions;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.collect.ImmutableList;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandDTO createBrand(BrandRequest request) {
        Preconditions.checkNotNull(request, "La solicitud no puede ser nula");
        Preconditions.checkArgument(
                request.getName() != null && !request.getName().trim().isEmpty(),
                "El nombre de la marca no puede estar vacío");

        Brand brand = new Brand();
        brand.setName(request.getName().trim());

        Brand saved = brandRepository.save(brand);

        return mapToDTO(saved);
    }

    public List<BrandDTO> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(ImmutableList.toImmutableList());
    }

    // Cache para almacenar marcas por ID
    private final Cache<UUID, BrandDTO> brandCache = CacheBuilder.newBuilder()
            .maximumSize(100) // Máximo 100 elementos en caché
            .expireAfterWrite(10, TimeUnit.MINUTES) // Expira después de 10 minutos
            .build();

    // public BrandDTO getBrandById(UUID id) {
    // Brand brand = brandRepository.findById(id)
    // .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
    // return mapToDTO(brand);
    // }

    public BrandDTO getBrandById(UUID id) {
        try {
            // Primero intentamos obtener del caché
            return brandCache.get(id, () -> {
                Brand brand = brandRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
                return mapToDTO(brand);
            });
        } catch (ExecutionException e) {
            throw new RuntimeException("Error al obtener la marca", e);
        }
    }

    // public BrandDTO updateBrand(UUID id, BrandRequest request) {
    // Brand brand = brandRepository.findById(id)
    // .orElseThrow(() -> new RuntimeException("Marca no encontrada"));

    // brand.setName(request.getName());
    // Brand updated = brandRepository.save(brand);
    // return mapToDTO(updated);
    // }

    public BrandDTO updateBrand(UUID id, BrandRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));

        brand.setName(request.getName());
        Brand updated = brandRepository.save(brand);

        // Actualizamos el caché
        BrandDTO updatedDTO = mapToDTO(updated);
        brandCache.put(id, updatedDTO);

        return updatedDTO;
    }

    // public void deleteBrand(UUID id) {
    // Brand brand = brandRepository.findById(id)
    // .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
    // brandRepository.delete(brand);
    // }

    public void deleteBrand(UUID id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
        brandRepository.delete(brand);

        // Invalidamos la entrada en el caché
        brandCache.invalidate(id);
    }

    private BrandDTO mapToDTO(Brand brand) {
        BrandDTO dto = BrandDTO.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
        return dto;
    }
}
