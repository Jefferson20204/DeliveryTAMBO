package com.Login.Backend.controllers;

import com.Login.Backend.dto.BrandDTO;
import com.Login.Backend.dto.BrandRequest;
import com.Login.Backend.services.BrandService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @PostMapping
    public ResponseEntity<BrandDTO> create(@RequestBody BrandRequest request) {
        return ResponseEntity.ok(brandService.createBrand(request));
    }

    @GetMapping
    public ResponseEntity<List<BrandDTO>> getAll() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(brandService.getBrandById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandDTO> update(@PathVariable UUID id, @RequestBody BrandRequest request) {
        return ResponseEntity.ok(brandService.updateBrand(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }
}
