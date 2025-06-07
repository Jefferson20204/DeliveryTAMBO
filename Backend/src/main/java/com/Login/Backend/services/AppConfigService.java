package com.Login.Backend.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.Login.Backend.dto.CategoryButtonDTO;
import com.Login.Backend.dto.ProductSectionDTO;
import com.Login.Backend.dto.SliderImageDTO;
import com.Login.Backend.entities.Category;
import com.Login.Backend.entities.CategoryButton;
import com.Login.Backend.entities.ProductSection;
import com.Login.Backend.entities.SliderImage;
import com.Login.Backend.mapper.CategoryButtonMapper;
import com.Login.Backend.mapper.ProductSectionMapper;
import com.Login.Backend.mapper.SliderImageMapper;
import com.Login.Backend.repositories.CategoryButtonRepository;
import com.Login.Backend.repositories.CategoryRepository;
import com.Login.Backend.repositories.ProductSectionRepository;
import com.Login.Backend.repositories.SliderImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppConfigService {

    private final SliderImageRepository sliderRepo;
    private final CategoryButtonRepository buttonRepo;
    private final ProductSectionRepository sectionRepo;
    private final CategoryRepository categoryRepository;

    // --- Slider
    public List<SliderImageDTO> getSliderImages() {
        return sliderRepo.findAllByOrderByPositionAsc().stream()
                .map(SliderImageMapper::toDTO).toList();
    }

    public SliderImageDTO saveSlider(SliderImageDTO dto) {
        SliderImage image = SliderImageMapper.toEntity(dto);
        return SliderImageMapper.toDTO(sliderRepo.save(image));
    }

    public void deleteSlider(UUID id) {
        sliderRepo.deleteById(id);
    }

    // --- Botones de categoría
    public List<CategoryButtonDTO> getCategoryButtons() {
        return buttonRepo.findAllByOrderByPositionAsc().stream()
                .map(CategoryButtonMapper::toDTO).toList();
    }

    public CategoryButtonDTO saveCategoryButton(CategoryButtonDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        CategoryButton btn = new CategoryButton();
        btn.setCategory(category);
        btn.setPosition(dto.getPosition());
        return CategoryButtonMapper.toDTO(buttonRepo.save(btn));
    }

    public void deleteCategoryButton(UUID id) {
        buttonRepo.deleteById(id);
    }

    // --- Secciones de productos
    public List<ProductSectionDTO> getProductSections() {
        return sectionRepo.findAllByOrderByPositionAsc().stream()
                .map(ProductSectionMapper::toDTO).toList();
    }

    public ProductSectionDTO saveProductSection(ProductSectionDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        ProductSection section = new ProductSection();
        section.setCategory(category);
        section.setMaxProducts(dto.getMaxProducts() != null ? dto.getMaxProducts() : 8);
        section.setPosition(dto.getPosition());
        return ProductSectionMapper.toDTO(sectionRepo.save(section));
    }

    public void updateProductSection(UUID id, ProductSectionDTO dto) {
        ProductSection existing = sectionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product section not found"));

        if (null != existing) {
            ProductSection update = ProductSectionMapper.toEntity(dto);
            sectionRepo.save(update);
        }

    }

    public void deleteProductSection(UUID id) {
        sectionRepo.deleteById(id);
    }
}
