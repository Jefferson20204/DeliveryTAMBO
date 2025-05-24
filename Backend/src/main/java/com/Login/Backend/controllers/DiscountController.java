package com.Login.Backend.controllers;

import com.Login.Backend.dto.DiscountDTO;
import com.Login.Backend.dto.DiscountRequestDTO;
import com.Login.Backend.services.DiscountService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/discounts")
@RequiredArgsConstructor
@CrossOrigin
public class DiscountController {

    private final DiscountService discountService;

    @PostMapping
    public ResponseEntity<DiscountDTO> create(@RequestBody DiscountRequestDTO request) {
        return ResponseEntity.ok(discountService.createDiscount(request));
    }

    @GetMapping
    public ResponseEntity<List<DiscountDTO>> getAll() {
        return ResponseEntity.ok(discountService.getAllDiscounts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiscountDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(discountService.getDiscountById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiscountDTO> update(@PathVariable UUID id,
            @RequestBody DiscountRequestDTO request) {
        return ResponseEntity.ok(discountService.updateDiscount(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        discountService.deleteDiscount(id);
        return ResponseEntity.noContent().build();
    }
}
