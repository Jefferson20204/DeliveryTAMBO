package com.Login.Backend.services;

import com.Login.Backend.dto.CategoryDTO;
import com.Login.Backend.dto.CategoryRequestDTO;
import com.Login.Backend.entities.Category;
import com.Login.Backend.entities.CategoryType;
import com.Login.Backend.mapper.CategoryMapper;
import com.Login.Backend.repositories.CategoryRepository;
import com.Login.Backend.repositories.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    // Obtener todas las categorias
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener una categoria por ID
    public CategoryDTO getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return CategoryMapper.toDTO(category);
    }

    // Crear una categoria
    public CategoryDTO createCategory(CategoryRequestDTO dto) {
        Category category = CategoryMapper.toEntity(dto);
        Category saved = categoryRepository.save(category);
        return CategoryMapper.toDTO(saved);
    }

    // Actualizar una categoria por ID
    @Transactional
    public CategoryDTO updateCategory(UUID id, CategoryRequestDTO dto) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // 1) Desvincula productos de los tipos que vamos a eliminar
        for (CategoryType oldType : existing.getCategoryTypes()) {
            productRepository.findAllByCategoryType(oldType)
                    .forEach(prod -> {
                        prod.setCategoryType(null);
                        productRepository.save(prod);
                    });
        }

        existing.setName(dto.getName());
        existing.setCode(dto.getCode());
        existing.setDescription(dto.getDescription());

        // 2) Ahora sí remueve los tipos antiguos
        existing.getCategoryTypes().clear();

        // 3) Agrega los nuevos tipos
        dto.getCategoryTypes().forEach(typeDTO -> {
            var type = new com.Login.Backend.entities.CategoryType();
            type.setName(typeDTO.getName());
            type.setCode(typeDTO.getCode());
            type.setDescription(typeDTO.getDescription());
            type.setCategory(existing);
            existing.getCategoryTypes().add(type);
        });

        // 4) Guarda la categoría con sus tipos actualizados
        Category updated = categoryRepository.save(existing);
        return CategoryMapper.toDTO(updated);
    }

    // Eliminar una categoria por ID
    public void deleteCategory(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }
        categoryRepository.deleteById(id);
    }
}
