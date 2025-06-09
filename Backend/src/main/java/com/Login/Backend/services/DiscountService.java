package com.Login.Backend.services;

import com.Login.Backend.dto.DiscountDTO;
import com.Login.Backend.dto.DiscountRequestDTO;
import com.Login.Backend.entities.Discount;
import com.Login.Backend.mapper.DiscountMapper;
import com.Login.Backend.repositories.DiscountRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    private final DiscountMapper discountMapper;

    // Crear un nuevo descuento
    public DiscountDTO createDiscount(DiscountRequestDTO request) {
        Discount discount = discountMapper.toEntity(request);
        Discount saved = discountRepository.save(discount);
        return discountMapper.toDTO(saved);
    }

    // Obtener todos los descuentos
    @Transactional(readOnly = true)
    public List<DiscountDTO> getAllDiscounts() {
        return discountRepository.findAll().stream()
                .map(discountMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener un descuento por ID
    @Transactional(readOnly = true)
    public DiscountDTO getDiscountById(UUID id) {
        Discount discount = discountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discount not found"));
        return discountMapper.toDTO(discount);
    }

    // Actualizar un descuento
    public DiscountDTO updateDiscount(UUID id, DiscountRequestDTO request) {
        Discount existing = discountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discount not found"));
        Discount updatedEntity = discountMapper.toEntity(request);
        updatedEntity.setId(existing.getId());
        Discount saved = discountRepository.save(updatedEntity);
        return discountMapper.toDTO(saved);
    }

    // Eliminar un descuento
    public void deleteDiscount(UUID id) {
        discountRepository.deleteById(id);
    }

}
