package com.Login.Backend.controllers;

import com.Login.Backend.dto.CategoryDTO;
import com.Login.Backend.dto.CategoryRequestDTO;
import com.Login.Backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Obtener todas las categorias
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAll() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // Obtener una categoria por ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    // Crear una nueva categoria
    @PostMapping
    public ResponseEntity<CategoryDTO> create(@RequestBody CategoryRequestDTO dto) {
        return ResponseEntity.ok(categoryService.createCategory(dto));
    }

    // Actualizar una categoria
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> update(@PathVariable UUID id, @RequestBody CategoryRequestDTO dto) {
        return ResponseEntity.ok(categoryService.updateCategory(id, dto));
    }

    // Eliminar una categoria
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
