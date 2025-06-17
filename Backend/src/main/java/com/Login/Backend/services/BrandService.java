package com.Login.Backend.services;

import com.Login.Backend.dto.BrandDTO;
import com.Login.Backend.dto.BrandRequest;
import com.Login.Backend.entities.Brand;
import com.Login.Backend.repositories.BrandRepository;
<<<<<<< HEAD

import lombok.RequiredArgsConstructor;

=======
import com.google.common.base.Preconditions;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.collect.ImmutableList;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
<<<<<<< HEAD
import java.util.stream.Collectors;
=======
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

@Service
@RequiredArgsConstructor
public class BrandService {

<<<<<<< HEAD
    private final BrandRepository brandRepository;

    public BrandDTO createBrand(BrandRequest request) {
        Brand brand = new Brand();
        brand.setName(request.getName());
=======
    private static final Logger log = LoggerFactory.getLogger(BrandService.class);

    private final BrandRepository brandRepository;

    public BrandDTO createBrand(BrandRequest request) {
        Preconditions.checkNotNull(request, "La solicitud no puede ser nula");
        Preconditions.checkArgument(
                request.getName() != null && !request.getName().trim().isEmpty(),
                "El nombre de la marca no puede estar vacío");

        Brand brand = new Brand();
        brand.setName(request.getName().trim());
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

        Brand saved = brandRepository.save(brand);

        return mapToDTO(saved);
    }

    public List<BrandDTO> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(this::mapToDTO)
<<<<<<< HEAD
                .collect(Collectors.toList());
    }

    public BrandDTO getBrandById(UUID id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
        return mapToDTO(brand);
=======
                .collect(ImmutableList.toImmutableList());
    }

    // Cache para almacenar marcas por ID
    private final Cache<UUID, BrandDTO> brandCache = CacheBuilder.newBuilder()
            .maximumSize(100) // Máximo 100 elementos en caché
            .expireAfterWrite(10, TimeUnit.MINUTES) // Expira después de 10 minutos
            .build();

    public BrandDTO getBrandById(UUID id) {
        log.debug("Buscando marca con ID: {}", id); // Solo visible si level=DEBUG

        try {
            // Primero intentamos obtener del caché
            return brandCache.get(id, () -> {
                Brand brand = brandRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
                log.info("Marca encontrada: {}", brand.getName());
                return mapToDTO(brand);
            });
        } catch (ExecutionException e) {
            log.info("Marca no encontrada");
            throw new RuntimeException("Error al obtener la marca", e);
        }
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    }

    public BrandDTO updateBrand(UUID id, BrandRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));

        brand.setName(request.getName());
        Brand updated = brandRepository.save(brand);
<<<<<<< HEAD
        return mapToDTO(updated);
=======

        // Actualizamos el caché
        BrandDTO updatedDTO = mapToDTO(updated);
        brandCache.put(id, updatedDTO);

        return updatedDTO;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    }

    public void deleteBrand(UUID id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
        brandRepository.delete(brand);
<<<<<<< HEAD
=======

        // Invalidamos la entrada en el caché
        brandCache.invalidate(id);
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    }

    private BrandDTO mapToDTO(Brand brand) {
        BrandDTO dto = BrandDTO.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
        return dto;
    }
}
