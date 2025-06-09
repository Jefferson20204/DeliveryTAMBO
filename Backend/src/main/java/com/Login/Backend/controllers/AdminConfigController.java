package com.Login.Backend.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Login.Backend.dto.CategoryButtonDTO;
import com.Login.Backend.dto.ProductSectionDTO;
import com.Login.Backend.dto.SliderImageDTO;
import com.Login.Backend.services.AppConfigService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/config")
@RequiredArgsConstructor
@CrossOrigin
public class AdminConfigController {

    private final AppConfigService configService;

    // Slider
    @GetMapping("/slider")
    public List<SliderImageDTO> listSlider() {
        return configService.getSliderImages();
    }

    @PostMapping("/slider")
    public SliderImageDTO createSlider(@RequestBody SliderImageDTO dto) {
        return configService.saveSlider(dto);
    }

    @DeleteMapping("/slider/{id}")
    public void deleteSlider(@PathVariable UUID id) {
        configService.deleteSlider(id);
    }

    // Categorías visibles
    @GetMapping("/categories-buttons")
    public List<CategoryButtonDTO> listCategoryButtons() {
        return configService.getCategoryButtons();
    }

    @PostMapping("/categories-buttons")
    public CategoryButtonDTO createCategoryButton(@RequestBody CategoryButtonDTO dto) {
        return configService.saveCategoryButton(dto);
    }

    @DeleteMapping("/categories-buttons/{id}")
    public void deleteCategoryButton(@PathVariable UUID id) {
        configService.deleteCategoryButton(id);
    }

    // Secciones de productos
    @GetMapping("/product-sections")
    public List<ProductSectionDTO> listProductSections() {
        return configService.getProductSections();
    }

    @PostMapping("/product-sections/new")
    public ProductSectionDTO createProductSection(@RequestBody ProductSectionDTO dto) {
        return configService.saveProductSection(dto);
    }

    @PutMapping("/product-sections/update/{id}")
    public void updateProductSection(@PathVariable UUID id, @RequestBody ProductSectionDTO dto) {
        configService.updateProductSection(id, dto);
    }

    @DeleteMapping("/product-sections/delete/{id}")
    public void deleteProductSection(@PathVariable UUID id) {
        configService.deleteProductSection(id);
    }
}
